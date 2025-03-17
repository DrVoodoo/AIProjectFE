import { useState } from "react";
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const useChatBot = () => {
  const [loading, setLoading] = useState(true);

  const welcomeMessage = async () => {
    try {
      setLoading(true);
      const answer = await api.get("/");

      setLoading(false);
      console.log(answer);
      return answer.data.message;
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
    }
  };

  const ask = async (question, thread) => {
    try {
      setLoading(true);
      const payload = JSON.stringify({ message: question, thread_id: thread });

      const answer = await api.post("/chat", payload);

      setLoading(false);
      return answer.data.response;
    } catch (error) {
      setLoading(false);
      console.log("Error: ", error);
      return "error, something went wrong";
    }
  };

  return {
    welcomeMessage,
    ask,
    loading
  };
}

export default useChatBot