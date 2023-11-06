import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function Barchart({data}) {

  const refBarChart = useRef();
  const height= 100;
  const width = 200;
  const padding = {Top:20, Right: 8, Bottom:20, Left:10}
  console.log(data.kilogram)
  useEffect(()=>{
    // set up svg
    const svg = d3.select(refBarChart.current)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr('viewBox',[0, 0, width, height])
                    .style('background','grey')
    //----------- set up axis --------------------------//
    // set up axis scale
    const xScale = d3.scaleLinear()
                      .domain(d3.extent(data.day))
                      .range([padding.Left, width-4*padding.Right]);
    const yScale = d3.scaleLinear()
                      .domain([d3.min(data.kilogram),d3.max(data.kilogram)+1])
                      .range([height-padding.Top, padding.Bottom])
    // axis generator 
    const xAxis = d3.axisBottom(xScale)
                      .ticks(data.day.length)
                      .tickSize(0);
    const yAxis = d3.axisRight(yScale)
                      .ticks(2)
                      .tickSize(-width + padding.Left + 4*padding.Right)

    // axis render 
    svg.append('g')
        .attr('transform',`translate(0,${height-padding.Bottom})`)
        .attr('class','xAxis')
        .call(xAxis)
    svg.append('g')
        .attr('transform',`translate(${width-2*padding.Right},0)`)
        .attr('class','yAxis')
        .call(yAxis)
   // styles to axis
    d3.selectAll('.tick text')
        .style('color','#9B9EAC')
        .style('font-size','0.6em')
    d3.selectAll('.yAxis .domain')
       .attr('opacity',`0`)
    d3.selectAll('.yAxis line')
       .attr('transform',`translate(${-2*padding.Right},0)`)
       .attr('stroke','#DEDEDE')
       .attr('stroke-width','0.05')
       .attr('stroke-dasharray',1)
    d3.selectAll('.yAxis')
      .selectChild('.tick')
      .select('line')
        .style('stroke-width',`0`)
    d3.selectAll('.xAxis .domain')
        .attr('stroke','#DEDEDE')
        .attr('stroke-width','0.1')
    d3.selectAll('.xAxis .tick text')
        .attr('transform','translate(0,3)')
    
    //----------- set up legends and title --------------------------//
    

  },[data])
  return (
    <>
      <svg ref={refBarChart}>
      </svg>
    </>
  )
}
