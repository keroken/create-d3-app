import * as d3 from 'd3'

const url = 'https://udemy-react-d3.firebaseio.com/tallest_men.json'
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
	constructor(element) {
		const svg = d3.select(element)
    .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

    d3.interval(() => {
      console.log("hello")
    }, 1000)
    
    d3.json(url).then(data => {
      const y = d3.scaleLinear()
        .domain([
          d3.min(data, d => d.height) * 0.95,
          d3.max(data, d => d.height)
        ])
        .range([HEIGHT, 0])

      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, WIDTH])
        .paddingInner(0.4)
        .paddingOuter(0.3)

      const xAxisCall = d3.axisBottom(x)
      svg.append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)

      const yAxisCall = d3.axisLeft(y)
      svg.append("g")
        .call(yAxisCall)

      svg.append("text")
        .attr("x", WIDTH / 2)
        .attr("y", HEIGHT + 50)
        .attr("text-anchor", "middle")
        .text("The World's Tallest Men")
      
      svg.append("text")
        .attr("x", -(HEIGHT / 2))
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .text("Height in cm")
        .attr("transform", `rotate(-90)`)


      const reacts = svg.selectAll('rect')
        .data(data)

      reacts.enter()
      .append('rect')
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.height))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d.height))
        .attr("fill", "gray")
    })
    
	}

	update() {
		//let vis = this
    return null
	
	}
}

export default D3Chart