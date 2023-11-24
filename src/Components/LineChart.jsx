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

    // add mouse event to svg
    d3.select('.svgLine')
    .on("mousemove",(e)=>handlerMouseOver(e))

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

    const getNearestPointCoordinate=(e)=>{
      // get coordinates of nearest point compared with the mouse
      const { pointCoordinates } = getCuvrePointsCoordinates();
      const mousePosition = d3.pointer(e); // get coordinate of mouse

      const ecarts =  pointCoordinates.map((ele)=>Math.pow((Math.pow((ele.x-mousePosition[0]),2)+Math.pow((ele.y-mousePosition[1]),2)),0.5)); // calculate ecart from mouse position to all data points
      const minEcart = ecarts.filter(ele=>ele===Math.min(...ecarts)); 
      const indexMin = ecarts.indexOf(...minEcart);
      return {x:pointCoordinates[indexMin].x, y:pointCoordinates[indexMin].y, index:indexMin, minEcart:minEcart[0]}
    }

    const handlerMouseOver =(e)=>{
      const { x, y, index, minEcart} = getNearestPointCoordinate(e);
      if(minEcart>15){
        svg.selectAll("[class*='popup']").remove(); 
      }else{
        svg.selectAll("[class*='popup']").remove()
        const popup = svg.append('g')
        .attr('class',`popup${index}`)
  
        // draw a rect
        popup.append('rect')
        .attr('x',x)
        .attr('y',0)
        .attr('height',height)
        .attr('width',width-x)
        .attr('fill','black')
        .style('opacity',0.0975)
  
        //draw outer circle
        popup.append('circle')
        .attr('cx',x)
        .attr('cy',y)
        .attr('r','10')
        .attr('fill','white')
        .style('opacity',0.215)
  
        //draw inner circle
        popup.append('circle')
        .attr('cx',x)
        .attr('cy',y)
        .attr('r','5')
        .attr('fill','white')
  
        // draw rect with info
        const paddingText = 5;
        const infosContainer = popup.append('g')
        .append('rect')
        .attr('fill','#FFF')
  
        const text = popup.append('text')
        .attr('x',x)
        .attr('y',y)
        .attr('fill','black')
        .text(`${durationExtend[index]} min`)
        .attr('text-anchor','middle')
        .attr('font-size','1.5em')
        .attr('font-weight','500')
        .attr('class',`text${index}`)
  
        const textBox =  popup.select(`.text${index}`).node().getBBox(); // get x,y,hight, width of text already created
        infosContainer.attr('x',x-textBox.width/2-paddingText)
        .attr('y',textBox.y-paddingText)
        .attr('width',textBox.width+2*paddingText)
        .attr('height',textBox.height+2*paddingText)
  
        if(index==durationExtend.length-2||index==durationExtend.length-3){ // last right popup position
          text.attr('transform',`translate(-${textBox.width/2 + paddingText +5},-20)`)
          infosContainer.attr('transform',`translate(-${textBox.width/2 +paddingText+5},-20)`)
        }else{
          text.attr('transform',`translate(${textBox.width/2 + paddingText +5},-20)`)
          infosContainer.attr('transform',`translate(${textBox.width/2 +paddingText+5},-20)`)
        }
  
      }



    }

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

  },[days, durations])
  return (
    <>
      <svg ref={refLineChart}>
      </svg>
    </>
  )
}
