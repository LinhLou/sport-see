import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

export default function LineChart({data}) {

  const days = data.map(ele=>ele.day);
  const durations = data.map(ele=>ele.duration);
  const refLineChart = useRef();
  const width = 258;
  const height = 258;
  const margin = {Top:100, Right:0, Bottom:40, Left:0};
  useEffect(()=>{
    // ------------set up svg------------------//
    const svg = d3.select(refLineChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','red')
    .style('border-radius','5px')

    // -----------set up axis -------------------//
    // axis scales
    const xScale = d3.scalePoint()
    .domain(days)
    .range([margin.Left, width-margin.Right])
    .padding(0.5);

    const yScale = d3.scaleLinear()
    .domain([0,d3.max(durations)])
    .range([height-margin.Bottom, margin.Top])

    // axis generator
    const tickLabels = ['L','M','M','J','V','S','D'];
    const xAxis = d3.axisBottom(xScale)
    .tickFormat((d,i)=>tickLabels[i])
    .tickSizeOuter(2)
    .tickSize(-height)

    const yAxis  = d3.axisLeft(yScale)


    // axis render
    svg.append('g')
    .attr('transform',`translate(0,${height-margin.Bottom})`)
    .call(xAxis)

    svg.append('g')
    .attr('transform',`translate(0,0)`)
    .call(yAxis)

    // -------------- draw line ------------------//
    const handlerMouseOver =(e,d)=>{
      const mousePosition = d3.pointer(e);
      const lineCoordinates = svg.select('.lineChart').attr('d');
      const arrayCoordinates = lineCoordinates.split(/M|L|C/);
      const pointCoordinates = arrayCoordinates.reduce((acc,ele)=>{
        console.log(ele.split(','))
        if(ele.split(',').length==6){
          acc = [...acc,{x:ele.split(',')[4],y:ele.split(',')[5]}];
          return acc;
        }else{
          return acc;
        }
      },[{x:arrayCoordinates[1].split(',')[0], y:arrayCoordinates[1].split(',')[1]}]);

      
      // console.log(lineCoordinates,arrayCoordinates,arrayCoordinates.length)
      console.log(pointCoordinates);

      // const infos = svg.selectAll('.lineChart').node().getBBox();
      // console.log(infos)

      // const xEcarts =  d.map((ele)=>Math.abs(xScale(ele.day)-mousePosition[0]));
      // const xMinEcart = xEcarts.filter(ele=>ele===Math.min(...xEcarts));
      // const indexMin = xEcarts.indexOf(...xMinEcart);

      // console.log(d.map((ele)=>Math.abs(xScale(ele.day))),mousePosition[0])
      // d.filter(ele=>xScale(ele.day))
      // console.log(xScale(d[indexMin].day));
      // console.log(xScale(d[indexMin].day));
      // console.log(mousePosition[0],mousePosition[1])
      // d.filter(ele=>)
      svg.append('g')
      .selectAll('circle')
      .data(pointCoordinates)
      .join('circle')
      .attr('cx',d=>d.x)
      .attr('cy',d=>d.y)
      .attr('r','3')
      .attr('fill','white')
      .attr('class', `circle`)

    }

    // svg.append('g')
    // .selectAll()
    // .data(data)
    // .join('path')
    // .attr('d',d3.line()
    //   .x((d)=>xScale(d.day))
    //   .y((d)=>yScale(d.duration))
    //   .curve(d3.curveBasis)
    // )
    // .attr('class','lineChart')
    // .attr("stroke", "black")
    // .attr("stroke-width", 1.5)

    svg.append('path')
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr('d',d3.line()
      .x((d)=>xScale(d.day))
      .y((d)=>yScale(d.duration))
      .curve(d3.curveBasis)
    )
    .attr('class','lineChart')
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .on("mouseover",(e,d)=>handlerMouseOver(e,d))


    //-------------- title ----------------------//
    const paddingTop = 40;
    const title = svg.append('text')
    .attr('x',paddingTop)
    .attr('y',margin.Top/2)

    title.append('tspan')
    .text('Durée moyenne des')
    .attr('text-anchor','start')
    title.append('tspan')
    .text('sessions')
    .attr('x',paddingTop)
    .attr('dy', '1.5em')

  





  },[data])
  return (
    <>
      <svg ref={refLineChart}>
      </svg>
    </>
  )
}
