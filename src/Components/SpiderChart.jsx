import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";

export default function SpiderChart({data}) {
  const refSpiderChart = useRef();
  const width = 350;
  const height = 350;
  const margin = 60;
  const step = 10;
  const referenceData = Array(5).fill(1).map((ele,index)=>(index+1)*step);

  useEffect(()=>{
    //-----------set up svg----------------//
    const svg = d3.select(refSpiderChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','#282D30')
    .style('border-radius','5px')
    .attr('class','svgSpider')

    //----------------- set up axis------------------//
    const xScale = d3.scaleLinear()
    .domain([-d3.max(referenceData),d3.max(referenceData)])
    .range([margin, width-margin])
    const yScale = d3.scaleLinear()
    .domain([-d3.max(referenceData),d3.max(referenceData)])
    .range([height-margin, margin])

    // const xAxis = d3.axisBottom(xScale)
    // const yAxis = d3.axisLeft(yScale)

    // svg.append('g')
    // .attr('transform',`translate(0,${height/2})`)
    // .call(xAxis)

    // svg.append('g')
    // .attr('transform',`translate(${width/2},0)`)
    // .call(yAxis)

    // -------------- draw hexagone -----------------//
    const taux = (width-2*margin)/d3.max(referenceData)/2;
    const hexagoneDraw = (x0,y0,step)=>{
      let path = `M${x0},${y0}`;
      for(let i=1;i<=5;i++){
        const dx = Math.sin(Math.PI/3*i)*step;
        const dy = [1-Math.cos(Math.PI/3*i)]*step;
        path +=`L${x0+dx},${y0+dy}`;
      }
      path +=`Z`;
      return path
    }

    const hexagone = svg.append('g')
    .selectAll()
    .data(referenceData)
    .join('path')
    .attr('d',d=>hexagoneDraw(xScale(0),yScale(d),d*taux))
    .attr('stroke',"white")
    .attr('stroke-width','0.05em')
    .attr('fill','transparent')


    const legends = ['Endurance','Force','Vitesse','Intensité','Cardio','Energie'];


    const titre = svg.append('g')
    .selectAll('text')
    .data(legends)
    .join('text')
    .attr('x',(d,i)=>Math.sin(Math.PI/3*i)*(width/2-margin+margin/4))
    .attr('y',(d,i)=>Math.cos(Math.PI/3*i)*(height/2-margin+margin/4))
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
        return `translate(${width/2},${height/2+margin/4})`
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
