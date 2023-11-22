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
  // const divBarChart = useRef();
  const { generalInfos, activity, sessions, performances } = useLoaderData();
  const { userData } = useLoaderData();
  console.log(userData)
  // console.log(generalInfos)
  // generals informations
  // const keyData = Object.values(generalInfos['data'].keyData);
  // const category = ['Calories','Proteines','Glucides','Lipides'];
  // const unites = ['kCal','g','g','g'];
  // weight and daily bruned calories 
  // const activityQuotidien = activity['data'].sessions.reduce((acc,ele)=>{
  //   acc = [...acc, {day:formaterDay(ele.day), poid:ele.kilogram, calories:ele.calories}]
  //   return acc;
  // },[])
  // sessions duration
  // const sessionDuration = sessions['data'].sessions.reduce((acc, ele)=>{
  //   acc = [...acc, {day:ele.day, duration:ele.sessionLength}];
  //   return acc;
  // },[])
  // performances
  // const performancesInfos = 

  // console.log(sessionDuration)
  return (
    <PageProfilStyles>
      <div id="header">
        <h1>Bonjour <span>{userData.firstName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
      </div>
      {/* <h2>{activity['data'].sessions[0].day}</h2>
      <h3>{sessions['data'].sessions[0].day}</h3>
      <h3>{performances['data'].kind["1"]}</h3> */}
      <div id="container">
        <section id="charts">
          <div id="barchart" >
            <Barchart days ={userData.dates} poids ={userData.poids} calories={userData.calories} />
          </div>
          <div id="otherChats">
            {/* <div>
              <LineChart data = {sessionDuration}/>
            </div>
            <div>
              <SpiderChart />
            </div> */}
            <div>
              Radia Bar Chart
            </div>
          </div>
        </section>
        <div id="cards">
          {
            // keyData.map((item, index)=>{
            //   return(
            //     <Card key={category[index]} quantity={`${item}${unites[index]}`} category={category[index]} >
            //     </Card>
            //   )
            // })

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
