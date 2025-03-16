import { useState } from "react";
import axios from 'axios'

const BASE_URL_PROD = 'https://aiproject-vsdh.onrender.com';
const BASE_URL_DEV = 'http://localhost:10000';

// todo fix logic (environment ?)
const BASE_URL = BASE_URL_DEV;

// todo egen fil
const api = axios.create({
  baseURL: BASE_URL,
  //headers: {'Content-Type': 'application/json'}
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



const useChatBot = () => {
  const [loading, setLoading] = useState(true);

  const ask = async (question, thread) => {
    try {
      setLoading(true);
      const payload = JSON.stringify({ message: question, thread_id: thread });

      const answer = await api.post("/chat", payload);

      // let answer = await api({
      //   url: "/chat",
      //   data: payload,
      //   method: "POST",
      //   // transformRequest: [function (data, headers) {
      //   //   // Do whatever you want to transform the data
      
      //   //   console.log(data, headers)
      //   //   return data;
      //   // }],
      //   // transformResponse: [function (data) {
      //   //   // Do whatever you want to transform the data
      
      //   //   console.log('response', data)
      //   //   return data;
      //   // }],
      // });

      console.log(answer);

      setLoading(false);
      return answer;
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  return {
    ask,
    loading
  };
}

export default useChatBot