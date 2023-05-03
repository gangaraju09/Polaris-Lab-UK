(function(){
//pseudo-global variable    
var attrArray = ["std_dev_age",	"native_share", "education_variability", "job_variability","frac_employed","median_income","gini_index", "Lindqvist_Ostling_S1", "Abramowitz_Saunders_S1","Duca_Saving_S1", "Lindqvist_Ostling_S2", "Abramowitz_Saunders_S2", "Duca_Saving_S2","Lindqvist_Ostling_S3","Abramowitz_Saunders_S3","Duca_Saving_S3"];

var arrayDict = {"admin1_code": "admin1_code", "std_dev_age": "Standard Deviation of Age",	"native_share": "Native Share Variability", "education_variability": "Education Variability","region_name": "Region Name", "job_variability": "Job Variability","frac_employed":"Fraction Employed","median_income": "Median Income","gini_index": "Gini Index", "Lindqvist_Ostling_S1": "Lindqvist Östling S1", "Abramowitz_Saunders_S1": "Abramowitz Saunders S1","Duca_Saving_S1": "Duca Saving S1", "Lindqvist_Ostling_S2": "Lindqvist Östling S2", "Abramowitz_Saunders_S2": "Abramowitz Saunders S2", "Duca_Saving_S2": "Duca Saving S2","Lindqvist_Ostling_S3": "Lindqvist Östling S3","Abramowitz_Saunders_S3": "Abramowitz Saunders S3","Duca_Saving_S3": "Duca Saving S3"};

var arrayObj = [{data:"Lindqvist_Ostling_S1", text:"Lindqvist Östling S1"}, {data:"Abramowitz_Saunders_S1", text:"Abramowitz Saunders S1"}, {data:"Duca_Saving_S1", text:"Duca Saving S1"}, {data:"Lindqvist_Ostling_S2", text:"Lindqvist Östling S2"}, {data:"Abramowitz_Saunders_S2", text:"Abramowitz Saunders S2"}, {data:"Duca_Saving_S2", text:"Duca Saving S2"}, {data:"Lindqvist_Ostling_S3", text:"Lindqvist Östling S3"}, {data:"Abramowitz_Saunders_S3", text:"Abramowitz Saunders S3"}, {data:"Duca_Saving_S3", text:"Duca Saving S3"}];

var arrayObj1 = [{data:"std_dev_age", text:"Standard Deviation of Age"}, {data:"native_share", text:"Native Share Variability"}, {data:"education_variability", text:"Education Variability"}, {data:"job_variability", text:"Job Variability"}, {data:"frac_employed", text:"Fraction of Employed"}, {data:"median_income", text:"Median Income"}, {data:"gini_index", text:"Gini Index of Income Inequality"}];

var expressed = attrArray[13]; // loaded attribute based on index
var expressed1 = attrArray[3];

var dataArray = ["data/polarization1995_data.csv", "data/polarization2000_data.csv", "data/polarization2004_data.csv"];

var dataDict = {"data/polarization1995_data.csv" : "1995", "data/polarization2000_data.csv": "2000", "data/polarization2004_data.csv": "2004"}

var dataObj = [{data: "data/polarization1995_data.csv", text : "1995"}, {data: "data/polarization2000_data.csv", text : "2000"}, {data: "data/polarization2004_data.csv", text : "2004"}];

var expressed2 = dataArray[0];

// create chart dimensions
var chartWidth = window.innerWidth * 0.425,
chartHeight = 473,
leftPadding = 25,
rightPadding = 2,
topBottomPadding = 5,
chartInnerWidth = chartWidth - leftPadding - rightPadding,
chartInnerHeight = chartHeight - topBottomPadding * 2,
translate = "translate(" + (leftPadding+2) + "," + topBottomPadding + ")"
translate1 = "translate("+ leftPadding + "," + (topBottomPadding+463) + ")"

var yScale = d3.scaleLinear()
    .range([463, 0])
    .domain([0, 0.6]);

var xScale = d3.scaleLinear()
    .range([0, chartInnerWidth])
    .domain([0, 10]);

window.onload = setMap();

// setup a choropleth map
function setMap(){
    // map frame dimensions
    var width = window.innerWidth * 0.475;
        height = 473;

    // create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height + 20);

    // create Albers equal area conic projection centered on UK
    var projection = d3.geoAlbers()
        .center([0.00, 49])
        .rotate([5, -6.5, 0])
        .parallels([29.5, 46.5])
        .scale(2350)
        .translate([width / 2, height / 2]);

    // geopath() method helps in drawing the geometries
    var path = d3.geoPath()
        // path holds projection and helps in rendering the projection
        .projection(projection); 
    
    // promises container is created to hold the promise
    var promises = [];

    // d3.csv(), d3.json() methods read csv, topojson files
    promises.push(d3.csv(expressed2));
    promises.push(d3.json("data/UK_regions.topojson"));

    // Promise helps to load the data asynchronously
    // bind the output into callback function
    Promise.all(promises).then(callback);

    var insetMap = map.append("image")
        .attr("class", "insetMap")
        .attr("xlink:href", "assets/UK_IM.svg")
        .attr("width", 250)
        .attr("height", 250)
        .attr("x", 5)
        .attr("y", 5);

    // callback reads the output response of promises (read files - csv, topojson)
    // retrieves the file information
    function callback(data){
        var csvData = data[0], uk = data[1];
        console.log(csvData)

        // testing whether the files are loaded correctly or not
        console.log("CSV data below",csvData);
        console.log("TopoJSON data below",uk);

        // translate uk Regions from topojson to geojson
        var ukRegions = topojson.feature(uk, uk.objects.UK_regions).features;

        // join data of uk Regions
        ukRegions = joinData(ukRegions,csvData);

        // create a colorscale
        var colorScale = makeColorScale(csvData);

        // add enumeration units to the map
        setEnumerationUnits(ukRegions, map, path, colorScale);

        // add scatter plot
        setScatterPlot(csvData, colorScale)

        // add polarization values dropdown to the map
        createDropdown(csvData);
        // add attribute values dropdown to the map
        createDropdown1(csvData);
        createDropdown2(csvData);

        // add color legend
        makeColorLegend(colorScale);
        
    };
};

// Drawing UK regions to map frame
function setEnumerationUnits(ukRegions, map, path, colorScale){
    // add uk to map
    var regions = map.selectAll(".regions")
        .data(ukRegions)
        .enter()
        .append("path")
        .attr("class", function(d){
            // console.log("regions",d.properties.admin1_code)
            return "regions " + d.properties.admin1_code;
        })
        .attr("d", path)
        .style("fill", function(d){            
        var value = d.properties[expressed]; 
        var value1 = d.properties[expressed1]; 
        if(value && value1) {                
            return colorScale(d.properties[expressed], d.properties[expressed1]);            
        } else {                
            return "#ccc";            
        }    
    })
    // mouseover, mouseout events for highlighting or dehighlighting
    .on("mouseover", function(event, d){
        highlight(d.properties);
    })
    .on("mouseout", function(event, d){
        dehighlight(d.properties);
    })
    // label event listener
    .on("mousemove", moveLabel);

    // county dehighlight solution
    var desc = regions.append("desc").text('{"stroke": "#464545", "stroke-width": "0.5px"}');

    // add drop shadow to regions
    var defs = map.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%")
        .attr("width", "150%");

    filter.append("feDropShadow")
        .attr("dx", "1")
        .attr("dy", "1")
        .attr("stdDeviation", "1")
        .attr("flood-color", "#3d3d3d")
        .attr("flood-opacity", "0.4");
    regions.style("filter", "url(#drop-shadow)");
};

// joinData() combines TopoJSON & CSV data based on primary key
function joinData(ukRegions, csvData){
    //loop through csv to assign each set of csv attribute values to geojson region
    for (var i=0; i<csvData.length; i++){
        var csvRegion = csvData[i]; //the current region
        var csvKey = csvRegion.admin1_code; //the CSV primary key

        //loop through geojson Regions to find correct region
        for (var a=0; a<ukRegions.length; a++){

        var geojsonProps = ukRegions[a].properties; //the current region geojson properties
        var geojsonKey = geojsonProps.admin1_code; //the geojson primary key

        //where primary keys match, transfer csv data to geojson properties object
        if (geojsonKey === csvKey){

            //assign all attributes and values
            attrArray.forEach(function(attr){
                var val = parseFloat(csvRegion[attr]); //get csv attribute value
                geojsonProps[attr] = val; //assign attribute and value to geojson properties
            });
            geojsonProps.admin1_code = csvRegion.admin1_code;
        };
        };
    };
    console.log("GeoJSON info below", ukRegions)
    return ukRegions
    
};

// bivariate color scale generator
function makeColorScale(data){
    // various bivaraite color codes are kept for future changes
   /* var colorClasses = ["#e8e8e8", "#e4acac", "#c85a5a",
                        "#b0d5df", "#ad9ea5", "#985356",
                        "#64acbe", "#627f8c", "#574249"];*/

    /*var colorClasses = ["#C4B3D8", "#7C67AB", "#240D5E",
                        "#E6E6E6", "#BFBFBF", "#7F7F7F",
                        "#FFCC80", "#F35926", "#B30000"];*/
    
    /*var colorClasses = ["#E9E6F2", "#E39BCC", "#DE4FA6",
                        "#9CCAE1", "#9080BD", "#843598",
                        "#4FADD0", "#3D64AD", "#2A1A8A"]; */
    
    /*var colorClasses = ["#E8E8E8", "#B8D6BE", "#73AE80",
                        "#B5C0DA", "#90B2B3", "#5A9178",
                        "#6C83B5", "#567994", "#2A5A5B"];   */

    /*var colorClasses = ["#ECE6F2", "#A5C6E5", "#5EA5D8",
                        "#DAA5AC", "#9E799B", "#624D8A",
                        "#C9585C", "#963567", "#621371"]; */   
    
    var colorClasses = ["#FFEFE2", "#98CFE5", "#00AFE7",
                        "#FFB286", "#AF978B", "#427A8E",
                        "#F97529", "#AA5F37", "#5C473D"];  


    // create the color scale based on the bivariate values
    var colorScale = d3.scaleQuantile().range(colorClasses);

    // vcreate separate arrays of values for each attribute
    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<data.length; i++) {
        attr1Values.push(parseFloat(data[i][expressed]));
        attr2Values.push(parseFloat(data[i][expressed1]));
    }

    // get the max and min values for each attribute
    var attr1Max = d3.max(attr1Values);
    var attr1Min = d3.min(attr1Values);
    var attr2Max = d3.max(attr2Values);
    var attr2Min = d3.min(attr2Values);

    // Create an array of bivariate values for each feature
    var bivariateValues = [];
    for (var i=0; i<data.length; i++) {
        var attr1Val = parseFloat(data[i][expressed]);
        var attr2Val = parseFloat(data[i][expressed1]);
        
        var bivariateVal = (attr1Val - attr1Min)/(attr1Max - attr1Min) + (attr2Val - attr2Min)/(attr2Max - attr2Min);
        bivariateValues.push(bivariateVal);
    }
    colorScale.domain(bivariateValues);

    return colorScale;
};

// code to insert diamond legend 
function makeColorLegend(color) {
    var width = 300,
        height = 150;
        topBottomPadding = 5;
  
    var left = document.querySelector(".map").getBoundingClientRect().left,
        bottom  = document.querySelector(".map").getBoundingClientRect().bottom;
  
    var svg = d3.select("body")
        .append("svg")
        .attr("class", "legend")
        .attr("width", width)
        .attr("height", height)
        .style("left", left - 190)
        .style("top", bottom - 210)
        .attr("transform", "rotate(45)");
        
    var legend = svg.selectAll("g.legendEntry")
        .data(color.range().reverse())
        .enter()
        .append("g").attr("class", "legendEntry");
  
    var rectWidth = 23,
        rectHeight = 23,
        rectSpacing = 0,
        numPerRow = 3;

     // Create the tooltip div
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
  
    legend.append("rect")
    .attr("x", function(d, i) {
        var row = Math.floor(i / numPerRow);
        var col = i % numPerRow;
        return width - (numPerRow * (rectWidth + rectSpacing)) + (col * (rectWidth + rectSpacing));
    })
    .attr("y", function(d, i) {
        var row = Math.floor(i / numPerRow);
        return row * (rectHeight + rectSpacing);
    })
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .style("stroke", "#bdbdbd")
    .style("stroke-width", 0.5)
    .style("fill", function (d) { return d; })
    .on("mouseover", function (event, d) {
        var offset = window.scrollY
    //get width of label
    var labelWidth = d3.select(".tooltip")
        .node()
        .getBoundingClientRect()
        .width;

    // use coordinates of mousemove event to set label coordinates
    var x1 = event.clientX + 5,
        y1 = event.clientY - 65 + offset,
        x2 = event.clientX - labelWidth - 10,
        y2 = event.clientY + 25;

    // horizontal label coordinate, testing for overflow
    var x = event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1; 
    // vertical label coordinate, testing for overflow
    var y = event.clientY < 75 ? y2 : y1; 

    d3.select(".tooltip")
        .style("left", x + "px")
        .style("top", y + "px");

        // Show the tooltip and set its content
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip.html("<b>" + d3.select(this).attr("data-legend-label") + "</b>")
    })
    .on("mouseout", function (event, d) {
        // Hide the tooltip
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
    })
    
    .attr("data-legend-label", function(d) {
        // Add a data attribute with the legend label
        return d

       /* UPDATE THE COLOR CODES BELOW 

       if (d == "#e8e8e8"){
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (low)";
        }
        else if (d == "#b0d5df") {
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (med)";
        }
        else if (d == "#64acbe") {
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (high)";
        } 
        else if (d == "#e4acac") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] +  " (low)";
        } 
        else if (d == "#c85a5a") {
            return arrayDict[expressed1] + " (high) " + "<br>" + arrayDict[expressed] + " (low)";
        }
        else if (d == "#ad9ea5") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] + " (med)";
        }
        else if (d == "#574249") {
            return arrayDict[expressed1] + " (high) " + "<br>" + arrayDict[expressed] + " (high)";
        }
        else if (d == "#627f8c") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] + " (high)";
        } 
        else {
            return arrayDict[expressed1] + " (high)" + "<br>" + arrayDict[expressed] + " (med)";
        } */
    });

    // add drop shadow to chart
    var defs = svg.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%")
        .attr("width", "150%");

    filter.append("feDropShadow")
        .attr("dx", "1")
        .attr("dy", "1")
        .attr("stdDeviation", "1")
        .attr("flood-color", "#3d3d3d")
        .attr("flood-opacity", "0.1");
    legend.style("filter", "url(#drop-shadow)");


};

// sets scatter plot based on expressed attributes
function setScatterPlot(csvData, colorScale){
    // create chart dimensions
    var chartWidth = window.innerWidth * 0.425,
        chartHeight = 473,
        leftPadding = 27,
        rightPadding = 0.5,
        topBottomPadding = 5,
        chartInnerWidth = chartWidth - leftPadding - rightPadding,
        chartInnerHeight = chartHeight - topBottomPadding * 2,
        translate = "translate(" + (leftPadding+2) + "," + topBottomPadding + ")"
        translate1 = "translate("+ leftPadding + "," + (topBottomPadding+463) + ")"

    // create a second svg element to hold the bar chart
    var chart = d3.select("body")
        .append("svg")
        .attr("width", chartWidth+20)
        .attr("height", chartHeight+20)
        .attr("class", "chart");

     // create a rectangle for chart background fill
     var chartBackground = chart.append("rect")
     .attr("class", "chartBackground")
     .attr("width", chartInnerWidth + 50)
     .attr("height", chartInnerHeight + 30)
     .attr("transform", translate + ")");

    // create a scale to size lines proportionally to frame and for axis
    var yScale = d3.scaleLinear()
        .range([463, 0])
        .domain([0, 1800]);

    var xScale = d3.scaleLinear()
        .range([0, chartInnerWidth])
        .domain([0, 10]);

     // circles
     var circles = chart.selectAll(".circle")
        .append("rect")
        .data(csvData)
        .join("circle")
        .attr("class", function(d){
            return "circle " + d.admin1_code;
        })
        .attr("cx", function(d){
            return xScale(parseFloat(d[expressed])) + leftPadding 
            
        })
        .attr("cy", function(d){
            return yScale(parseFloat(d[expressed1])) + topBottomPadding;
        })
        .attr("r", "5")
        .style("fill", function(d){
            return colorScale(d[expressed], d[expressed1])
        })
        .attr("stroke", "#636363")
        .attr("width", chartInnerWidth / csvData.length - 5)
        .on("mouseover", function (event, d) {
            highlight(d)
        })
        .on("mouseout", function (event, d) {
            dehighlight(d);
        })    
        .on("mousemove", moveLabel);

    // create a text element for the chart title
    var chartTitle = chart.append("text")
        .attr("x", 40)
        .attr("y", 30)
        .attr("class", "chartTitle")
        .text(arrayDict[expressed] + " Vs " + arrayDict[expressed1]+ " (" + dataDict[expressed2] + ")");
        
    // create vertical axis generator
    var yAxis = d3.axisLeft()
        .scale(yScale);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    // place x-axis, y-axis
    var yAxisGroup = chart.append("g")
    .attr("class", "axis")
    .attr("transform", translate)
    .call(yAxis)
    
    var xAxisGroup = chart.append("g")
    .attr("class", "x-axis")
    .attr("transform", translate1)
    .call(xAxis);

    // create frame for chart border
    var chartFrame = chart.append("rect")
        .attr("class", "chartFrame")
        .attr("width", chartInnerWidth)
        .attr("height", chartInnerHeight)
        .attr("transform", translate);
    
    var desc = circles.append("desc").text('{"stroke": "#636363", "stroke-width": "1px"}');

    // add drop shadow to chart
    var defs = chart.append("defs");
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "150%")
        .attr("width", "150%");

    filter.append("feDropShadow")
        .attr("dx", "1")
        .attr("dy", "1")
        .attr("stdDeviation", "1")
        .attr("flood-color", "#3d3d3d")
        .attr("flood-opacity", "0.4");
    circles.style("filter", "url(#drop-shadow)");

    updateChart(circles, csvData, colorScale);
};

