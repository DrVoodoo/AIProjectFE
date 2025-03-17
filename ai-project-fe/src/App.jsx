import { useState, useEffect } from 'react'
import QAList from './QAList'
import useChatBot from './useChatBot'

import { Play, Loader } from "lucide-react";
import './App.css'

function App() {
  const cb = useChatBot();
  const [header, setHeader] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [qaList, setQaList] = useState([])

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      const msg = await cb.welcomeMessage();
      setHeader(msg);
    };
    fetchWelcomeMessage();
  }, []);

  const callChatBot = async () => {
    if (!inputValue || inputValue.length === 0){
      return;
    }

    const answer = await cb.ask(inputValue, 'default');
    console.log('answer', answer)
    addQA(inputValue, answer);
    clearInput();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      callChatBot();
    }
  }

  const addQA = (question, answer) => {
    const newQaList = qaList;
    newQaList.unshift({question, answer})
    console.log('new list', newQaList)
    setQaList(newQaList)
  }

  const clearInput = () => {
    setInputValue("");
  }

  if (!header || header.length === 0) {
    return <></>
  }
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        {header}
      </h1>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
          className="w-100 mr-4 p-2 border-1 rounded-sm"
        />
        <button onClick={() => callChatBot()}>
          {cb.loading ? <Loader className="animate-spin" /> : <Play />}
        </button>
      </div>
      <div className="mt-4">
        <QAList qaList={qaList}/>
      </div>
    </>
  )
}

export default App
