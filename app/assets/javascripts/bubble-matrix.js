if (document.getElementById("chartContainer")) {
var svg = dimple.newSvg("#chartContainer", 700, 700);

    var myChart = new dimple.chart(svg, data );
    myChart.setBounds(130, 25, 550, 550)
    myChart.addCategoryAxis("x", "country");
    myChart.addCategoryAxis("y", "category");
    var z = myChart.addMeasureAxis("z", "value");
    // var s = myChart.addSeries("Euros");
    var c = myChart.addSeries("category", dimple.plot.bubble);
    // s.aggregate = dimple.aggregateMethod.max;
    // z.overrideMax = 100;
    // myChart.addLegend(240, 10, 330, 20, "right");
    myChart.ease = "bounce";
    // myChart.noFormats = true;
    myChart.defaultColors = [
        new dimple.color("#bdbdbd", "#bdbdbd", 1)
    ];
    myChart.draw();
  }
