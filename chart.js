var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var sVg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  // translate this svg element to leave some margin.
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("MPS_RESULTS_2021.csv",function(data){
        data.sort(function(b, a){
            return a.Votes -b.Votes;
        });
        // X scale and Axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.Name; }))
    .padding(0.2);        // This is the min and the max of the data: 0 to 100 if percentages
    sVg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // X scale and Axis
    var y = d3.scaleLinear()
    .domain([100, 6500000])
    .range([ height, 0]);
    sVg.append("g")
    .call(d3.axisLeft(y));

    // Bars
  sVg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Name); })
    .attr("y", function(d) { return y(d.Votes); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Votes); })
    .attr("fill", "#69b3a2")
    })

