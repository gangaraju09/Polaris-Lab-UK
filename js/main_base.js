//begin script when window loads
window.onload = setMap();

//Example 1.3 line 4...set up choropleth map
function setMap() {
    //map frame dimensions
    var width = 960,
        height = 750;

    //create new svg container for the map
    var map = d3
        .select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3
        .geoAlbers()
        .center([0, 55])
        .rotate([1, 0, 0])
        .parallels([50, 60])
        .scale(2500)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [
        d3.csv("data/unitsData.csv"),
        d3.json("data/UK_regions.topojson"),
    ];
    Promise.all(promises).then(callback);

    function callback(data) {
        var csvData = data[0],
            france = data[1];

        //translate europe TopoJSON
        var ukRegions = topojson.feature(france, france.objects.UK_regions).features;

        //add France regions to map
        var regions = map
            .selectAll(".regions")
            .data(ukRegions)
            .enter()
            .append("path")
            .attr("class", function (d) {
                return "regions " + d.properties.admin1_code;
            })
            .attr("d", path);
    }
}