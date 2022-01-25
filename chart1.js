var margin = { top: 50, right: 100, bottom: 150, left: 100 },
  width = 800 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page

var datag = []
function draw(year) {
  var data = datag[year]
  var sVg = d3.select("#Area").html("")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    // translate this svg element to leave some margin.
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  data.sort(function (b, a) {
    return a.Votes - b.Votes;
  });
  // X scale and Axis
  var x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) { return d.Candidate; }))
    .padding(0.2);        // This is the min and the max of the data: 0 to 100 if percentages
  sVg.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  /*sVg.append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2) - margin)
  .attr('y', margin / 2.4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('Votes (0000)');*/

  /*sVg.append('text')
  .attr('class', 'title')
  .attr('x', width / 2 + margin)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .text('Most loved programming languages in 2018')*/

  // X scale and Axis
  var y = d3.scaleLinear()
    .domain([100, 6500000])
    .range([height, 0]);
  sVg.append("g")
    .call(d3.axisLeft(y));


  // Bars
  sVg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.Candidate); })
    .attr("y", function (d) { return y(d.Votes); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.Votes); })
    .attr("fill", "#69b3a2")
}



d3.queue()
  .defer(d3.csv, 'presidents.csv')
  .defer(d3.csv, 'presidents_2011.csv')
  .defer(d3.csv, 'presidents_2011.csv')
  /*.defer(d3.csv, 'monthly_data_2011.csv')
  .defer(d3.csv, 'monthly_data_2010.csv')
  .defer(d3.csv, 'monthly_data_2009.csv')*/
  .await(function (error, d2021, d2016, d2011, d2006,d2001) {
    datag['2001'] = d2001;
    datag['2006'] = d2006;
    datag['2011'] =d2011;
    datag['2016'] = d2016;
    datag['2021'] = d2021;
    draw('2021');
  });


var slider = d3.select('#year');
slider.on('change', function () {
  draw(this.value);
});

