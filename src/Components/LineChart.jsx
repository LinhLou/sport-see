import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";
import { append } from 'stylis';

export default function LineChart({data}) {

  const days = data.map(ele=>ele.day);
  const durations = data.map(ele=>ele.duration);
  const refLineChart = useRef();
  const width = 258;
  const height = 258;
  const margin = {Top:100, Right:0, Bottom:40, Left:0};
  const opacity = 0.5;
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
    .style('font-size','1.2em')

    // -------------- draw line ------------------//

    const getCuvrePointsCoordinates = (data)=>{
      
      // get coordinates of points in curve corresponding to data points
      const curvePath = svg.select('.lineChart').attr('d');
      const curvePointsArray = curvePath.split(/M|L|C/);
      const nbrItem = curvePointsArray.length;
      let pointCoordinates = curvePointsArray.reduce((acc,ele,index)=>{
        if(ele.split(',').length==data.length-1&&index!=nbrItem-2){
          acc = [...acc,{x:ele.split(',')[4],y:ele.split(',')[5]}];
          return acc;
        }else{
          return acc;
        }
      },[{x:curvePointsArray[1].split(',')[0], y:curvePointsArray[1].split(',')[1]}]);
      
      pointCoordinates = [...pointCoordinates,{x:curvePointsArray[nbrItem-1].split(',')[0], y:curvePointsArray[nbrItem-1].split(',')[1]}];
      console.log(pointCoordinates)

      return {pointCoordinates}
    }

    const getNearestPointCoordinate=(e)=>{
      // get coordinates of nearest point compared with the mouse
      const { pointCoordinates } = getCuvrePointsCoordinates(data);
      const mousePosition = d3.pointer(e); // get coordinate of mouse

      const xEcarts =  pointCoordinates.map((ele)=>Math.abs(ele.x-mousePosition[0]));
      const xMinEcart = xEcarts.filter(ele=>ele===Math.min(...xEcarts));
      const indexMin = xEcarts.indexOf(...xMinEcart);
      return {x:pointCoordinates[indexMin].x, y:pointCoordinates[indexMin].y, index:indexMin}
    }

    const handlerMouseOver =(e)=>{
      const {x, y, index} = getNearestPointCoordinate(e);
      console.log(index)
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

      //draw circle
      popup.append('circle')
      .attr('cx',x)
      .attr('cy',y)
      .attr('r','10')
      .attr('fill','white')
      .style('opacity',0.215)

      //draw circle
      popup.append('circle')
      .attr('cx',x)
      .attr('cy',y)
      .attr('r','5')
      .attr('fill','white')

      // draw rect with info
      const paddingText = 5;
      const infosContainer = svg.append('g')
      .append('rect')
      .attr('fill','#FFF')
      .attr('class',`infosContainer${index}`)

      const text = svg.append('text')
      .attr('x',x)
      .attr('y',y)
      .attr('fill','black')
      .text(`${data[index].duration} min`)
      .attr('text-anchor','middle')
      .attr('font-size','0.8em')
      .attr('class',`text${index}`)

      const textBox =  svg.select(`.text${index}`).node().getBBox(); // get x,y,hight, width of text already created
      infosContainer.attr('x',x-textBox.width/2-paddingText)
      .attr('y',textBox.y-paddingText)
      .attr('width',textBox.width+2*paddingText)
      .attr('height',textBox.height+2*paddingText)


      text.attr('transform',`translate(0,-15)`)
      infosContainer.attr('transform',`translate(0,-15)`)

    }
    const handlerMouseOut = (e)=>{
      const {index} = getNearestPointCoordinate(e);
      svg.select(`.popup${index}`).remove();
      svg.select(`.infosContainer${index}`).remove();
      svg.select(`.text${index}`).remove();
    }

    svg.append('path')
    .datum(data)
    .attr("fill", "none")
    .attr('d',d3.line()
      .x((d)=>xScale(d.day))
      .y((d)=>yScale(d.duration))
      .curve(d3.curveBasis)
    )
    .attr('class','lineChart')
    .attr("stroke", "#FFF")
    .attr("stroke-width", '2px')
    .attr('opacity',opacity)
    .on("mouseover",(e)=>handlerMouseOver(e))
    .on("mouseout",(e)=>handlerMouseOut(e))

    // const { pointCoordinates } = getCuvrePointsCoordinates(data);

    // svg.append('g')
    // .selectAll()
    // .data(pointCoordinates)
    // .join('circle')
    // .attr('cx', d=>d.x)
    // .attr('cy',d=>d.y)
    // .attr('r',width/16)
    // .attr('opacity',0.6)
    // .on("mouseover",(e)=>handlerMouseOver(e))
    // .on("mouseout",(e)=>handlerMouseOut(e))


    //-------------- title ----------------------//
    const paddingTop = 40;
    const title = svg.append('text')
    .attr('x',paddingTop)
    .attr('y',margin.Top/2)
    .attr('fill','#FFF')
    .attr('font-size','1.2em')
    .attr('opacity',opacity)

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
