import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import PageProfilStyles from '../Styles/pageProfil.styled';
import { getData } from '../App/getData';
import Card from '../Components/Card';
import Barchart from '../Components/Barchart';
import LineChart from '../Components/LineChart';
import SpiderChart from '../Components/SpiderChart';
import RadarBarChart from '../Components/RadarBarChart';



export default function Profil() {
  const { id } = useParams();
  const { userData } = useLoaderData();

  return (
    <PageProfilStyles>
      <div id="header">
        <h1>Bonjour <span>{userData.name}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
      </div>
      <div id="container">
        <section id="charts">
          <div id="barchart" >
            <Barchart days ={userData.dates} poids ={userData.poids} calories={userData.calories} />
          </div>
          <div id="otherChats">
            <div>
              <LineChart days={userData.sessionDate} durations={userData.sessionLength} />
            </div>
            <div>
              <SpiderChart performance={ userData.performance }/>
            </div>
            <div>
              <RadarBarChart score={userData.score}/>
            </div>
          </div>
        </section>
        <div id="cards">
          {
            userData.infosKey.map((item, index)=>{
              const unit = Object.values(userData.units[index])[0];
              const kind = Object.keys(userData.units[index])[0];
              return(
                <Card key={index} quantity={`${item}${unit}`} category={kind} >
                </Card>
              )
            })

          }
        </div>
      </div>
    </PageProfilStyles>
  )
}

export const  userInfosLoader = async({params})=>{
  const { id } = params;
  const userData  = await getData(id);
  return { userData } 
}
