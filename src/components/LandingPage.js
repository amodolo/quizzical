import "./LandingPage.css";

export default function LandingPage({ startQuiz }) {
  return (
    <section className="LandingPage">
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <button onClick={startQuiz}>Start quiz</button>
    </section>
  );
}
