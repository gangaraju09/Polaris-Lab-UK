// self-wrapping anonymous function for optimized web performance

(function(){

// pseudo-global variables for dropdown linkages    
var attrArray = ["std_dev_age",	"native_share", "education_variability", "job_variability","frac_employed","median_income","gini_index", "Lindqvist_Ostling_S1", "Abramowitz_Saunders_S1","Duca_Saving_S1", "Lindqvist_Ostling_S2", "Abramowitz_Saunders_S2", "Duca_Saving_S2","Lindqvist_Ostling_S3","Abramowitz_Saunders_S3","Duca_Saving_S3"];

var arrayDict = {"admin1_code": "admin1_code", "std_dev_age": "Standard Deviation of Age",	"native_share": "Native Share Variability", "education_variability": "Education Variability","region_name": "Region Name", "job_variability": "Job Variability","frac_employed":"Fraction Employed","median_income": "Median Income (GBP)","gini_index": "Gini Index", "Lindqvist_Ostling_S1": "Lindqvist Östling S1", "Abramowitz_Saunders_S1": "Abramowitz Saunders S1","Duca_Saving_S1": "Duca Saving S1", "Lindqvist_Ostling_S2": "Lindqvist Östling S2", "Abramowitz_Saunders_S2": "Abramowitz Saunders S2", "Duca_Saving_S2": "Duca Saving S2","Lindqvist_Ostling_S3": "Lindqvist Östling S3","Abramowitz_Saunders_S3": "Abramowitz Saunders S3","Duca_Saving_S3": "Duca Saving S3"};

var arrayObj = [{data:"Lindqvist_Ostling_S1", text:"Lindqvist Östling S1"}, {data:"Abramowitz_Saunders_S1", text:"Abramowitz Saunders S1"}, {data:"Duca_Saving_S1", text:"Duca Saving S1"}, {data:"Lindqvist_Ostling_S2", text:"Lindqvist Östling S2"}, {data:"Abramowitz_Saunders_S2", text:"Abramowitz Saunders S2"}, {data:"Duca_Saving_S2", text:"Duca Saving S2"}, {data:"Lindqvist_Ostling_S3", text:"Lindqvist Östling S3"}, {data:"Abramowitz_Saunders_S3", text:"Abramowitz Saunders S3"}, {data:"Duca_Saving_S3", text:"Duca Saving S3"}];

var arrayObj1 = [{data:"std_dev_age", text:"Standard Deviation of Age"}, {data:"native_share", text:"Native Share Variability"}, {data:"education_variability", text:"Education Variability"}, {data:"job_variability", text:"Job Variability"}, {data:"frac_employed", text:"Fraction of Employed"}, {data:"median_income", text:"Median Income (GBP)"}, {data:"gini_index", text:"Gini Index of Income Inequality"}];

var expressed = attrArray[13]; // loaded attribute based on index
var expressed1 = attrArray[3];

var dataArray = [ "data/polarization_data.csv"];
    
var dataDict = {"data/polarization_data.csv" : "1995", "data/polarization_data.csv": "2000", "data/polarization_data.csv": "2004"}

var dataObj = [{data: "data/polarization_data.csv", text : "1995"}, {data: "data/polarization_data.csv", text : "2000"}, {data: "data/polarization_data.csv", text : "2004"}];

var expressed2 = dataArray[0];

// create a temperory year variable
var currYear = 1995;

var currentSelection = expressed+"_"+currYear
console.log("currentSelection Global value :",currentSelection)

var currentSelection1 = expressed1+"_"+currYear
console.log("currentSelection1 Global value :",currentSelection1)

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

// create global yScale, xScale variables
var yScale = d3.scaleLinear()
    .range([463, 0])
    .domain([0, 0.6]);

var xScale = d3.scaleLinear()
    .range([0, chartInnerWidth])
    .domain([0, 10]);

// page loads setMap function
window.onload = setMap();

// setup a map
function setMap(){
    // map frame dimensions
    var width = window.innerWidth * 0.475;
        height = 473;

    // create a new svg container for the map
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
    promises.push(d3.csv("data/polarization_data.csv"));
    promises.push(d3.json("data/UK_regions.topojson"));

    // Promise helps to load the data asynchronously
    // bind the output into callback function
    Promise.all(promises).then(callback);

    // create the tooltip div for insetMap
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip-insetMap")
        .style("opacity", 0);

    // create insetMap with mouse events
    var insetMap = map.append("image")
        .attr("class", "insetMap")
        .attr("xlink:href", "assets/UK_InsetMap.svg")
        .attr("width", 200)
        .attr("height", 250)
        .attr("x", 5)
        .attr("y", 5)
        // loads a zoomed SVG of UK map
        .on("mouseover", function (event, d) {
            d3.select(this).transition().duration(200)
            .attr("xlink:href", "assets/UK_InsetMap_Zoom.svg")
        
                // Show the tooltip and set its content
                tooltip.transition()
                  .duration(200)
                  .style("opacity", 0.9);
        
                tooltip.html("Inset Map : " + "<b>" + "UK" +"</b>")
        })
        // loads back the previous SVG
        .on("mouseout", function () {
            d3.select(this).transition().delay(200).attr("xlink:href", "assets/UK_InsetMap.svg")
            // Hide the tooltip
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .style("border-radius", "50%");

    // add popup that displays web page information
    var popup = d3.select("body")
        .append("div")
        .attr("class", "popup")
        .html("<h3> Welcome to Polaris Lab UK !</h3> <ul align = 'left'> <li> <b> Attention user :</b> The site only designed to work on desktop and would not work on mobile phones</li> <li>The UK interactive map displayed here does <b>not</b> contain information related to <b> Northern Ireland </b> and <b> Isle of Man </b>. Therefore, these areas are removed </li> <li> Information displayed is calculated data and derived from British Household Panel Survey (<b>BHPS</b>) via UK data service portal. Therefore prone to <b>errors</b>.</li> <li>Proceed with <b>selection</b> of <b>polarization method</b> and an attribute. It has <b>three</b> methods - <b> Lindqvist Östling </b>, <b> Abramowitz Saunders </b>, <b> Duca Saving </b>. <li> Where each polarization method is calculated using three statements (encoding each opinion into value. Strongly agree: 2, Agree: 1, Neither agree nor disagree: 0, Disagree: -1, Strongly disagree: -2) as follows: <ul> <li> Statement 1 (<b>S1</b>): 'Private enterprise is the best way to solve Britain economic problems'</li> <li> Statement 2 (<b>S2</b>): 'Major public services and industries ought to be in state ownership.'</li> <li> Statement 3 (<b>S3</b>): 'It is the government responsibility to provide a job for everyone who wants one'</li></li></ul> </li> <li><b>Select</b> a <b>year</b> from dropdown of available years: <b> 1995, 2000, 2004. </b> </li></ul> <p>By clicking 'OK' to continue, you accept that there errors in the calculations and map display, and they are acceptable.</p> </li> <button class='okBtn'><b>OK</b></button>");

        // show popup when page loads
        window.onload = function() {
            popup.style("display", "block");
        }

        // hide popup when user clicks "OK"
        d3.select(".okBtn").on("click", closePopup);

        // close popup function
        function closePopup() {
        popup.style("display", "none");
    }
    // callback reads the output response of promises (read files - csv, topojson)
    // retrieves the file information
    function callback(data){
        var csvData = data[0], uk = data[1];
            console.log(csvData)

        // testing whether the files are loaded correctly or not
        console.log("CSV data below",csvData);
        console.log("TopoJSON data below",uk);

        // translate UK Regions from topojson to geojson
        var ukRegions = topojson.feature(uk, uk.objects.UK_regions).features;

        // join data of UK Regions
        ukRegions = joinData(ukRegions,csvData);

        // create a colorscale
        var colorScale = makeColorScale(csvData);

        // add enumeration units to the map
        setEnumerationUnits(ukRegions, map, path, colorScale);

        // add scatter plot
        setScatterPlot(csvData, colorScale)

        // add polarization dropdown
        createDropdown(csvData);

        // add attribute dropdown
        createDropdown1(csvData);

        // add years dropdown
        createDropdown2(csvData);

        // add color legend
        makeColorLegend(colorScale);
        
    };
};

// add UK regions to display
function setEnumerationUnits(ukRegions, map, path, colorScale){
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
        var value = d.properties[currentSelection]; 
        var value1 = d.properties[currentSelection1]; 
        console.log(d.properties)
        if(value && value1) {                
            return colorScale(d.properties[currentSelection], d.properties[currentSelection1]);            
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

    // UK regions dehighlight solution
    var desc = regions.append("desc").text('{"stroke": "#464545", "stroke-width": "0.5px"}');

    // add drop shadow to UK regions
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
    // loop through csv to assign each set of csv attribute values to geojson region
    for (var i=0; i<csvData.length; i++){
        var csvRegion = csvData[i]; //the current region
        var csvKey = csvRegion.admin1_code; //the CSV primary key

        // loop through geojson Regions to find correct region
        for (var a=0; a<ukRegions.length; a++){

        var geojsonProps = ukRegions[a].properties; // current region geojson properties
        var geojsonKey = geojsonProps.admin1_code; // geojson primary key

        // where primary keys match, transfer csv data to geojson properties object
        if (geojsonKey === csvKey){
            var years = ["1995","2000","2004"];
            //assign all attributes and values
            attrArray.forEach(function(attr){
                years.forEach(function(year){
                    var tempAttr = attr + "_" + year;
                    var val = parseFloat(csvRegion[tempAttr]); // get csv attribute value
                    geojsonProps[tempAttr] = val; // assign attribute and value to geojson properties
                })
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
    
    var colorClasses = ["#FFFFFF", "#98CFE5", "#00AFE7",
                        "#FFB286", "#AF978B", "#427A8E",
                        "#F97529", "#AA5F37", "#5C473D"];  


    // create the color scale based on the bivariate values
    var colorScale = d3.scaleQuantile().range(colorClasses);

    // create separate arrays of values for each attribute
    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<data.length; i++) {
        attr1Values.push(parseFloat(data[i][currentSelection]));
        attr2Values.push(parseFloat(data[i][currentSelection1]));
    }

    // get the max and min values for each attribute
    var attr1Max = d3.max(attr1Values);
    var attr1Min = d3.min(attr1Values);
    var attr2Max = d3.max(attr2Values);
    var attr2Min = d3.min(attr2Values);

    // create an array of bivariate values for each feature
    var bivariateValues = [];
    for (var i=0; i<data.length; i++) {
        var attr1Val = parseFloat(data[i][currentSelection]);
        var attr2Val = parseFloat(data[i][currentSelection1]);
        
        var bivariateVal = (attr1Val - attr1Min)/(attr1Max - attr1Min) + (attr2Val - attr2Min)/(attr2Max - attr2Min);
        bivariateValues.push(bivariateVal);
    }
    colorScale.domain(bivariateValues);

    return colorScale;
};

// create diamond or bivariate legend
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

     // create tooltip div to add popup text
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
    .attr("data-legend-label", function(d) {
        // add data attribute with the legend label
        if (d == "#FFFFFF"){
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (low)";
        }
        else if (d == "#FFB286") {
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (med)";
        }
        else if (d == "#F97529") {
            return arrayDict[expressed1] + " (low) " + "<br>" + arrayDict[expressed] + " (high)";
        } 
        else if (d == "#98CFE5") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] +  " (low)";
        } 
        else if (d == "#00AFE7") {
            return arrayDict[expressed1] + " (high) " + "<br>" + arrayDict[expressed] + " (low)";
        }
        else if (d == "#AF978B") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] + " (med)";
        }
        else if (d == "#5C473D") {
            return arrayDict[expressed1] + " (high) " + "<br>" + arrayDict[expressed] + " (high)";
        }
        else if (d == "#AA5F37") {
            return arrayDict[expressed1] + " (med) " + "<br>" + arrayDict[expressed] + " (high)";
        } 
        else {
            return arrayDict[expressed1] + " (high)" + "<br>" + arrayDict[expressed] + " (med)";
        }
    })
    .style("stroke", "#bdbdbd")
    .style("stroke-width", 0.5)
    .style("fill", function (d) { return d; })
    .on("mouseover", function (event, d) {

    var offset = window.scrollY
    // get width of label
    var labelWidth = d3.select(".tooltip")
        .node()
        .getBoundingClientRect()
        .width;

    // use coordinates of mousemove event to set label coordinates
    var x1 = event.clientX + 2,
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

    // show the tooltip and set its content
    tooltip.transition()
        .duration(200)
        .style("opacity", 0.9);

    tooltip.html("<b>" + d3.select(this).attr("data-legend-label") + "</b>")
    })
    .on("mouseout", function (event, d) {
        // hide the tooltip
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
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

// create scatter plot for expressed attributes
function setScatterPlot(csvData, colorScale){
    // create chart dimensions
    var chartWidth = window.innerWidth * 0.425,
        chartHeight = 473,
        leftPadding = 29,
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

     // create circles
     var circles = chart.selectAll(".circle")
        .append("rect")
        .data(csvData)
        .join("circle")
        .attr("class", function(d){
            return "circle " + d.admin1_code;
        })
        .attr("cx", function(d){
            return xScale(parseFloat(d[currentSelection])) + leftPadding 
            
        })
        .attr("cy", function(d){
            return yScale(parseFloat(d[currentSelection1])) + topBottomPadding;
        })
        .attr("r", "5")
        .style("fill", function(d){
            return colorScale(d[currentSelection], d[currentSelection1])
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
        .text(arrayDict[expressed] + " Vs " + arrayDict[expressed1]+ " (" + currYear + ")");
        
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

    //add select element
    var dropdown = d3.select(".dropdown-container")
        .append("select")
        .attr("class", "dropdown")
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

    var currentSelection = expressed+"_"+currYear
    var currentSelection1 = expressed1+"_"+currYear

    // create separate arrays of values for each attribute
    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<csvData.length; i++) {
        attr1Values.push(parseFloat(csvData[i][currentSelection]));
        attr2Values.push(parseFloat(csvData[i][currentSelection1]));
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
            var attr1Val = parseFloat(d.properties[currentSelection]);
            var attr2Val = parseFloat(d.properties[currentSelection1]);
           
            var bivariateVal = (attr1Val - attr1Min)/(attr1Max - attr1Min) + (attr2Val - attr2Min)/(attr2Max - attr2Min);
            if (bivariateVal) {
                return colorScale(bivariateVal);
            } else {
                return "#ccc";
            }
    });
    // update circles based on selection
    var circles = d3.selectAll(".circle")
        .transition() //add animation
        .delay(function (d, i) {
            return i * 20;
        })
        .duration(700)
        // update cx position based on new attribute value
        .attr("cx", function(d) { 
            return xScale(parseFloat(d[currentSelection])); 
        }) 
        // update cy position based on new attribute value
        .attr("cy", function(d) {
             return yScale(parseFloat(d[currentSelection1])); 
        }) 
        .style("fill", function(d) { 
            return colorScale(parseFloat(d[currentSelection]) - parseFloat(d[currentSelection1]));
         });
    
    var domainArray = [];
    var domainArray1 = [];
    for (var i=0; i<csvData.length; i++){
        var val = parseFloat(csvData[i][currentSelection]);
        domainArray.push(val);
        var val1 = parseFloat(csvData[i][currentSelection1]);
        domainArray1.push(val1);
    };

    var xMax = d3.max(domainArray);
    var xMin = d3.min(domainArray);

    var yMax = d3.max(domainArray1);
    var yMin = d3.min(domainArray1);
    

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
     
    // call updated axes     
    d3.select(".axis").call(yAxis)
    d3.select(".x-axis").call(xAxis)

    // remove color legend and tooltip. Reinitialize with updated values from dropdown
    d3.select(".legend").remove();
    d3.select(".tooltip").remove();
    makeColorLegend(colorScale);

    updateChart(circles, csvData, colorScale);
};

function updateChart(circles, csvData, colorScale) {
    // create separate arrays of values for each attribute
    var currentSelection = expressed+"_"+currYear
    var currentSelection1 = expressed1+"_"+currYear

    var attr1Values = [];
    var attr2Values = [];
    for (var i=0; i<csvData.length; i++) {
        attr1Values.push(parseFloat(csvData[i][currentSelection]));
        attr2Values.push(parseFloat(csvData[i][currentSelection1]));
    }
   
    // get the max and min values for each attribute
    var attr1Max = d3.max(attr1Values);
    var attr1Min = d3.min(attr1Values);
    var attr2Max = d3.max(attr2Values);
    var attr2Min = d3.min(attr2Values);

    // position circles
    circles.attr("cx", function (d, i) {
        return  xScale(parseFloat(d[currentSelection])) + leftPadding;
    })
    .attr("width", function (d, i) {
        return  chartWidth - xScale(parseFloat(d[currentSelection]));
    })
        // resize circles
    .attr("height", function (d, i) {
        return 463 - yScale(parseFloat(d[currentSelection1]));
    })
    .attr("cy", function (d, i) {
        return yScale(parseFloat(d[currentSelection1])) + topBottomPadding;
    })
    // recolor circles and create separate arrays of values for each attribute
    .style("fill", function (d, i) {
        var attr1Val = parseFloat(d[currentSelection]);
        var attr2Val = parseFloat(d[currentSelection1]);
        
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
        .text(arrayDict[expressed] + " Vs " + arrayDict[expressed1]+ " (" + currYear +  ")");
};

// creates dropdown for attribute values
function createDropdown1(csvData){
    //add select element
    var dropdown = d3.select(".dropdown-container")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            expressed1 = this.value;
            changeAttribute(csvData)
        });

    // add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Select Calculated Attribute");

    // add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(arrayObj1)
        .enter()
        .append("option")
        .attr("value", function(d){ return d.data })
        .text(function(d){ return d.text });
};

// creates dropdown for year
function createDropdown2(csvData){

    // add select element
    var dropdown = d3.select(".dropdown-container")
        .append("select")
        .attr("class", "dropdown")
        .on("change", function(){
            currYear = this.value
            changeAttribute(csvData)
            console.log("currYear:", currYear)
        });

    // add initial option
    var titleOption = dropdown.append("option")
        .attr("class", "titleOption")
        .attr("disabled", "true")
        .text("Year");

    // add attribute name options
    var attrOptions = dropdown.selectAll("attrOptions")
        .data(dataObj)
        .enter()
        .append("option")
        .attr("value", function(d){ return d.text })
        .text(function(d){ return d.text });
};

// function to highlight enumeration units and bars
function highlight(props){
    // change stroke
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
    var currentSelection = expressed+"_"+currYear
    var currentSelection1 = expressed1+"_"+currYear

    var labelAttribute = "<b style='font-size:25px;'>" + parseFloat(props[currentSelection]).toFixed(2) + 
    "</b> <b>" + arrayDict[expressed] + "</b>";
    var labelAttribute1 = "<b style='font-size:25px;'>" + parseFloat(props[currentSelection1]).toFixed(2) + 
    "</b> <b>" + arrayDict[expressed1] + "</b>";

    // create info label div
    var infolabel = d3.select("body")
        .append("div")
        .attr("class", "infolabel")
        .attr("id", props.admin1_code + "_label")
        .html(labelAttribute + "<br>" + labelAttribute1);

    var countyName = infolabel.append("div")
        .attr("class", "labelname")
        .html(props.nuts118nm + " (" + currYear +")");
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