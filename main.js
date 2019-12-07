var donutSeries = {
  keys: ['Free Throws', '2 Pointers', '3 Pointers'],
  data: [
    [205., 342., 176., 353., 348., 214., 316., 245., 378., 324., 279.,
      215., 237., 231., 193.,  97., 140., 105.],
    [273., 429., 229., 470., 426., 301., 397., 299., 431., 412., 340.,
      259., 300., 319., 312., 120., 153., 124.],
    [117., 134.,  74., 172., 202., 229., 201., 148., 209., 269., 165.,
      180., 199., 145., 168., 106., 139., 116.]
  ]
};

var radarConfig = {
    type : 'radar',
    plot : {
      aspect : 'area'
    },
    scaleV : {
      values: '0:20:1'
    },
    scaleK : {
      labels : ['Points','Assists','Rebounds','Steals', 'Blocks'],
      aspect: 'circle',
      item: {
        fontFamily: 'Times',
        fontSize: 22
      }
    },
    series : [
      {
        values : [19.3, 3.5, 4.2, 1.1, 0.2],
        text: 'Ray Allen'
      },
      {
        values : [6.9, 1.7, 2.0, 0.6, 0.2],
        text: 'All Shooting Guards'
      }
    ],
    legend: {
        align: 'center',
        'vertical-align': 'bottom',
        item: {
          fontFamily: 'Times',
          fontSize: 18
        },
        backgroundColor: 'lightgray'
    },
    title: {
      text: 'Not Your Average Shooting Guard',
      fontFamily: 'Times',
      fontSize: 30
    },
    subtitle: {
      text: 'A comparison between Ray Allen\'s career averages per game and all other shooting guards',
      fontFamily: 'Times',
      fontSize: 18
    },
    backgroundColor: 'lightgray',
    plotArea: {
      position: 'center'
    }
};

var lineConfig = {
  type: 'line',
  title: {
    text: 'His Shooting Accuracy Over the Years',
    fontFamily: 'Times',
    fontSize: 30
  },
  'crosshair-x': {
    shared: true
  },
  'scale-x': {
    label: {
      text: 'Year',
      fontFamily: 'Times',
      fontSize: 18
    },
    labels: ['1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
    '2011','2012','2013','2014'],
    item: {
      fontFamily: 'Times',
      fontSize: 12
    }
  },
  series: [
    {
      text: 'Free Throw %',
      values: [0.823, 0.875, 0.903, 0.887, 0.888, 0.873, 0.916, 0.904, 0.883,
        0.903, 0.903, 0.907, 0.952, 0.913, 0.881, 0.915, 0.886, 0.905]
    },
    {
      text: '2 Point %',
      values: [0.448, 0.453, 0.492, 0.468, 0.506, 0.485, 0.478, 0.468, 0.459,
        0.486, 0.479, 0.485, 0.542, 0.556, 0.52 , 0.463, 0.48 , 0.53 ]
    },
    {
      text: '3 Point %',
      values: [0.393, 0.364, 0.356, 0.423, 0.433, 0.434, 0.377, 0.392, 0.376,
        0.412, 0.372, 0.398, 0.409, 0.363, 0.444, 0.453, 0.419, 0.375]
    }
  ],
  backgroundColor: 'lightgray',
  scaleY: {
    label: {
      text: 'Accuracy (%)',
      fontFamily: 'Times',
      fontSize: 18
    }
  }
};

var donutConfig = {
  type: 'ring',
  title: {
    text: 'His Total Points Per Year Breakdown',
    fontFamily: 'Times',
    fontSize: 30
  },
  legend: {
    backgroundColor: 'lightgray',
    x: '0%',
    y: '7%',
    item: {
      fontFamily: 'Times',
      fontSize: 18
    }
  },
  series: [],
  backgroundColor: 'lightgray'
};

var scatterConfig = {
  type: 'scatter',
  title: {
    text: 'Three Point Percentage Per Season for Qualified* Players',
    fontFamily: 'Times',
    fontSize: 30
  },
  source: {
    text: '* To qualify for three-point field goal percentage (3P%), at least 82 three-pointers must be made that season.',
    fontFamily: 'Times',
    fontSize: 14
  },
  series: [],
  plot: {
    tooltip: {
      text: '%t %vt/%kt',
      x: '10%',
      y: '7%',
      fontFamily: 'Times',
      fontSize: 16
    }
  },
  gui: {
    watermark: {
      position: 'bl'
    }
  },
  backgroundColor: 'lightgray',
  scaleX: {
    minValue: 0,
    maxValue: 900,
    step: 100,
    label: {
      text: 'Three Pointers Attempted',
      fontFamily: 'Times',
      fontSize: 18
    }
  },
  scaleY: {
    minValue: 0,
    maxValue: 450,
    step: 50,
    label: {
      text: 'Three Pointers Made',
      fontFamily: 'Times',
      fontSize: 16
    }
  }
};

function renderDonut(nodeID) {
  var pieDataSet = donutSeries['keys'].map(function(elm, idx) {
    return {
      text: elm,
      values: [donutSeries['data'][idx][nodeID]]
    }
  });
  zingchart.exec('donut', 'setseriesdata', {
    data: pieDataSet
  });
};

// Utility function to fetch any file from the server
function fetchJSONFile(filePath, callbackFunc) {
  console.debug("Fetching file:", filePath);
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200 || httpRequest.status === 0) {
              console.info("Loaded file:", filePath);
              var data = JSON.parse(httpRequest.responseText);
              console.debug("Data parsed into valid JSON!");
              console.debug(data);
              if (callbackFunc) callbackFunc(data);
          } else {
              console.error("Error while fetching file", filePath, 
                  "with error:", httpRequest.statusText);
          }
      }
  };
  httpRequest.open('GET', filePath);
  httpRequest.send();
};

function renderScatter(data) {
  var array = data['data'];
  var series = [];
  var scatterData = array.map(function(elm, idx) {
    var pt = [[elm[2], elm[3]]];
    if (elm[0] + ' (' + elm[1] + ')' != 'Ray Allen (2006)') {
      return {
        text: elm[0] + ' (' + elm[1] + ')',
        values: pt,
        marker: {
          backgroundColor: 'black'
        }
      }
    } else {
      return {
        text: elm[0] + ' (' + elm[1] + ')',
        values: pt,
        marker: {
          backgroundColor: 'green',
          type: 'star5',
          size: 7
        },
        'value-box': {
          text: '%t',
          placement: 'right',
          fontFamily: 'Times',
          fontSize: 16
        }
      }
    }
  });
  zingchart.exec('scatter', 'setseriesdata', {
    data: scatterData
  });
};

function onMouseoverNode(e) {
  renderDonut(e['nodeindex']);
};

function doMain() {
  fetchJSONFile('data/scatterData.json', renderScatter);
  zingchart.render({
    id: 'scatter',
    data: scatterConfig
  });
  zingchart.render({ 
    id : 'radar', 
    data : radarConfig
  });
  
  zingchart.render({
    id: 'line',
    data: lineConfig
  });

  zingchart.render({
    id: 'donut',
    data: donutConfig
  });

zingchart.bind('line', 'node_mouseover', onMouseoverNode);

renderDonut(0);
}

document.onload = doMain();
