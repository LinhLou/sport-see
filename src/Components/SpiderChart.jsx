import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";

export default function SpiderChart({data}) {
  const refSpiderChart = useRef();
  const width = 258;
  const height = 258;
  const step = 18;
  const referenceData = Array(5).fill(1).map((ele,index)=>(index+1)*step);

  useEffect(()=>{
    //-----------set up svg----------------//
    const svg = d3.select(refSpiderChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','#282D30')
    .style('border-radius','5px')
    .attr('class','svgSpider')

    // -------------- draw hexagone -----------------//

    const hexagoneDraw = (step)=>{
      let path = `M${Math.sin(0)*step},${Math.cos(0)*step}`;
      for(let i=1;i<=5;i++){
        path +=`L${Math.sin(Math.PI/3*i)*step},${Math.cos(Math.PI/3*i)*step}`
      }
      path +=`Z`;
      return path
    }
    

    const hexagone = svg.append('g')
    .selectAll()
    .data(referenceData)
    .join('path')
    .attr('d',d=>hexagoneDraw(d))
    .attr('stroke',"white")
    .attr('stroke-width','0.05em')
    .attr('fill','transparent')

    hexagone.attr('transform',`translate(${width/2},${height/2})`);

    const legends = ['Endurance','Force','Vitesse','Intensité','Cardio','Energie'];


    const titre = svg.append('g')
    .selectAll('text')
    .data(legends)
    .join('text')
    .attr('x',(d,i)=>Math.sin(Math.PI/3*i)*(Math.max(...referenceData)+5))
    .attr('y',(d,i)=>Math.cos(Math.PI/3*i)*(Math.max(...referenceData)+5))
    .text(d=>d)
    .attr('fill','white')
    .attr('text-anchor',(d,i)=>{
      if(i==0||i==3){
        return 'middle'
      }
      if(i==1||i==2){
        return 'start'
      }else{
        return 'end'
      }
    })
    .style("font-size", "0.8em")
    .attr('transform',(d,i)=>{
      if(i==0||i==1||i==5){
        return `translate(${width/2},${height/2+10})`
      }else{
        return `translate(${width/2},${height/2})`
      }
    })



  },[data])
  return (
    <svg ref={refSpiderChart}>
      
    </svg>
  )
}
