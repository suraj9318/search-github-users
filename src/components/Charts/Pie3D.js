import React, { Component } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponents = ({data}) =>{

  const chartConfigs = {
    type: 'pie3d',
    width: '100%',
    height: 400,
    dataFormat: 'json',
    dataSource: data,
  };

  return <ReactFC {...chartConfigs} />;
}

export default ChartComponents;

