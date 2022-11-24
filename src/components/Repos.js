import React from 'react';
import styled from 'styled-components';
import { GithubContext, useGlobalContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {

   
  const {repos} = useGlobalContext();
  let languages = repos.reduce((total,item)=>{
    const {language,stargazers_count} = item;
    if(!language) return total;
    if(!total[language]){
      total[language] = {label:language,value:1,stars : stargazers_count};
    }
    else
    {
      total[language] = {...total[language],value:total[language].value +1,stars:total[language].stars+stargazers_count};
    }
    return total
  },{})
 languages = Object.values(languages).sort((a,b)=>{
  return b.value - a.value;
 }).slice(0,5);
  const charData = {
    "chart": {
      "caption": "Languages",
      "decimals": 0,
      "theme": "fusion"
    },
    data : languages
  }
// doughnut data
const mostPupular = Object.values(languages).sort(((a,b)=>{
  return b.stars - a.stars
})).map((item)=>{
  return {...item,value:item.stars}
}).slice(0,5);
  const doughnut2d = {
    "chart": {
      "caption": "Stars per languages",
      "decimals": 0,
      "doughnutRadiud" : '45%',
      "showPercentValues" : 0,
      "theme": 'candy'
    },
    data : mostPupular
  }
  //stars,forks
  let {stars,forks} = repos.reduce((total,item)=>{
    const {stargazers_count,name,forks} = item;
    total.stars[stargazers_count] = {label:name,value:stargazers_count}

    total.forks[forks] = {label:name,value:forks}
    return total
  },{
    stars:{},forks:{}
  }) 
stars = Object.values(stars).slice(-5).reverse();
  const column3d = {
    "chart": {
      "caption": "Most Popular",
      "yAxisName":"stars",
      "xAxisName":"Repos",
      "xAxisNamefontSize":"16px",
      "yAxisNamefontSize":"16px",

    },
    data : stars
  }
  forks = Object.values(forks).slice(-5).reverse();

  const bar3d = {
    "chart": {
      "caption": "Most Forked",
      "yAxisName":"Forks",
      "xAxisName":"Repos",
      "xAxisNamefontSize":"16px",
      "yAxisNamefontSize":"16px",

    },
    data : forks
  }



   return <section className='section'>
    <Wrapper className="section-center">
        <Pie3D data={charData}/>
        <Column3D data={column3d}/>
        <Doughnut2D  data={doughnut2d} />
        <Bar3D  data={bar3d} />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
