// set the dimensions and margins of the graph
var marginb = { top: 20, right: 30, bottom: 150, left: 50 },
    widthb = 10000 - marginb.left - marginb.right,
    heightb = 600 - marginb.top - marginb.bottom;

// append the svg object to the body of the page
var svg = d3.select("#Area")
    .append("svg")
    .attr("width", widthb + marginb.left + marginb.right)
    .attr("height", heightb + marginb.top + marginb.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginb.left + "," + marginb.top + ")");

// Parse the Data
d3.csv("2011_Direct_MPs.csv", function (data) {

    // List of subgroups = header of the csv files = soil condition here
    var data2 = []
    data = d3.nest()
        .key(function (d) { return d.Constituency; })
        .entries(data)
    var subgroups = ['NRM', 'INDEPENDENT', 'FDC','NUP','UPC','DP']
    d3.map(data, function (d) {
        var obj = { 'Constituency': d.key, }
        d3.map(d.values, function (d2) {
            obj[d2['Political Party']] = d2.Votes
            obj['Name'] = d2.Name
        })
        data2.push(obj)

    })
    data = data2
    data2 = []



    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function (d) { return (d.Constituency) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, widthb])
        .padding([0.2])
    svg.append("g")
        .attr("transform", "translate(0," + heightb + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 25000])
        .range([heightb, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c', '#377eb8', '#4daf4a'])

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + x(d.Constituency) + ",0)"; })
        .selectAll("rect")
        .data(function (d) {
            return subgroups.map(function (key) {
                if (d[key]) {
                    return {
                        key: key,
                        Constituency: d.Constituency,
                        value: d[key],
                        Name: d.Name
                    };
                }

            }).filter(e => !!e);
        })
        .enter().append("rect")
        .attr("x", function (d) { return xSubgroup(d.key); })
        .attr("y", function (d) {

            return y(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) { return heightb - y(d.value); })
        .attr("fill", function (d) { return color(d.key); });

})