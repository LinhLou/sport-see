import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import PageProfilStyles from '../Styles/pageProfil.styled';
import mockAPI from '../App/mockAPI';
import GetUserData from '../App/getData';
import Card from '../Components/Card';



export default function Profil() {
  const { id } = useParams();
  const { generalInfos, activity, sessions, performances } = useLoaderData();
  const keyData = Object.values(generalInfos['data'].keyData);
  const category = ['Calories','Proteines','Glucides','Lipides'];
  const unites = ['kCal','g','g','g'];

  return (
    <PageProfilStyles>
      <div id="header">
        <h1>Bonjour <span>{generalInfos['data'].userInfos.firstName}</span></h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
      </div>
      {/* <h2>{activity['data'].sessions[0].day}</h2>
      <h3>{sessions['data'].sessions[0].day}</h3>
      <h3>{performances['data'].kind["1"]}</h3> */}
      <div id="container">
        <section id="charts">
          <div id="barchart">
            hello
          </div>
          <div>

          </div>
        </section>
        <div id="cards">
          {
            keyData.map((item, index)=>{
              return(
                <Card key={category[index]} quantity={`${item}${unites[index]}`} category={category[index]} >
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
  // const res = new GetUserData('http://localhost:4000/user/',id);
  // const generalInfos = await res.getUserById();
  // const activity = await res.getUserActivityById();
  // const sessions = await res.getUserAverageSession();
  // const performances = await res.getUserPerformance();
  const generalInfos = await mockAPI[id].getUserById();
  const activity = await mockAPI[id].getUserActivityById();
  const sessions = await mockAPI[id].getUserAverageSession();
  const performances = await mockAPI[id].getUserPerformance();

  return { generalInfos, activity, sessions, performances }
}
