
const jsonOrThrowIfError = async (response) => {
  if (!response.ok) {
    throw new Error((await response.json())); 
  }
  return await response.json();
};


class CallsAPI {
  constructor(baseURL,Id){
    this.baseURL = baseURL;
    this.Id = Id;
  }
 
  async getUserById () {
      return jsonOrThrowIfError(await fetch(`${this.baseURL}${this.Id}`));
  }

  async getUserActivityById (){
    return jsonOrThrowIfError(await fetch(`${this.baseURL}${this.Id}/activity`));
  }

  async getUserAverageSession(){
    return jsonOrThrowIfError(await fetch(`${this.baseURL}${this.Id}/average-sessions`));
  }

  async getUserPerformance(){
    return jsonOrThrowIfError(await fetch(`${this.baseURL}${this.Id}/performance`));
  }
}

export default CallsAPI;