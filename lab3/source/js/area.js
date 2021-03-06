/*
  Author: Kahin Akram Hassan
  Date: Jan 31 2018
*/

function area(data) {

  var div = "#area";

  var parentWidth = $(div).parent().width();
  var margin = {top: 10, right: 10, bottom: 80, left: 40},
        margin2 = {top: 500 - 50, right: 40, bottom: 20, left: 40},

        width = parentWidth - margin.left - margin.right;
        height = 500 - margin.top - margin.bottom;
        height2 = 500 - margin2.top - margin2.bottom;


  //Create variable for parsing the time axis
	var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
	
  //Create scales for the axis x,x2, y,y2
    var x = d3.scaleTime().range([0, width]),
    x2 = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    y2 = d3.scaleLinear().range([height2, 0]);
	
  //Sets the axes
    var xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);
	yAxis2 = d3.axisLeft(y2);
	
  //Assigns the brush to the small chart's x axis
	var brush = d3.brushX()
    .extent([[0, 0], [width, height2]])
    .on("brush end", brush);
  
  var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed);

  //Creates the big chart
  var area = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) {
					return x(parseDate(d.time)); })
    .y0(height)
    .y1(function(d) { return y(parseFloat(d.mag)); });

  //Creates the small chart
  var area2 = d3.area()
    .curve(d3.curveMonotoneX)
    .x(function(d) { return x2(parseDate(d.time)); })
    .y0(height2)
    .y1(function(d) { return y2(parseFloat(d.mag)); });

  //Assings the svg canvas to the area div
  var svg = d3.select("div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

		
  //Defines clip region
     svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);
	
  //Set the domains for the 4 axes
    x.domain(d3.extent(data.map(function(d) { return parseDate(d.time); })));
    y.domain(d3.extent(data.map(function(d) { return parseFloat(d.mag); })));
    //Initializes the axis domains for the small chart
    x2.domain(x.domain());
    y2.domain(y.domain());

  //Defines the focus area
  var focus = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Defines the context area
 var context = svg.append("g")
          .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
		  

  //Initializes the axis domains for the big chart
  focus.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);
	  
  focus.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);


  focus.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);
	  
  //Initializes the axis domains for the small chart
  context.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area2);

  context.append("g")
        .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);
	  
	   context.append("g")
        .attr("class", "axis axis--y")
      .call(yAxis2);

  context.append("g")
      .attr("class", "brush")
      .call(brush)
        .selectAll("rect")
        .attr("height", height2 + 7);
		

//Method for brushing
function brush() {
  var s = d3.event.selection || x.range();
  //console.log(s[0]); 
  x.domain(s.map(x2.invert, x2));
  focus.select(".area").attr("d", area);
  focus.select(".axis--x").call(xAxis);
  //Call the filterTime function in map
   map1.filterTime(x.domain());

}

function zoomed() {
  if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
  var t = d3.event.transform;
  x.domain(t.rescaleX(x2).domain());
  focus.select(".area").attr("d", area);
  focus.select(".axis--x").call(xAxis);
  context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
}

}
