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
  }
}
