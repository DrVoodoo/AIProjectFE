import { useState } from "react";
import axios from 'axios'


// todo egen fil
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
      //{"response":"Arrived, you have, young one.","thread_id":"default"}

      setLoading(false);
      return answer.response;
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
      return "error, something went wrong";
    }
  };

  return {
    ask,
    loading
  };
}

export default useChatBot