// @TODO: YOUR CODE HERE!
// Set up our chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
	.select('#scatter')
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight)
	.append("g")

// Append group element
	var chart = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);

  d3.select("body")
	 .append("div")
	 .style("opacity", 1)

// Import data from the data.csv file, call the function healthData
  d3.csv("/assets/data/data.csv").then(function(data) {

 // Parse data
  data.forEach(function(d) {
	  d.poverty = +d.poverty;
	  d.healthcare = +d.healthcare;
  });

// Create the scales for the chart
	var x = d3.scaleLinear()
        .range([0, chartWidth]);
	var y = d3.scaleLinear()
        .range([chartHeight, 0]);

	var bottomAxis = d3.axisBottom(x);
	var leftAxis = d3.axisLeft(y);

// Scale the range of the data
	x.domain([d3.min(data, function(d){
		return +d.poverty;})-1
        ,d3.max(data, function(d){
		return +d.poverty;
	})+1]);

	y.domain([d3.min(data, function(d){
		return +d.healthcare;})-0.5
        ,d3.max(data, function(d){
		return +d.healthcare;
	})+1]);

// Defining the circles on the chart
	chart.selectAll("circle")
		.data(data) 
		.enter().append("circle")
			.attr("cx", function(data, index){
				console.log(data.poverty);
				return x(data.poverty);
			})
			.attr("cy", function(data, index){
				console.log(data.healthcare);
				return y(data.healthcare);
			})
			.attr('r', "10")
			.attr("fill", "blue")   
			.style("opacity", 0.5);
            
    chart.selectAll("text")
        .data(data)
        .enter().append("text")
            .attr("x", function(data, index){
				console.log(data.poverty);
				return x(data.poverty) - 5;
			})
			.attr("y", function(data, index){
				console.log(data.healthcare);
				return y(data.healthcare) + 2;
			})
            .style("font-size", "8px")
            .style("fill", "white")
            .text(function(data){
                return data.abbr;
            });

// Add the x-axis
	chart.append("g")
		.attr("transform", `translate(0, ${chartHeight})`)
		.call(bottomAxis);

// Add the y-axis
	chart.append('g')
		.call(leftAxis);

// Text for the y-axis
	chart.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left + 40)
		.attr("x", 0 - (chartHeight)/2 - 40)
		.attr("dy", "1em")
		.attr("class", "axisText")
		.style("text-anchor", "margintop")
        .style("font-weight", "bold")
		.text("Lacks Healthcare (%)")

// Text for the x-axis
	chart.append("text")
		.attr("transform", "translate(" + (chartWidth/2) + ", " + (chartHeight + margin.top + 20) + ")")
		.attr("class", "axisText")
		.style("text-anchor", "middle")
        .style("font-weight", "bold")
		.text("In Poverty (%)");

})
