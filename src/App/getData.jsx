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
  //------------------get data from API ------------------
  // const res = new CallsAPI('http://localhost:4000/user/',id);

  // const {userInfos, score, todayScore, keyData } = await res.getUserById();
  // const { sessions } = await res.getUserActivityById();
  // const result = await res.getUserAverageSession();
  // const { kind, data } = await res.getUserPerformance();
  // const averageSessions = result.sessions;

  // --------------get data from mock API---------------------
  const result1 = await mockAPI[id].getUserById();
  const result2 = await mockAPI[id].getUserActivityById();
  const result3 = await mockAPI[id].getUserAverageSession();
  const result4 = await mockAPI[id].getUserPerformance();

  const { userInfos, score, todayScore, keyData } = result1["data"];
  const { sessions } = result2["data"];
  const averageSessions = result3["data"].sessions;
  const { kind, data } = result4["data"];

  // ------------------------------------------------------------

  const userData = {
    name:userInfos.firstName,
    lastName:userInfos.lastName,
    age:userInfos.age,
    score:(()=> score ? score:todayScore)() ,
    infosKey: Object.values(keyData),
    units: [{'Calories':'kCal'},{'Proteines':'g'},{'Glucides':'g'},{'Lipides':'g'}], 
    dates : sessions.map(ele=>formaterDay(ele.day)),
    poids: sessions.map(ele=>(ele.kilogram)),
    calories: sessions.map(ele=>(ele.calories)),
    sessionDate: averageSessions.map(ele=>ele.day),
    sessionLength: averageSessions.map(ele=>ele.sessionLength),
    performance : data.reduce((acc,ele)=>{
      const obj = {};
      const key = kind[ele.kind.toString()];
      obj[key] = ele.value;
      acc = [...acc,obj];
      return acc
    },[])

  }
  return userData
  
}