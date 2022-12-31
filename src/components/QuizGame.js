import "./QuizGame.css";
import Question from "./Question";
import { useEffect, useState } from "react";
import arrayShuffle from "array-shuffle";
import { nanoid } from "nanoid";

export default function QuizGame() {
  const [answers, setAnswers] = useState([]);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((res) => {
        const answers = res.results.map((data) => {
          const { question, correct_answer } = data;
          return {
            text: question,
            correctAnswer: correct_answer,
            id: nanoid(),
            options: arrayShuffle([
              ...data.incorrect_answers,
              data.correct_answer,
            ]),
            answer: null,
          };
        });
        setAnswers(answers);
        setGameState({ end: false, score: 0 });
      });
  }

  function setAnswer(id, answer) {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((prevAnswer) => {
        return prevAnswer.id === id
          ? { ...prevAnswer, answer: answer }
          : prevAnswer;
      });
    });
  }

  function checkAnswers() {
    const score = answers.reduce((score, answer) => {
      return answer.answer === answer.correctAnswer ? score + 1 : score;
    }, 0);

    setGameState({
      end: true,
      score: score,
    });
  }

  const questionElements = answers.map((data) => {
    return (
      <Question
        key={data.id}
        text={data.text}
        options={data.options}
        answer={data.answer}
        setAnswer={(answer) => setAnswer(data.id, answer)}
        correctAnswer={data.correctAnswer}
        gameOver={gameState.end}
      />
    );
  });

  return (
    <section className="QuizGame">
      <div className="questions">{questionElements}</div>
      <div>
        {gameState.end ? (
          <>
            <span className="score">
              You scored {gameState.score}/{answers.length} correct answers
            </span>
            <button onClick={newGame}>Play again</button>
          </>
        ) : (
          <button onClick={checkAnswers}>Check answers</button>
        )}
      </div>
    </section>
  );
}
