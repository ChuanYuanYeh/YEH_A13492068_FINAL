var myConfig = {
    type : 'radar',
    plot : {
      aspect : 'area'
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
        'vertical-align': 'top'
    }
};

function doMain() {
    zingchart.render({ 
        id : 'radar', 
        data : myConfig
    });  
}

document.onload = doMain();
