import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponents = ({data}) =>{
  const chartConfigs = {
    type: 'column3d',
    width: 400,
    height: 400,
    dataFormat: 'json',
    dataSource: data,
  };

  return <ReactFC {...chartConfigs} />;
}

export default ChartComponents;

