const dates = {1:'L', 2:'M',3:'M',4:'J','5':'V',6:'S',7:'D'}
export const formaterDay = (day) => {
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
  }else{
    console.log(dates[day])
  }
}
