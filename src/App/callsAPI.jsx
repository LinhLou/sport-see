class CallsAPI {
  constructor(baseURL,Id){
    this.baseURL = baseURL;
    this.Id = Id;
  }
 
  async getUserById () {
    const res = await fetch(`${this.baseURL}${this.Id}`);
    const { data } = await res.json();
    return data;
  }

  async getUserActivityById (){
    const res = await fetch(`${this.baseURL}${this.Id}/activity`);
    const { data } = await res.json();
    return data;
  }

  async getUserAverageSession(){
    const res = await fetch(`${this.baseURL}${this.Id}/average-sessions`);
    const { data } = await res.json();
    return data;
  }

  async getUserPerformance(){
    const res = await fetch(`${this.baseURL}${this.Id}/performance`);
    const { data } = await res.json();
    return data;
  }
}

export default CallsAPI;