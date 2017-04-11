if (document.getElementById("chartContainer")) {
var svg = dimple.newSvg("#chartContainer", 750, 750);
console.log(data)


    var myChart = new dimple.chart(svg, data );
    myChart.setBounds(130, 25, 650, 650)
    myChart.addCategoryAxis("x", "country");
    myChart.addCategoryAxis("y", "category");
    var z = myChart.addMeasureAxis("z", "value");
    // var s = myChart.addSeries("Euros");
    var c = myChart.addSeries("category", dimple.plot.bubble);
    // s.aggregate = dimple.aggregateMethod.max;
    // z.overrideMax = 100;
    // myChart.addLegend(240, 10, 330, 20, "right");
    myChart.ease = "bounce";
    myChart.defaultColors = [
        new dimple.color("#263e5c", "#263e5c", 1),
        new dimple.color("#3d6099", "#3d6099", 1),
        new dimple.color("#4895b5", "#4895b5", 1),
        new dimple.color("#54b4d3", "#54b4d3", 1),
        new dimple.color("#00e7ff", "#00e7ff", 1),
        new dimple.color("#3ef8ca", "#3ef8ca", 1),
        new dimple.color("#ff7540", "#ff7540", 1),
        new dimple.color("#f45b3d", "#f45b3d", 1),
        new dimple.color("#cc2c14", "#cc2c14", 1),
        new dimple.color("#ae1511", "#ae1511", 1)
    ];
    myChart.draw();
  }
