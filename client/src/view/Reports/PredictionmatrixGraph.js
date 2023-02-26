import React, { useState, useEffect } from "react"; 
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';  
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';

export default function PredictionmatrixGraph(props) {

    // High Charts Codes Starts from here
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);

const getOptions = (type) => ({
  chart: {
    type,
    width: 725,
    height: 500,
    color: 'red'
  },
  title: {
    text: '',
  },
  // xAxis: {
  //   gridLineWidth: 1, 
  // }
  xAxis: {
    gridLineWidth: 1, 
    categories: ["0","1", "2", "3", "4", "5"], 
    labels: {
        enabled: true
    },
    min: 0,
    max: 5, 
},
  yAxis: { 
    title: {
        text: 'Quality'
    }, 
    categories: ["0","1", "2", "3", "4", "5"], 
    labels: {
        enabled: true
    },
    min: 0,
    max: 5, 
},
  

exporting: {
  enabled: false
},

  tooltip: {
    formatter: function() { 
        //console.log("this ==== ", this)
        //return 'My Goal 2 <br/><br/> <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name;
        return this.percentage+'<br/><br/><br/><span class="Quality-rating">Tactics '+this.x+'/'+this.y+'</span> <br/><br/><div class="Quality-tittle"> Quality </div>' + this.x + 
        '<br/><br/><div class="quality_speed"> Speed  </div>' + this.y ;
        //return  htmlRender();
    }
  },
  // series: [
  //   {
  //     data: [[0, 2, 20,'a'], [1, 2, 20,'b',], [2, 1, 20,'c'], [3, 4, 20,'d'], [4, 3, 20,'e'], [5, 2, 20,'f']],
  //   } 
  // ], 
  plotOptions: {
    bubble: {
        minSize: 1,
        maxSize: 50
    }
},
  series: [{
    // data: [ 
    //   {x:0,y:2,z:150,color:"red",percentage:"My Goal 1"},
    //   {x:1,y:2,z:150,color:"green",percentage:"My Goal 2"},
    //   {x:2,y:1,z:150,color:"yellow",percentage:"My Goal 3"},
    //   {x:3,y:4,z:150,color:"blue",percentage:"My Goal 4"},
    //   {x:4,y:3,z:150,color:"orange",percentage:"My Goal 5"},
    //   {x:5,y:2,z:150,color:"pink",percentage:"My Goal 6"},
    // ],
    name:"Speed", 
    data: props.data,
}],
  credits: {
    enabled: false,
  },  
});

 
const htmlRender = (e) => {
   return <>
   <div>aaaaaaaaaaaaaa</div>
   </>;
}
// Ending here


    return (
        <HighchartsReact highcharts={Highcharts} options={getOptions('bubble')} /> 
    )
}