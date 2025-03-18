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
  const [loading, setLoading] = useState(false);

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
    welcomeMessage: 'Sök på livsmedelsverkets data från 2024-12-05. Livsmedel visas per 100 gram',
    ask,
    loading
  };
}

export default useChatBot