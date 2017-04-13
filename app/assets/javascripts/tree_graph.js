if (document.getElementById("tree_graph")) {
var treeData = NEW_DATA;

// var treeData = {
//   "YEAR" : "2015",
//   "children" : [
//     {
//       "CATEGORY_CODE" : "GF01",
//       "CATEGORY" : "General public services",
//       "VALUE" : 6.9,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0101",
//           "CATEGORY" : "Executive and legislative organs",
//           "VALUE" : 2.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0102",
//           "CATEGORY" : "Foreign economic aid",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0103",
//           "CATEGORY" : "General services",
//           "VALUE" : 1.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0104",
//           "CATEGORY" : "Basic research",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0105",
//           "CATEGORY" : "R&D General public services",
//           "VALUE" : 0
//         },
//         {
//           "CATEGORY_CODE" : "GF0106",
//           "CATEGORY" : "General public services n.e.c.",
//           "VALUE" : 0
//         },
//         {
//           "CATEGORY_CODE" : "GF0107",
//           "CATEGORY" : "Public debt transactions",
//           "VALUE" : 2.6
//         },
//         {
//           "CATEGORY_CODE" : "GF0108",
//           "CATEGORY" : "Transfers of a general character between different levels of government",
//           "VALUE" : 0.1
//         }

//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF02",
//       "CATEGORY" : "Defence",
//       "VALUE" : 0.6,
//       "children" : [
//         {
//           "CATEGORY_CODE" : "GF0201",
//           "CATEGORY" : "Military defence",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0202",
//           "CATEGORY" : "Civil defence",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0203",
//           "CATEGORY" : "Foreign military aid",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0204",
//           "CATEGORY" : "R&D Defence",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0205",
//           "CATEGORY" : "Defence n.e.c.",
//           "VALUE" : 0.1
//         }

//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF03",
//       "CATEGORY" : "Public order and safety",
//       "VALUE" : 1.4,
//       "children" : [
//         {
//           "CATEGORY_CODE" : "GF0301",
//           "CATEGORY" : "Police services",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0302",
//           "CATEGORY" : "Fire-protection services",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0303",
//           "CATEGORY" : "Law courts",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0304",
//           "CATEGORY" : "Prisons",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0305",
//           "CATEGORY" : "R&D Public order and safety",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0306",
//           "CATEGORY" : "Public order and safety n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF04",
//       "CATEGORY" : "Economic affairs",
//       "VALUE" : 6.2,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0401",
//           "CATEGORY" : "General economic, commercial and labour affairs",
//           "VALUE" : 1.9
//         },
//         {
//           "CATEGORY_CODE" : "GF0402",
//           "CATEGORY" : "Agriculture, forestry, fishing and hunting",
//           "VALUE" : 0.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0403",
//           "CATEGORY" : "Fuel and energy",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0404",
//           "CATEGORY" : "Mining, manufacturing and construction",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0405",
//           "CATEGORY" : "Transport",
//           "VALUE" : 2.9
//         },
//         {
//           "CATEGORY_CODE" : "GF0406",
//           "CATEGORY" : "Communication",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0407",
//           "CATEGORY" : "Other industries",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0408",
//           "CATEGORY" : "R&D Economic affairs",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0408",
//           "CATEGORY" : "Economic affairs n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF05",
//       "CATEGORY" : "Environment protection",
//       "VALUE" : 0.4,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0501",
//           "CATEGORY" : "Waste management",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0502",
//           "CATEGORY" : "Waste water management",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0503",
//           "CATEGORY" : "Pollution abatement",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF05",
//           "CATEGORY" : "Protection of biodiversity and landscape",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0505",
//           "CATEGORY" : "R&D Environmental protection",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0506",
//           "CATEGORY" : "Environmental protection n.e.c.",
//           "VALUE" : 0.1
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF06",
//       "CATEGORY" : "Housing and community amenities",
//       "VALUE" : 0.4,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0601",
//           "CATEGORY" : "Housing developmentt",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0602",
//           "CATEGORY" : "Community development",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0603",
//           "CATEGORY" : "Water supply",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF05",
//           "CATEGORY" : "Street lighting",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0605",
//           "CATEGORY" : "R&D Housing and community amenities",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0606",
//           "CATEGORY" : "Housing and community amenities n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF07",
//       "CATEGORY" : "Health",
//       "VALUE" : 8.0,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0701",
//           "CATEGORY" : "Medical products, appliances and equipment",
//           "VALUE" : 1.1
//         },
//         {
//           "CATEGORY_CODE" : "GF0702",
//           "CATEGORY" : "Outpatient services",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0703",
//           "CATEGORY" : "Hospital services",
//           "VALUE" : 4.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0704",
//           "CATEGORY" : "Public health services",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0705",
//           "CATEGORY" : "R&D Health",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0706",
//           "CATEGORY" : "Health n.e.c.",
//           "VALUE" : 0.3
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF08",
//       "CATEGORY" : "Recreation, culture and religion",
//       "VALUE" : 1.2,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0801",
//           "CATEGORY" : "Recreational and sporting services",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0802",
//           "CATEGORY" : "Cultural services",
//           "VALUE" : 0.5
//         },
//         {
//           "CATEGORY_CODE" : "GF0803",
//           "CATEGORY" : "Broadcasting and publishing services",
//           "VALUE" : 0.3
//         },
//         {
//           "CATEGORY_CODE" : "GF0804",
//           "CATEGORY" : "Religious and other community services",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0805",
//           "CATEGORY" : "R&D Recreation, culture and religion",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0806",
//           "CATEGORY" : "Recreation, culture and religion n.e.c.",
//           "VALUE" : 0.0
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF09",
//       "CATEGORY" : "Education",
//       "VALUE" : 5.0,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF0901",
//           "CATEGORY" : "Pre-primary and primary education",
//           "VALUE" : 1.4
//         },
//         {
//           "CATEGORY_CODE" : "GF0902",
//           "CATEGORY" : "Secondary education",
//           "VALUE" : 2.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0903",
//           "CATEGORY" : "Post-secondary non-tertiary education",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0904",
//           "CATEGORY" : "Tertiary education",
//           "VALUE" : 0.8
//         },
//         {
//           "CATEGORY_CODE" : "GF0905",
//           "CATEGORY" : "Education not definable by level",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0906",
//           "CATEGORY" : "Subsidiary services to education",
//           "VALUE" : 0.2
//         },
//         {
//           "CATEGORY_CODE" : "GF0907",
//           "CATEGORY" : "R&D Education",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF0908",
//           "CATEGORY" : "Education n.e.c.",
//           "VALUE" : 0.1
//         }
//       ]
//     },
//     {
//       "CATEGORY_CODE" : "GF10",
//       "CATEGORY" : "Social protection",
//       "VALUE" : 21.7,
//       "children" : [

//         {
//           "CATEGORY_CODE" : "GF1001",
//           "CATEGORY" : "Sickness and disability",
//           "VALUE" : 1.9
//         },
//         {
//           "CATEGORY_CODE" : "GF1002",
//           "CATEGORY" : "Old age",
//           "VALUE" : 13.1
//         },
//         {
//           "CATEGORY_CODE" : "GF1003",
//           "CATEGORY" : "Survivors",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF1004",
//           "CATEGORY" : "Family and children",
//           "VALUE" : 2.3
//         },
//         {
//           "CATEGORY_CODE" : "GF1005",
//           "CATEGORY" : "Unemployment",
//           "VALUE" : 1.5
//         },
//         {
//           "CATEGORY_CODE" : "GF1006",
//           "CATEGORY" : "Housing",
//           "VALUE" : 0.1
//         },
//         {
//           "CATEGORY_CODE" : "GF1007",
//           "CATEGORY" : "Social exclusion n.e.c.",
//           "VALUE" : 1.0
//         },
//         {
//           "CATEGORY_CODE" : "GF1008",
//           "CATEGORY" : "R&D Social protection",
//           "VALUE" : 0.0
//         },
//         {
//           "CATEGORY_CODE" : "GF1009",
//           "CATEGORY" : "Social protection n.e.c.",
//           "VALUE" : 0.2
//         }
//       ]
//     }
//   ],
//   "CATEGORY" : "Austria",
//   "VALUE" : 57.7
// };

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#tree_graph").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 210});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? 25 : 20;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "start" : "start";
      })
      .text(function(d) { return d.data.CATEGORY; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', function(d) { return d.data.VALUE; })
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .style("stroke-width", function (d) {return (d.data.VALUE)*2})
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x }`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
};
