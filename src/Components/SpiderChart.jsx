import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";

export default function SpiderChart({data}) {
  const refSpiderChart = useRef();
  const width = 258;
  const height = 258;
  const margin = {Top:100, Right:0, Bottom:50, Left:0};

  useEffect(()=>{
    //-----------set up svg----------------//
    const svg = d3.select(refSpiderChart.current)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr('viewBox',[0, 0, width, height])
    .style('background','#282D30')
    .style('border-radius','5px')
    .attr('class','svgSpider')

    // --------------- set up axis---------------//

  },[data])
  return (
    <svg ref={refSpiderChart}>hello</svg>
  )
}
