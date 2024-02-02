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

  try {
  //------------------get data from API ------------------

    const res = new CallsAPI('http://localhost:4000/user/',id);

  // // --------------get data from mock API---------------------
  // const res = mockAPI[id];

  // --------------------------------------------------------
    const result1 = await res.getUserById();
    const result2 = await res.getUserActivityById();
    const result3 = await res.getUserAverageSession();
    const result4 = await res.getUserPerformance();

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

  } catch (error) {
    throw new Error("user not found!!!");
  }
  
}