// creates dropdown based on arrayObj array
function createDropdown(csvData){

    var left = document.querySelector('body').getBoundingClientRect().left + 8,
        top = document.querySelector('body').getBoundingClientRect().top + 6;
        bottom = document.querySelector('body').getBoundingClientRect().bottom;

    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .style("left", left + "px")
        .style("top", top + "px")
        .on("change", function(){
            expressed = this.value;
            changeAttribute(csvData)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Polarization Method");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(arrayObj)
        .enter()
        .append("option")
        .attr("value", function(d){ return d.data })
        .text(function(d){ return d.text });
};

// dropdown change listener handler
function changeAttribute(csvData) {

    // recreate the color scale
    var colorScale = makeColorScale(csvData);

    // create separate arrays of values for each attribute
    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<csvData.length; i++) {
        attr1Values.push(parseFloat(csvData[i][expressed]));
        attr2Values.push(parseFloat(csvData[i][expressed1]));
    }
   
    // get the max and min values for each attribute
    var attr1Max = d3.max(attr1Values);
    var attr1Min = d3.min(attr1Values);
    var attr2Max = d3.max(attr2Values);
    var attr2Min = d3.min(attr2Values);
   
    // recolor enumeration units
    var regions = d3.selectAll(".regions")
        .transition()
        .duration(1000)
        .style("fill", function (d) {
            var attr1Val = parseFloat(d.properties[expressed]);
            var attr2Val = parseFloat(d.properties[expressed1]);
           
            var bivariateVal = (attr1Val - attr1Min)/(attr1Max - attr1Min) + (attr2Val - attr2Min)/(attr2Max - attr2Min);
            if (bivariateVal) {
                return colorScale(bivariateVal);
            } else {
                return "#ccc";
            }
    });

    var circles = d3.selectAll(".circle")
        .transition() //add animation
        .delay(function (d, i) {
            return i * 20;
        })
        .duration(700)
        // update cx position based on new attribute value
        .attr("cx", function(d) { 
            return xScale(parseFloat(d[expressed])); 
        }) 
        // update cy position based on new attribute value
        .attr("cy", function(d) {
             return yScale(parseFloat(d[expressed1])); 
        }) 
        .style("fill", function(d) { 
            return colorScale(parseFloat(d[expressed]) - parseFloat(d[expressed1]));
         });
    
    var domainArray = [];
    var domainArray1 = [];
    for (var i=0; i<csvData.length; i++){
        var val = parseFloat(csvData[i][expressed]);
        domainArray.push(val);
        var val1 = parseFloat(csvData[i][expressed1]);
        domainArray1.push(val1);
    };

    var xMax = d3.max(domainArray);
    var yMax = d3.max(domainArray1);

    yScale = d3.scaleLinear()
        .range([463, 0])
        .domain([0, yMax+(0.1*yMax)]);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    xScale = d3.scaleLinear()
        .range([0, chartInnerWidth])
        .domain([0, xMax+(0.1*xMax)]);

    var xAxis = d3.axisBottom()
        .scale(xScale)

    d3.select(".axis").call(yAxis)
    d3.select(".x-axis").call(xAxis)
    d3.select(".x-axis").call(xAxis)

    d3.select(".legend").remove();
    makeColorLegend(colorScale);

    updateChart(circles, csvData, colorScale);
};

function updateChart(circles, csvData, colorScale) {
    // create separate arrays of values for each attribute
    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<csvData.length; i++) {
        attr1Values.push(parseFloat(csvData[i][expressed]));
        attr2Values.push(parseFloat(csvData[i][expressed1]));
    }
   
    // get the max and min values for each attribute
    var attr1Max = d3.max(attr1Values);
    var attr1Min = d3.min(attr1Values);
    var attr2Max = d3.max(attr2Values);
    var attr2Min = d3.min(attr2Values);

    // position circles
    circles.attr("cx", function (d, i) {
        return  xScale(parseFloat(d[expressed])) + leftPadding;
    })
    .attr("width", function (d, i) {
        return  chartWidth - xScale(parseFloat(d[expressed]));
    })
        // resize circles
        .attr("height", function (d, i) {
            return 463 - yScale(parseFloat(d[expressed1]));
        })
        .attr("cy", function (d, i) {
            return yScale(parseFloat(d[expressed1])) + topBottomPadding;
        })
        // recolor circles
        // create separate arrays of values for each attribute

        .style("fill", function (d, i) {
            var attr1Val = parseFloat(d[expressed]);
            var attr2Val = parseFloat(d[expressed1]);
           
            var bivariateVal = (attr1Val - attr1Min)/(attr1Max - attr1Min) + (attr2Val - attr2Min)/(attr2Max - attr2Min);
            if (bivariateVal) {
                return colorScale(bivariateVal);
            } else {
                return "#ccc";
            };
        });

    // add text to chart title
    var chartTitle = d3
        .select(".chartTitle")
        .text(arrayDict[expressed] + " Vs " + arrayDict[expressed1]+ " (" + dataDict[expressed2] + ")");
};

