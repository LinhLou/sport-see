import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function RadarBarChart({ score }) {
  console.log(score)
  const refRadarBarChart =  useRef();
  const width = 350;
  const height = 350;
  const margin = 60;
  const thickness = 14;

  useEffect(()=>{
    // ------------ set up svg ----------------//
    const svg = d3.select(refRadarBarChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','#FBFBFB')
    .style('border-radius','5px')

    // ------------ draw circle ------------------//
    const radius = width/2-margin;
    const angle = 2*Math.PI*score;
    const larg_arc = (()=>score<0.5 ? 0 : 1)();

    // inner circle or case score=1
    svg.selectAll()
    .data([score])
    .join('circle')
    .attr('cx',width/2)
    .attr('cy',height/2)
    .attr('fill','white')
    .attr('r', d=>d==1? radius: radius-thickness/2)
    .attr('stroke-width',d => d==1? thickness:0)
    .attr('stroke',d => d==1? 'red': 'transparent')

    // outer circle or case score <1
    svg.selectAll()
    .data([score])
    .join('path')
    .attr('d',`M${width/2},${margin}A${radius} ${radius} 0 ${larg_arc} 0 ${width/2-Math.sin(angle)*radius} ${margin+(1-Math.cos(angle))*radius}`)
    .attr('stroke','red')
    .attr('stroke-width',d=>d==1? 0: thickness)
    .attr('fill','transparent')
    .attr('stroke-linecap',"round")

    // ------------ title ------------------//
    svg.append('text')
    .attr('x',margin/2)
    .attr('y',margin-thickness/2)
    .text('Score')
    .style('font-size','1.2em')

    const rate = score*100;
  

    const textCenter = svg.append('g')
    .append('text')
    .attr('x',width/2)
    .attr('y',height/2)
    .attr('text-anchor','middle')

     textCenter.append('tspan')
     .text(`${score*100}%`)
     .attr('font-weight','700')
     .attr('font-size','1.6em')

     textCenter.append('tspan')
     .attr('x',width/2)
     .attr('dy','2em')
     .text('de votre')
     .attr('fill','#74798C')
     .attr('font-weight','500')
     textCenter.append('tspan')
     .attr('x',width/2)
     .attr('dy','2em')
     .text('objectif')
     .attr('fill','#74798C')
     .attr('font-weight','500')

  },[score])

  return (
    <svg ref={refRadarBarChart}>

    </svg>
  )
}
