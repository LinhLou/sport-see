import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";


export default function LineChart({days, durations}) {
  const daysExtend = [0,...days,8];
  const durationExtend = [durations[0],...durations,durations[durations.length-1]];

  const refLineChart = useRef();
  const width = 350;
  const height = 350;
  const margin = {Top:140, Right:0, Bottom:50, Left:0};
  const opacity = 0.5;

  useEffect(()=>{
    // ------------set up svg------------------//
    const svg = d3.select(refLineChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','red')
    .style('border-radius','5px')
    .attr('class','svgLine')


    // -----------set up axis -------------------//
 
      // axis scales
      const xScale = d3.scalePoint()
      .domain(daysExtend)
      .range([margin.Left, width-margin.Right])
      .padding(-0.5);
 
      
     const yScale = d3.scaleLinear()
     .domain([d3.min(durationExtend)/2,d3.max(durationExtend)])
     .range([height-margin.Bottom, margin.Top])

    // axis generator
    const tickLabels = ['','L','M','M','J','V','S','D',''];
    const xAxis = d3.axisBottom(xScale)
    .tickFormat((d,i)=>tickLabels[i])
    .tickSizeOuter(2)
    .tickSize(0)

    const yAxis  = d3.axisLeft(yScale)

    // axis render
    svg.append('g')
    .attr('transform',`translate(0,${height-margin.Bottom})`)
    .call(xAxis)

    svg.append('g')
    .attr('transform',`translate(0,0)`)
    .call(yAxis)

    // axis styled
    svg.selectAll('.domain')
    .remove()

    svg.selectAll('.tick text')
    .style('color',"white")
    .style('opacity',opacity)
    .style('font-size','2.5em')
    .attr('transform','translate(0,10)')

    //-------------- title ----------------------//
    const paddingTop = 40;
    const title = svg.append('text')
    .attr('x',paddingTop)
    .attr('y',margin.Top/2)
    .attr('fill','#FFF')
    .attr('font-size','2em')
    .attr('opacity',opacity)

    title.append('tspan')
    .text('Durée moyenne des')
    .attr('text-anchor','start')
    title.append('tspan')
    .text('sessions')
    .attr('x',paddingTop)
    .attr('dy', '1.2em')


    // d3.select('.svgLine')
    // .on("mouseout",(e,d)=>handlerMouseOut(e,d))
    

    // -------------- draw line ------------------//
    // draw line
    svg.append('path')
    .datum(daysExtend)
    .attr("fill", "none")
    .attr('d',d3.line()
      .x((d)=>xScale(d))
      .y((d,i)=>yScale(durationExtend[i]))
      .curve(d3.curveBumpX) 
    )
    .attr("stroke", "white")
    .attr("stroke-width", '0.2em')
    .attr('opacity',opacity)
    .attr('class','lineChart')

    // -------------- draw ombre popup ----------

    svg.append('g')
    .selectAll()
    .data(daysExtend)
    .join('rect')
    .attr('x', (d)=>xScale(d))
    .attr('y',0)
    .attr('height',height)
    .attr('width',(d)=>width-xScale(d))
    .attr('fill','transparent')
    .attr('class',(d,i)=>`ombre_popup${i}`)


    // -------------- draw circle and text popup ----------
    const getCuvrePointsCoordinates = ()=>{
      // get coordinates of points in curve corresponding to data points
      const curvePath = svg.select('.lineChart').attr('d');
      const curvePointsArray = curvePath.split(/M|L|C/);

      let pointCoordinates = curvePointsArray.reduce((acc,ele)=>{
        if(ele.split(',').length==6){
          acc = [...acc,{x:ele.split(',')[4],y:ele.split(',')[5]}];
          return acc;
        }else{
          return acc;
        }
      },[{x:curvePointsArray[1].split(',')[0], y:curvePointsArray[1].split(',')[1]}]);
      return {pointCoordinates}
    }
    const {pointCoordinates}=getCuvrePointsCoordinates();

    // inner Circle
    svg.append('g')
    .selectAll()
    .data(daysExtend)
    .join('circle')
    .attr('cx',(d,i)=>{
      return pointCoordinates[i].x
    })
    .attr('cy',(d,i)=>{
      return pointCoordinates[i].y
    })
    .attr('r','5')
    .attr('fill','transparent')
    .attr('class',(d,i)=>`circleInner_popup${i}`)


    // outer Circle
    svg.append('g')
    .selectAll()
    .data(daysExtend)
    .join('circle')
    .attr('cx',(d,i)=>{
      return pointCoordinates[i].x
    })
    .attr('cy',(d,i)=>{
      return pointCoordinates[i].y
    })
    .attr('r','10')
    .attr('fill','transparent')
    .attr('class',(d,i)=>`circleOuter_popup${i}`)
    .style('opacity',0.215)

    // text 

      const infosContainer = svg.append('g')
      .selectAll()
      .data(daysExtend)
      .join('rect')
      .attr('fill','#FFF')
      .attr('class',(d,i)=>`infosContainer_popup${i}`)

      const text = svg.append('g')
      .selectAll()
      .data(daysExtend)
      .join('text')
      .attr('x',(d,i)=>{
        return pointCoordinates[i].x
      })
      .attr('y',(d,i)=>{
        return pointCoordinates[i].y
      })
      .attr('fill','black')
      .text((d,i)=>`${durationExtend[i]} min`)
      .attr('text-anchor','middle')
      .attr('font-size','1.5em')
      .attr('font-weight','500')
      .attr('opacity',0)
      .attr('class',(d,i)=>`text_popup${i}`)


    //--------------add zone to trigger evenments------------//
    svg.append('g')
    .selectAll()
    .data(daysExtend)
    .join('rect')
    .attr('x',(d)=>xScale(d))
    .attr('y',0)
    .attr('height',height)
    .attr('width',(d,i)=>{
      if(i!==daysExtend.length-1){
        return (xScale(daysExtend[i+1])-xScale(d));
      }
    })
    .attr('stroke', 'transparent')
    .attr('fill', 'transparent')
    .on("mousemove",(e,d)=>handlerMouseOver(e,d))
    .on("mouseout",(e,d)=>handlerMouseOut(e,d))
    
    // add mouse event to svg



    const handlerMouseOut = (e,d)=>{
      const index = daysExtend.indexOf(d);

      d3.select(`.ombre_popup${index}`)
      .attr('fill','transparent')
      d3.select(`.circleOuter_popup${index}`)
      .attr('fill','transparent')
      .style('opacity',0.215)
      d3.select(`.circleInner_popup${index}`)
      .attr('fill','transparent')

      d3.select(`.text_popup${index}`)
      .attr('opacity',0);
      
      svg.selectAll(`.infosContainer_popup${index}`)
      .attr('opacity',0)

    }

    const styleText = (index)=>{
      d3.select(`.text_popup${index}`)
      .attr('opacity',1)
      const paddingText = 5;

      const textBox =  svg.select(`.text_popup${index}`).node().getBBox(); // get x,y,hight, width of text already created

      svg.select(`.infosContainer_popup${index}`)
      .attr('x',pointCoordinates[index].x-textBox.width/2-paddingText)
      .attr('y',textBox.y-paddingText)
      .attr('width',textBox.width+2*paddingText)
      .attr('height',textBox.height+2*paddingText)
      .attr('opacity',1)

      if(index==durationExtend.length-2||index==durationExtend.length-3){ // last right popup position
        text.attr('transform',`translate(-${textBox.width/2 + paddingText +5},-20)`)
        infosContainer.attr('transform',`translate(-${textBox.width/2 +paddingText+5},-20)`)
      }else{
        text.attr('transform',`translate(${textBox.width/2 + paddingText +5},-20)`)
        infosContainer.attr('transform',`translate(${textBox.width/2 +paddingText+5},-20)`)
      }
    }

    const handlerMouseOver =(e,d)=>{
      const index = daysExtend.indexOf(d);
      console.log(index)

      // d3.select(`.ombre_popup${index}`)
      // .attr('fill','black')
      // .style('opacity',0.0975)
      // d3.select(`.circleOuter_popup${index}`)
      // .attr('fill','white')
      // .style('opacity',0.215)
      // d3.select(`.circleInner_popup${index}`)
      // .attr('fill','white')

      if(index==0){
        d3.select(`.ombre_popup${index+1}`)
        .attr('fill','black')
        .style('opacity',0.0975)
        d3.select(`.circleOuter_popup${index+1}`)
        .attr('fill','white')
        .style('opacity',0.215)
        d3.select(`.circleInner_popup${index+1}`)
        .attr('fill','white')

        d3.select(`.text_popup${index}`)
        .attr('opacity',1)

        styleText(index+1);

      }else{
        d3.select(`.ombre_popup${index}`)
        .attr('fill','black')
        .style('opacity',0.0975)
        d3.select(`.circleOuter_popup${index}`)
        .attr('fill','white')
        .style('opacity',0.215)
        d3.select(`.circleInner_popup${index}`)
        .attr('fill','white')

        styleText(index);
      }

      // if(index!==0||index!==daysExtend.length-1){
  
  
      //   d3.select(`.text_popup${index}`)
      //   .attr('opacity',1)
      //   const paddingText = 5;
  
      //   const textBox =  svg.select(`.text_popup${index}`).node().getBBox(); // get x,y,hight, width of text already created
  
      //   svg.select(`.infosContainer_popup${index}`)
      //   .attr('x',pointCoordinates[index].x-textBox.width/2-paddingText)
      //   .attr('y',textBox.y-paddingText)
      //   .attr('width',textBox.width+2*paddingText)
      //   .attr('height',textBox.height+2*paddingText)
      //   .attr('opacity',1)
  
      //   if(index==durationExtend.length-2||index==durationExtend.length-3){ // last right popup position
      //     text.attr('transform',`translate(-${textBox.width/2 + paddingText +5},-20)`)
      //     infosContainer.attr('transform',`translate(-${textBox.width/2 +paddingText+5},-20)`)
      //   }else{
      //     text.attr('transform',`translate(${textBox.width/2 + paddingText +5},-20)`)
      //     infosContainer.attr('transform',`translate(${textBox.width/2 +paddingText+5},-20)`)
      //   }
  

      // }
      

    }


  },[days, durations])
  return (
    <>
      <svg ref={refLineChart}>
      </svg>
    </>
  )
}