// creates dropdown based on arrayObj array
function createDropdown1(csvData){

    var left = document.querySelector('body').getBoundingClientRect().left + 300,
        top = document.querySelector('body').getBoundingClientRect().top + 6,
        bottom = document.querySelector('body').getBoundingClientRect().bottom;

    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .style("left", left + "px")
        .style("top", top + "px")
        .on("change", function(){
            expressed1 = this.value;
            changeAttribute(csvData)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Calculated Attribute");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(arrayObj1)
        .enter()
        .append("option")
        .attr("value", function(d){ return d.data })
        .text(function(d){ return d.text });
};

// creates dropdown based on arrayObj array
function createDropdown2(csvData){

    var left = document.querySelector('body').getBoundingClientRect().left + 600,
        top = document.querySelector('body').getBoundingClientRect().top + 6,
        bottom = document.querySelector('body').getBoundingClientRect().bottom;

    //add select element
    var dropdown = d3.select("body")
        .append("select")
        .attr("class", "dropdown")
        .style("left", left + "px")
        .style("top", top + "px")
        .on("change", function(){
            expressed2 = this.value;
            changeAttribute(csvData)
            console.log("loaded CSV:",expressed2)
        });

    //add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Year");

    //add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(dataObj)
        .enter()
        .append("option")
        .attr("value", function(d){ return d.data })
        .text(function(d){ return d.text });
};

// function to highlight enumeration units and bars
function highlight(props){
    //change stroke
    var selected = d3.selectAll("." + props.admin1_code)
        .style("stroke", "#252525")
        .style("stroke-width", "2");
        
    setLabel(props);
}; 

// function to reset the element style on mouseout
function dehighlight(props){
    var selected = d3.selectAll("." + props.admin1_code)
        .style("stroke", function(){
            return getStyle(this, "stroke")
        })
        .style("stroke-width", function(){
            return getStyle(this, "stroke-width")
        });

    function getStyle(element, styleName){
        var styleText = d3.select(element)
            .select("desc")
            .text();

        var styleObject = JSON.parse(styleText);
        return styleObject[styleName];
    };

    // remove info label
    d3.select(".infolabel").remove();
};

function setLabel(props){
    // label content
    var labelAttribute = "<b style='font-size:25px;'>" + parseFloat(props[expressed]).toFixed(2) + 
    "</b> <b>" + arrayDict[expressed] + "</b>";
    var labelAttribute1 = "<b style='font-size:25px;'>" + parseFloat(props[expressed1]).toFixed(2) + 
    "</b> <b>" + arrayDict[expressed1] + "</b>";

    //create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.admin1_code + "_label")
        .html(labelAttribute + "<br>" + labelAttribute1);

    var countyName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.nuts118nm + " (" + dataDict[expressed2] +")");
};
  
// function to move info label with mouse
function moveLabel(){
    var offset = window.scrollY
    //get width of label
    var labelWidth = d3.select(".infolabel")
        .node()
        .getBoundingClientRect()
        .width;

    // use coordinates of mousemove event to set label coordinates
    var x1 = event.clientX + 10,
        y1 = event.clientY - 75 + offset,
        x2 = event.clientX - labelWidth - 10,
        y2 = event.clientY + 25;

    // horizontal label coordinate, testing for overflow
    var x = event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1; 
    // vertical label coordinate, testing for overflow
    var y = event.clientY < 75 ? y2 : y1; 

    d3.select(".infolabel")
        .style("left", x + "px")
        .style("top", y + "px");
};
  
})();