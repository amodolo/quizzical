import "./Question.css";
import { nanoid } from "nanoid";
import parse from "html-react-parser";

export default function Question({
  text,
  options,
  answer,
  setAnswer,
  correctAnswer,
  gameOver,
}) {
  function handleChange(event) {
    setAnswer(event.target.value);
  }

  function isChecked(option) {
    return option === answer;
  }

  const optionElements = options.map((option) => {
    const answerId = nanoid();
    return (
      <div key={answerId}>
        <input
          id={answerId}
          name={text}
          type="radio"
          value={option}
          onChange={handleChange}
          checked={isChecked(option)}
          disabled={gameOver}
        />
        <label
          className={`answer ${
            gameOver && option === correctAnswer ? "correct" : ""
          }`}
          htmlFor={answerId}
        >
          {parse(option)}
        </label>
      </div>
    );
  });

  return (
    <div className={`Question ${gameOver ? "gameOver" : ""}`}>
      <h3>{parse(text)}</h3>
      <div className="answers">{optionElements}</div>
      <hr />
    </div>
  );
}
