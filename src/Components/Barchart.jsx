import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function Barchart({data}) {

  const refBarChart = useRef();
  const height= 320;
  const width = 835;
  const margin = {Top:112, Right: 90, Bottom:62, Left:43};
  const days = data.map(ele=>ele.day);
  const poids = data.map(ele=>ele.poid);
  const calories = data.map(ele=>ele.calories);
  const upCalorie = Math.max(...calories);
  const lowCalorie = Math.min(...calories);
  const lowPoid = Math.floor(Math.min(...poids))-1;
  const upPoid = Math.ceil((Math.max(...poids)-lowPoid)/3)*3+lowPoid;
  const paddingBarPopUp = 15;
  const paddingTextPopup = 5;
  const color = d3.scaleOrdinal(["Calories brûlées (Kcal)", "Poids (kg)"], ["red","black"]);


  useEffect(()=>{
    // set up svg
    const svg = d3.select(refBarChart.current)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr('viewBox',[0, 0, width, height])
                    .style('background','#FBFBFB')

    //----------- set up axis --------------------------//
    const xScale = d3.scaleBand()
    .domain(data.map(d=>d.day))
    .range([margin.Left,width-margin.Right])
    .paddingInner(0.8)

    const yPoidScale = d3.scaleLinear()
    .domain([lowPoid,upPoid])
    .range([height-margin.Bottom, margin.Top]);
    
    const yCaloScale = d3.scaleLinear()
    .domain([lowCalorie/10,upCalorie])
    .range([height-margin.Bottom, margin.Top])
                     
    // axis generator 
    const xAxis = d3.axisBottom(xScale)
    .ticks(days.length)
    .tickSize(0);
    
    const yAxis = d3.axisRight(yPoidScale)
    .tickValues(d3.range(lowPoid, upPoid +1 ,(upPoid-lowPoid)/3))
    .tickFormat(d3.format("d"))
    .tickSize(-width + margin.Left + margin.Right)

    // axis render 
    svg.append('g')
    .attr('transform',`translate(0,${height-margin.Bottom})`)
    .attr('class','xAxis')
    .call(xAxis)
    svg.append('g')
    .attr('transform',`translate(${width-margin.Right/3},0)`)
    .attr('class','yAxis')
    .call(yAxis)

   // styles to axis
    d3.selectAll('.tick text')
        .style('color','#9B9EAC')
        .style('font-size','2em')
    d3.selectAll('.yAxis .domain')
      .remove()
    d3.selectAll('.yAxis line')
       .attr('transform',`translate(${-margin.Right/3*2},0)`)
       .attr('stroke','#DEDEDE')
       .attr('stroke-width','1px')
       .attr('stroke-dasharray',1)
    d3.selectAll('.yAxis')
      .selectChild('.tick')
      .select('line')
        .style('stroke-width',`0`)
    d3.selectAll('.xAxis .domain')
        .attr('stroke','#DEDEDE')
        .attr('stroke-width','1px')
    d3.selectAll('.xAxis .tick text')
        .attr('transform','translate(0,5)')
    d3.selectAll('.yAxis text')
        .attr("text-anchor", "end")
    

    
    //----------- set up bars --------------------------//
    const roundedRect=(x, y, height, width, radius)=>{
      return "m" + x + "," + (y + radius)
      + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + (-radius)
      + "h" + (width-2*radius)
      + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + (radius)
      + "v" + (height-radius)
      + "h" + (-width)
      + "z";
    }  


    const handlerMouseOver = (e,d)=>{
      d3.select(`.popup${d.day}`).attr('fill','#c4c4c480');
      
      // create text box pop-up
      const textContainer = svg.append('g')
      .append('rect')
      .attr("fill", "red")
      .attr('class',`popup-textContainer${d.day}`)
  
      const textPopup = svg.append('g')
      .append('text')
      .attr('x',xScale(d.day))
      .attr('y',d3.min([yPoidScale(d.poid), yCaloScale(d.calories)])+paddingBarPopUp-paddingTextPopup)
      .attr('fill','white')
      .style('font-size','0.7em')
      
      .attr('class',`popup-text${d.day}`)
  
      textPopup.append('tspan').text(`${d.poid}kg`).attr("text-anchor", "middle")
      textPopup.append('tspan').text(`${d.calories}Kcal`).attr('dy','2em').attr('x',xScale(d.day)).attr("text-anchor", "middle")

      const textBBox = d3.select(`.popup-text${d.day}`).node().getBBox(); // get x,y,hight, width of text already created

      textPopup.attr('transform',`translate(${textBBox.width + xScale.bandwidth()+5},-${textBBox.height/2 + 3*paddingTextPopup})`)
  
      textContainer.attr('x',textBBox.x -paddingTextPopup)
      .attr('y',textBBox.y - 3*paddingTextPopup)
      .attr("width", textBBox.width + 2*paddingTextPopup)
      .attr("height",textBBox.height + 6*paddingTextPopup)
      .attr('transform',`translate(${textBBox.width + xScale.bandwidth()+5}, -${textBBox.height/2 + 3*paddingTextPopup})`)
    }
    

    const handlerMouseOut = (e,d)=>{
      d3.select(`.popup${d.day}`).attr('fill','transparent');
      d3.select(`.popup-textContainer${d.day}`).remove();
      d3.select(`.popup-text${d.day}`).remove();
    }

    // pop-up
    svg.append('g')
    .attr('fill','transparent')
    .selectAll()
    .data(data)
    .join('path')
    .attr("d", d =>{ const y = d3.min([yPoidScale(d.poid), yCaloScale(d.calories)]); 
      let h;
      if(y==yPoidScale(d.poid)){
        h = yPoidScale(lowPoid)-yPoidScale(d.poid);
      }else{
        h = yCaloScale(lowCalorie/10)-yCaloScale(d.calories);
      }
      return roundedRect(xScale(d.day),y, h + paddingBarPopUp, xScale.bandwidth()+paddingBarPopUp*2,0)})
    .attr('transform',d=>`translate(${-paddingBarPopUp},${-paddingBarPopUp})`)
    .attr('class',(d)=>`popup${d.day}`)



    // poids bar
    svg.append('g')
    .selectAll()
    .data(data)
    .enter()
    .append('path')
    .attr('d', d=>roundedRect(xScale(d.day),yPoidScale(d.poid),yPoidScale(lowPoid)-yPoidScale(d.poid),xScale.bandwidth()/3,xScale.bandwidth()/6))
    .attr('fill',color("Poids (kg)"))
    .on("mouseover", (e,d) =>handlerMouseOver(e,d))
    .on("mouseout", (e,d)=>handlerMouseOut(e,d))

    // calories bar

    svg.append('g')
         .style('fill',color("Calories brûlées (Kcal)"))
       .selectAll()
       .data(data)
       .enter()
       .append('path')
        .attr("d", d =>roundedRect(xScale(d.day),yCaloScale(d.calories),yCaloScale(lowCalorie/10)-yCaloScale(d.calories),xScale.bandwidth()/3,xScale.bandwidth()/6))
        .attr('transform',`translate(${xScale.bandwidth()/3*2},0)`)
        .on("mouseover", (e,d) =>handlerMouseOver(e,d))
        .on("mouseout", (e,d)=>handlerMouseOut(e,d))

    // ---------- title -----------------------------//
    svg.append("text")
          .attr("x", margin.Left)
          .attr("y", margin.Top/2)
          .style("font-size", "1.2em")
          .text("Activité quoitidienne");

    // ----------- legend --------------------------//

    const legendSpacing = 230;
    let textWidth = [];
    const legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class','legend')
 

    legend.append('text')
    .text(d=>d)
    .attr('transform',(d,i)=>`translate(${width-margin.Right/3-i*legendSpacing},${margin.Top/2})`)
    .style('font-size','1em')
    .attr('fill','#74798C')
    .attr("text-anchor", "end")
    .each(function(d,i) {
      const thisWidth = this.getComputedTextLength();
      textWidth.push(thisWidth);
    })

    legend.append('circle')
    .attr('cx',(d,i)=>width-margin.Right/3-i*legendSpacing-textWidth[i])
    .attr('cy', margin.Top/2 - xScale.bandwidth()/6)
    .attr('r',xScale.bandwidth()/6)
    .style('fill', color)
    .attr('transform',`translate(-15,0)`)   

  },[data])

  return (
    <>
      <svg ref={refBarChart}>
      </svg>
    </>
  )
}
