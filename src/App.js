import "./App.css";
import LandingPage from "./components/LandingPage";
import { useState } from "react";
import QuizGame from "./components/QuizGame";

function App() {
  const [playing, setPlaying] = useState(false);

  function startQuiz() {
    setPlaying(true);
  }

  return (
    <main className="App">
      {!playing ? <LandingPage startQuiz={startQuiz} /> : <QuizGame />}
    </main>
  );
}

export default App;
