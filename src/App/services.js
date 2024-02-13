import CallsAPI from "./callsAPI";
import mockAPI from "./mockAPI";

export const resource=(service,id)=>{
  switch(service){
    case "API":
      return new CallsAPI('http://localhost:4000/user/',id);
    case "mock":
      return mockAPI[id];
  }
}