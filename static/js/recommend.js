am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv5", am4plugins_wordCloud.WordCloud);
    var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    
    series.accuracy = 4;
    series.step = 15;
    series.rotationThreshold = 0.7;
    series.maxCount = 200;
    series.minWordLength = 2;
    series.labels.template.margin(6,6,6,6);
    series.maxFontSize = am4core.percent(30);
    
    series.text = "stockData Symbol BA Company, Boeing Co, Headquarters Chicago IL LMT Lockheed Martin Bethesda MD NOC Northrop Grumman,  VA RTX Raytheon Technologies Waltham MA GD 'General Dynamics' Reston VA HON Honeywell Charlotte NC Stocks. Aerospace/Defense Market. DIJA. Planes."; 
    // 'Falls Church',
    series.colors = new am4core.ColorSet();
    series.colors.passOptions = {}; // makes it loop
    
    //series.labelsContainer.rotation = 45;
    series.angles = [0,-90];
    series.fontWeight = "700"
    
    setInterval(function () {
      series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
     }, 10000)
    
    }); // end am4core.ready()