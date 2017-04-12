// We define a variable holding the current key to visualize on the map.
if (document.getElementById("map")) {
var currentKey = 'education';
var countryName = 'country';

// Listen to changes of the dropdown to select the key to visualize on
// the map.
d3.select('#select-key').on('change', function(a) {
  // Change the current key and call the function to update the colors.
  currentKey = d3.select(this).property('value');
  updateMapColors();
});

// We add a listener to the browser window, calling updateLegend when
// the window is resized.
window.onresize = updateLegend;

var countryCodes = {
  "Austria": 1,
  "Belgium": 2,
  "Bulgaria": 3,
  "Croatia": 4,
  "Cyprus": 5,
  "Czech Republic": 6,
  "Denmark": 7,
  "Estonia": 8,
  "Finland": 9,
  "France": 10,
  "Germany": 11,
  "Greece": 12,
  "Hungary": 13,
  "Iceland": 14,
  "Ireland": 15,
  "Italy": 16,
  "Latvia": 17,
  "Lithuania": 18,
  "Luxembourg": 19,
  "Malta": 20,
  "Netherlands": 21,
  "Norway": 22,
  "Poland": 23,
  "Portugal": 24,
  "Romania": 25,
  "Slovakia": 26,
  "Slovenia": 27,
  "Spain": 28,
  "Sweden": 29,
  "Switzerland": 30,
  "United Kingdom": 31
}

// We specify the dimensions for the map container. We use the same
// width and height as specified in the CSS.
var width = 700,
    height = 500;

// We define a variable to later hold the data of the CSV.
var mapData;

// We create a SVG element in the map container and give it some
// dimensions.
var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);

// We add a <g> element to the SVG element and give it a class to
// style. We also add a class name for Colorbrewer.
var mapFeatures = svg.append('g')
  .attr('class', 'features YlGnBu');

// We add a <div> container for the tooltip, which is hidden by default.
var tooltip = d3.select("#map")
  .append("div")
  .attr("class", "tooltip hidden");

// We define a geographical projection
//     https://github.com/mbostock/d3/wiki/Geo-Projections
// and set the initial zoom to show the features.
var projection = d3.geoMercator()
  // The approximate scale factor was found through try and error
  .center([ 17, 55 ])
  .translate([ width/2, height/2 ])
  .scale([ width/1.4 ]);

// We prepare a path object and apply the projection to it.
var path = d3.geoPath()
  .projection(projection);

// We prepare an object to later have easier access to the data.
var dataById = d3.map();

// We create a quantize scale to categorize the values in 9 groups.
// The domain is static and has a maximum of 100 (based on the
// assumption that no value can be larger than 100%).
// The scale returns text values which can be used for the color CSS
// classes (q0-9, q1-9 ... q8-9)
var quantize = d3.scaleQuantize()
    .range(d3.range(5).map(function(i) { return 'q' + i + '-5'; }));

//Legend stuff

  // We prepare a number format which will always return 2 decimal places.
var formatNumber = d3.format('.1f');

  // For the legend, we prepare a very simple linear scale. Domain and
  // range will be set later as they depend on the data currently shown.
var legendX = d3.scaleLinear();

  // We use the scale to define an axis. The tickvalues will be set later
  // as they also depend on the data.
var legendXAxis = d3.axisBottom()
  .scale(legendX)
  .tickSize(13)
  .tickFormat(function(d) {
    return formatNumber(d);
  });

  // We create an SVG element in the legend container and give it some
  // dimensions.
var legendSvg = d3.select('#legend').append('svg')
  .attr('width', '100%')
  .attr('height', '44');

  // To this SVG element, we add a <g> element which will hold all of our
  // legend entries.
var g = legendSvg.append('g')
    .attr("class", "legend-key YlGnBu")
    .attr("transform", "translate(" + 20 + "," + 20 + ")");

  // We add a <rect> element for each quantize category. The width and
  // color of the rectangles will be set later.
g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
  .enter().append("rect");

  // We add a <text> element acting as the caption of the legend. The text
  // will be set later.
g.append("text")
    .attr("class", "caption")
    .attr("y", -6)

  /**
   * Function to update the legend.
   * Somewhat based on http://bl.ocks.org/mbostock/4573883
   */
