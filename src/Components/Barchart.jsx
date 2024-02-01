import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function Barchart({days, poids, calories}) {

  const refBarChart = useRef();
  const height= 320;
  const width = 835;
  const margin = {Top:112, Right: 110, Bottom:62, Left:43};
  const upCalorie = Math.max(...calories);
  const lowCalorie = Math.min(...calories);
  const lowPoid = Math.floor(Math.min(...poids))-1;
  const upPoid = Math.ceil((Math.max(...poids)-lowPoid)/3)*3+lowPoid;
  const paddingBarPopUp = 15;
  const paddingTextPopup = 5;
  const color = d3.scaleOrdinal(["Calories brûlées (Kcal)", "Poids (kg)"], ["red","black"]);

  useEffect(()=>{
    //------------ set up svg------------------------//
    const svg = d3.select(refBarChart.current)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr('viewBox',[0, 0, width, height])
                    .attr('background-color', '#FBFBFB')

    //----------- set up axis --------------------------//
    const xScale = d3.scaleBand()
    .domain(days)
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
    svg.selectAll('.tick text')
        .style('color','#9B9EAC')
        .style('font-size','2.4em')
    svg.selectAll('.yAxis .domain')
      .remove()
    svg.selectAll('.yAxis line')
       .attr('transform',`translate(${-margin.Right/3*2},0)`)
       .attr('stroke','#DEDEDE')
       .attr('stroke-width','1px')
       .attr('stroke-dasharray',1)
    svg.selectAll('.yAxis')
      .selectChild('.tick')
      .select('line')
        .style('stroke-width',`0`)
    svg.selectAll('.xAxis .domain')
        .attr('stroke','#DEDEDE')
        .attr('stroke-width','1px')
    svg.selectAll('.xAxis .tick text')
        .attr('transform','translate(0,5)')
    svg.selectAll('.yAxis text')
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
      const index = days.indexOf(days.filter(ele=>ele===d)[0]);
      svg.select(`.popup${d}`).attr('fill','#c4c4c480');
      
      // create text box pop-up
      const textContainer = svg.append('g')
      .append('rect')
      .attr("fill", "red")
      .attr('class',`popup-textContainer${d}`)
  
      const textPopup = svg.append('g')
      .append('text')
      .attr('x',xScale(d))
      .attr('y',d3.min([yPoidScale(poids[index]), yCaloScale(calories[index])])+paddingBarPopUp-paddingTextPopup)
      .attr('fill','white')
      .style('font-size','1em')
      .attr('class',`popup-text${d}`)
  
      textPopup.append('tspan').text(`${poids[index]}kg`).attr("text-anchor", "middle")
      textPopup.append('tspan').text(`${calories[index]}Kcal`).attr('dy','2em').attr('x',xScale(d)).attr("text-anchor", "middle")

      const textBBox = svg.select(`.popup-text${d}`).node().getBBox(); // get x,y,hight, width of text already created

      textPopup.attr('transform',`translate(${textBBox.width + xScale.bandwidth()+5},-${textBBox.height/2 + 3*paddingTextPopup})`)
  
      textContainer.attr('x',textBBox.x -paddingTextPopup)
      .attr('y',textBBox.y - 3*paddingTextPopup)
      .attr("width", textBBox.width + 2*paddingTextPopup)
      .attr("height",textBBox.height + 6*paddingTextPopup)
      .attr('transform',`translate(${textBBox.width + xScale.bandwidth()+5}, -${textBBox.height/2 + 3*paddingTextPopup})`)
    }
    
    const handlerMouseOut = (e,d)=>{
      svg.select(`.popup${d}`).attr('fill','transparent');
      svg.select(`.popup-textContainer${d}`).remove();
      svg.select(`.popup-text${d}`).remove();
    }

    // pop-up
    svg.append('g')
    .attr('fill','transparent')
    .selectAll()
    .data(days)
    .join('path')
    .attr("d", (d,i) =>{ const y = d3.min([yPoidScale(poids[i]), yCaloScale(calories[i])]); 
      let h;
      if(y==yPoidScale(poids[i])){
        h = yPoidScale(lowPoid)-yPoidScale(poids[i]);
      }else{
        h = yCaloScale(lowCalorie/10)-yCaloScale(calories[i]);
      }
      return roundedRect(xScale(d),y, h + paddingBarPopUp, xScale.bandwidth()+paddingBarPopUp*2,0)})
    .attr('transform',`translate(${-paddingBarPopUp},${-paddingBarPopUp})`)
    .attr('class',(d)=>`popup${d}`)



    // poids bar
    svg.append('g')
    .selectAll()
    .data(days)
    .enter()
    .append('path')
    .attr('d', (d,i)=>roundedRect(xScale(d),yPoidScale(poids[i]),yPoidScale(lowPoid)-yPoidScale(poids[i]),xScale.bandwidth()/3,xScale.bandwidth()/6))
    .attr('fill',color("Poids (kg)"))
    .on("mouseover", (e,d) =>handlerMouseOver(e,d))
    .on("mouseout", (e,d)=>handlerMouseOut(e,d))

    // calories bar

    svg.append('g')
         .style('fill',color("Calories brûlées (Kcal)"))
       .selectAll()
       .data(days)
       .enter()
       .append('path')
        .attr("d", (d,i) =>roundedRect(xScale(d),yCaloScale(calories[i]),yCaloScale(lowCalorie/10)-yCaloScale(calories[i]),xScale.bandwidth()/3,xScale.bandwidth()/6))
        .attr('transform',`translate(${xScale.bandwidth()/3*2},0)`)
        .on("mouseover", (e,d,i) =>handlerMouseOver(e,d,i))
        .on("mouseout", (e,d)=>handlerMouseOut(e,d))

    // ---------- title -----------------------------//
    svg.append("text")
          .attr("x", margin.Left)
          .attr("y", margin.Top/2)
          .style("font-size", "1.5em")
          .text("Activité quoitidienne")
          .attr('class','titleBarChart')

    // ----------- legend --------------------------//

    const legendSpacing = 300;
    let textWidth = [];
    const legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class','legend')
 

    legend.append('text')
    .text(d=>d)
    .attr('transform',(d,i)=>`translate(${width-margin.Right/3-i*legendSpacing},${margin.Top/2})`)
    .style('font-size','1.3em')
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

  },[days, poids, calories])

  return (
    <>
      <svg ref={refBarChart}>
      </svg>
    </>
  )
}
