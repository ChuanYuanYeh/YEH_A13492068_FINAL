var donutSeries = {
  keys: ['FT', '2P', '3P'],
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
      aspect: 'circle'
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
        'vertical-align': 'bottom'
    },
    title: {
      text: 'Not Your Average Shooting Guard'
    },
    subtitle: {
      text: 'A comparison between Ray Allen\'s career averages per game and all other shooting guards'
    },
    backgroundColor: 'lightgray'
};

var lineConfig = {
  type: 'line',
  title: {
    text: 'His Shooting Accuracy Over the Years'
  },
  legend: {

  },
  'crosshair-x': {
    shared: true
  },
  'scale-x': {
    label: {
      text: 'Year'
    },
    labels: ['1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
    '2011','2012','2013','2014']
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
  ]
};

var donutConfig = {
  type: 'ring',
  title: {
    text: 'His Total Points Breakdown'
  },
  series: []
};

function renderDonut(nodeID) {
  var pieDataSet = donutSeries['keys'].map(function(elm, idx) {
    return {
      text: elm,
      values: [donutSeries['data'][idx][nodeID]]
    }
  });
  console.log(pieDataSet);
  zingchart.exec('donut', 'setseriesdata', {
    data: pieDataSet
  });
};

function doMain() {
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

    renderDonut(0);
}

document.onload = doMain();
