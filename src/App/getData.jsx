class GetUserData {
  constructor(baseURL,Id){
    this.baseURL = baseURL;
    this.Id = Id;
  }
 
  async getUserById () {
    const res = await fetch(`${this.baseURL}${this.Id}`);
    const userInfos = await res.json();
    return userInfos;
  }

  async getUserActivityById (){
    const res = await fetch(`${this.baseURL}${this.Id}/activity`);
    const userActivity = await res.json();
    return userActivity;
  }

  async getUserAverageSession(){
    const res = await fetch(`${this.baseURL}${this.Id}/average-sessions`);
    const userAverageSession = await res.json();
    return userAverageSession;
  }

  async getUserPerformance(){
    const res = await fetch(`${this.baseURL}${this.Id}/performance`);
    const userPerformance = await res.json();
    return userPerformance;
  }
}

export default GetUserData;