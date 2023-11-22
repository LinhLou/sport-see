import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import PageProfilStyles from '../Styles/pageProfil.styled';
import mockAPI from '../App/mockAPI';
import CallsAPI from '../App/callsAPI';
import { getData } from '../App/getData';
import { formaterDay } from '../App/formaterData';
import Card from '../Components/Card';
import Barchart from '../Components/Barchart';
import LineChart from '../Components/LineChart';
import SpiderChart from '../Components/SpiderChart';



export default function Profil() {
  const { id } = useParams();
  const { userData } = useLoaderData();

  return (
    <PageProfilStyles>
      <div id="header">
        <h1>Bonjour <span>{userData.firstName}</span></h1>
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
              <SpiderChart />
            </div>
            <div>
              Radia Bar Chart
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
  // const res = new CallsAPI('http://localhost:4000/user/',id);
  // const generalInfos = await res.getUserById();
  // const activity = await res.getUserActivityById();
  // const sessions = await res.getUserAverageSession();
  // const performances = await res.getUserPerformance();

  const userData  = await getData(id);

  // const generalInfos = await mockAPI[id].getUserById();
  // const activity = await mockAPI[id].getUserActivityById();
  // const sessions = await mockAPI[id].getUserAverageSession();
  // const performances = await mockAPI[id].getUserPerformance();
  // { generalInfos, activity, sessions, performances }

  return {userData} 
}
