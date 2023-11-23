import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";

export default function SpiderChart({ performance }) {
  const performanceShift = performance.toReversed();
  const values = performanceShift.map(ele=>Object.values(ele)[0]);
  const legends=['Intensité','Vitesse','Force','Endurance','Energie','Cardio'];

  const maxPerformance = Math.max(...values)+Math.max(...values)*10/100;
  const refSpiderChart = useRef();
  const width = 350;
  const height = 350;
  const margin = 60;
  const step = maxPerformance/5;
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

    // -------------- draw hexagones -----------------//
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
    //  ---------------------- draw radarChart-------------------//
    const coordinatesCalcul = (values)=>{
      let coordonnates = values.map((ele,i)=>{
        const x = xScale(0) + Math.sin(Math.PI/3*i)*ele*taux;
        const y = yScale(ele) + [1-Math.cos(Math.PI/3*i)]*ele*taux;
        return {x,y}
      })

      coordonnates = [...coordonnates,coordonnates[0]]
      return coordonnates;
    }

    const coordonnates = coordinatesCalcul(values);

    svg.append('path')
    .attr("fill", "red")
    .datum(coordonnates)
    .attr("d", d3.line()
                  .x(d=>d.x)
                  .y(d=>d.y)
    )
    .attr('opacity',0.7)

    // ----------------------- legends -------------------------//
    const titre = svg.append('g')
    .selectAll('text')
    .data(legends)
    .join('text')
    .attr('x',(d,i)=>xScale(0)+Math.sin(Math.PI/3*i)*(width/2-margin+margin/3))
    .attr('y',(d,i)=>yScale(d3.max(referenceData))+[1-Math.cos(Math.PI/3*i)]*(height/2-margin+margin/4))
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
      switch(i){
        case 0 :
          return `translate(0,${-margin/3})`;
        case 1 :
          return `translate(${-margin/6},${-margin/8})`;
        case 2 :
          return `translate(${-margin/6},${-margin/4})`;
        case 3 :
          return `translate(0,0)`;
        case 4 :
          return `translate(${margin/6},${-margin/4})`;
        case 5 :
          return `translate(${margin/6},${-margin/8})`
      }
    })

  },[performance])
  return (
    <svg ref={refSpiderChart}>
    </svg>
  )
}
