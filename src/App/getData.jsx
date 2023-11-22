import CallsAPI from "./callsAPI";
import mockAPI from "./mockAPI";


const formaterDay = (day) => {
  if(!day){
    return;
  }
  if(typeof(day)=="string" && day.includes('-')){
    const date = day.split('-')[2];
    if(Number(date)<10){
      return Number(date[1])
    }else{
      return Number(date)
    }
  }
}


export const getData = async (id) =>{
  // const res = new CallsAPI('http://localhost:4000/user/',id);
  // const {userInfos, score, keyData } = await res.getUserById();
  // const { sessions } = await res.getUserActivityById();
  // const averageSessions = await res.getUserAverageSession();
  // const { kind, data } = await res.getUserPerformance();


  const generalInfos = await mockAPI[id].getUserById();
  const activity = await mockAPI[id].getUserActivityById();
  const averageSession = await mockAPI[id].getUserAverageSession();
  const performances = await mockAPI[id].getUserPerformance();

  const { userInfos, score, keyData } = generalInfos["data"];
  const { sessions } = activity["data"];
  const averageSessions = averageSession["data"].sessions;
  const { kind, data } = performances["data"];

  const performance = data.reduce((acc,ele)=>{
    const obj = {};
    const key = kind[ele.kind.toString()];
    obj[key] = ele.value;
    acc = [...acc,obj];
    return acc
  },[])

  const userData = {
    name:userInfos.firstName,
    lastName:userInfos.lastName,
    age:userInfos.age,
    score:score,
    calorieKey: keyData.calorieCount,
    proteinKey: keyData.proteinCount,
    carbohydrateKey: keyData.carbohydrateCount,
    lipidKey: keyData.lipidCount,
    units: {'Calories':'kCal','Proteines':'g','Glucides':'g','Lipides':'g'}, 
    dates : sessions.map(ele=>formaterDay(ele.day)),
    poids: sessions.map(ele=>(ele.kilogram)),
    calories: sessions.map(ele=>(ele.calories)),
    sessionDate: averageSessions.map(ele=>ele.day),
    sessionLength: averageSessions.map(ele=>ele.sessionLength),
    performanceKind: performance.map(ele=>Object.keys(ele)),
    performanceValue: performance.map(ele=>Object.values(ele))
  }

  return userData
  
}