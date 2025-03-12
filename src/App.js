import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log(question)
    axios.post('https://vocal-ai-eight.vercel.app/getResponse',{
      question:question
    })
    .then(res=>{
      console.log(res.data.response)
      setResponse(res.data.response)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const speakHandler = ()=>{
    const a=new SpeechSynthesisUtterance(response)
    window.speechSynthesis.speak(a)
  }

  return (
    <div className="App">
      <div className='box'>

        <div className='profile-pic'>
          <img className='pic' alt='profile pic' src={require('../src/assets/avatar.png')}/>
        </div>
        <p className='label'>Question</p>
        <textarea onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button onClick={submitHandler}>Send</button>

      </div>

      <div className='box'>

        <div className='profile-pic'>
          <img className='pic' alt='profile pic' src={require('../src/assets/genai.png')}/>
        </div>
        <p className='label'>Response</p>
        <textarea value={response}/>
        <button onClick={speakHandler}>Speak</button>

      </div>
    </div>
  );
}

export default App;
