import { useState } from 'react'

import useChatBot from './useChatBot'

import { Play } from "lucide-react";
import './App.css'

function App() {
  const cb = useChatBot();
  const [inputValue, setInputValue] = useState("");
  const [qaList, setQaList] = useState([])

  const callChatBot = async () => {
    if (!inputValue || inputValue.length === 0){
      return;
    }

    const answer = await cb.ask(inputValue, 'default');
    addQA(inputValue, answer);
    clearInput();
  }

  const handleKeyDown = (e) => {
    console.log(e);
    if (e.key === "Enter"){
      callChatBot();
    }
  }

  const addQA = (question, answer) => {
    const newQaList = qaList;
    newQaList.unshift({question, answer})
    setQaList(newQaList)
  }

  const clearInput = () => {
    setInputValue("");
  }

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>

      </p> */}
      <p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type something..."
          //className="w-full p-2 border rounded-md"
        />
        <button onClick={() => callChatBot()}>
          <Play />
        </button>
      </p>
      <p>

      </p>
    </>
  )
}

export default App
