import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { FaPaperPlane, FaVolumeUp, FaStop, FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isSpeaking, setIsSpeaking] = useState(false); // New state

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light-mode');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://vocal-ai-eight.vercel.app/getResponse', { question });
      setResponse(res.data.response);
    } catch (err) {
      setError('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const speakHandler = () => {
    if (!response) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.onend = () => setIsSpeaking(false); // Set isSpeaking to false when done
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>

      <div className="box">
        <div className="profile-pic">
          <img className="pic" alt="profile pic" src={require('../src/assets/avatar.png')} />
        </div>
        <p className="label">Question</p>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={submitHandler} disabled={loading}>
          {loading ? 'Sending...' : <><FaPaperPlane /> Send</>}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="box">
        <div className="profile-pic">
          <img className="pic" alt="profile pic" src={require('../src/assets/genai.png')} />
        </div>
        <p className="label">Response</p>
        <textarea value={response} readOnly />
        <div className="button-group">
          <button onClick={speakHandler} disabled={!response}>
            {isSpeaking ? <><FaStop /> Stop</> : <><FaVolumeUp /> Speak</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;