function updateLegend() {

    // We determine the width of the legend. It is based on the width of
    // the map minus some spacing left and right.
  var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 50;

    // We determine the domain of the quantize scale which will be used as
    // tick values. We cannot directly use the scale via quantize.scale()
    // as this returns only the minimum and maximum values but we need all
    // the steps of the scale. The range() function returns all categories
    // and we need to map the category values (q0-9, ..., q8-9) to the
    // number values. To do this, we can use invertExtent().
  var legendDomain = quantize.range().map(function(d) {
    var r = quantize.invertExtent(d);
    return r[1];
  });
    // Since we always only took the upper limit of the category, we also
    // need to add the lower limit of the very first category to the top
    // of the domain.
  legendDomain.unshift(quantize.domain()[0]);

    // On smaller screens, there is not enough room to show all 10
    // category values. In this case, we add a filter leaving only every
    // third value of the domain.
  if (legendWidth < 400) {
    legendDomain = legendDomain.filter(function(d, i) {
      return i % 3 == 0;
    });
  }

    // We set the domain and range for the x scale of the legend. The
    // domain is the same as for the quantize scale and the range takes up
    // all the space available to draw the legend.
  legendX
    .domain(quantize.domain())
    .range([0, legendWidth]);

    // We update the rectangles by (re)defining their position and width
    // (both based on the legend scale) and setting the correct class.
  g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
    .attr("height", 8)
    .attr("x", function(d) { return legendX(d[0]); })
    .attr("width", function(d) { return legendX(d[1]) - legendX(d[0]); })
    .attr('class', function(d, i) {
      return quantize.range()[i];
    });

    // We update the legend caption. To do this, we take the text of the
    // currently selected dropdown option.
  var keyDropdown = d3.select('#select-key').node();
  var selectedOption = keyDropdown.options[keyDropdown.selectedIndex];
  g.selectAll('text.caption')
    .text(selectedOption.text);

    // We set the calculated domain as tickValues for the legend axis.
  legendXAxis
    .tickValues(legendDomain)

    // We call the axis to draw the axis.
  g.call(legendXAxis);
}

//Load the features from the TopoJSON.
d3.json('/test.json', function(error, features) {
  // Read the data for the cartogram
  d3.csv('/spending_2015.csv', function(data) {

    // We store the data object in the variable which is accessible from
    // outside of this function.
    mapData = @category_data;

    dataByCountry = d3.nest()
      .key(function(d) { return d.country; })
      .rollup(function(d) { return d[0]; })
      .object(data);

      // We add the features to the <g> element created before.
      // D3 wants us to select the (non-existing) path objects first ...
    mapFeatures.selectAll('path')
      // ... and then enter the data. For each feature, a <path>
      // element is added.
      .data(features.features)
    .enter().append('path')
      // .attr('class', function(d) {

      // })
      // As "d" attribute, we set the path of the feature.
      .attr('d', path)
      // When the mouse moves over a feature, show the tooltip.
      .on('mousemove', showTooltip)
      .on('mouseout', removeTooltip);

    // Call the function to update the map colors.
    updateMapColors();

  });

});

/**
 * Update the colors of the features on the map. Each feature is given a
 * CSS class based on its value.
 */
function updateMapColors() {
  // Set the domain of the values (the minimum and maximum values of
  // all values of the current key) to the quantize scale.
  quantize.domain([
    d3.min(mapData, function(d) { return getValueOfData(d); }),
    d3.max(mapData, function(d) { return getValueOfData(d); })
  ]);
  // Update the class (determining the color) of the features.
  mapFeatures.selectAll('path')
    .attr('class', function(f) {
        // Use the quantized value for the class.
        if(countryCodes.hasOwnProperty(f.properties.name)){
          return quantize(dataByCountry[f.properties.name][currentKey]);
        }
        else{
          return "empty"
        }
    });
  // We call the function to update the legend.
  updateLegend();
}

/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(d) {
  if(countryCodes.hasOwnProperty(d.properties.name)){

  var data = dataByCountry[d.properties.name];
  var dataCurrentKey = data[currentKey]
  var mouse = d3.mouse(d3.select('#map').node()).map(
    function(d) { return parseInt(d); }
  );

  var left = Math.min(width - 4 * data.country.length, mouse[0] + 5);
  var top = mouse[1] + 25;

  tooltip.classed('hidden', false)
    .attr("style", "left:" + left + "px; top:" + top + "px")
    .html("<div><p>"+ data.country + ": " + dataCurrentKey +"</p></div>");
  }
}


function removeTooltip(){
    tooltip.classed('hidden', true);
}
/**
 * Helper function to access the (current) value of a data object.
 *
 * Use "+" to convert text values to numbers.
 *
 * @param {object} d - A data object representing an entry (one line) of
 * the data CSV.
 */
function getValueOfData(d) {
  return +d[currentKey];
}

function getValueOfCountry(d) {
  return +d[countryName];
}

/**
 * Helper function to retrieve the ID of a feature. The ID is found in
 * the properties of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function getIdOfFeature(f) {
  return countryCodes[f.properties.name];

}
}
