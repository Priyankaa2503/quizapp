import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Game } from "./components";

const API_URL = "https://opentdb.com/api.php?amount=10";
function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setshowAnswers] = useState(false);
  

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
        const questions= data.results.map((question)=>
        ({
          ...question,
          answers:[
            question.correct_answer,
            ...question.incorrect_answers
          ].sort(()=>Math.random()-0.5),
          
        }))
        setQuestions(questions);
      });
  }, []);
  const handleAnswer = (answer) => {
    if(!showAnswers){
    
    if(answer === questions[currentIndex].correct_answer){
      setScore(score+1);
    }
  }
      setshowAnswers(true);

    
    
  };
  const handleNextQuestion=()=>{
    setshowAnswers(false);
    setCurrentIndex(currentIndex + 1);
  }

  return questions.length > 0 ? (
    <div className='container'>
      {currentIndex>= questions.length?(
    <h1 className='text-3xl text-white font-bold'>
      Game Ended! Your score was : {score}!</h1>
  ) : (
  <Game data={questions[currentIndex]} 
  showAnswers={showAnswers}
  handleNextQuestion={handleNextQuestion}
  handleAnswer={handleAnswer}
         />
  )}
      
    </div> 
  ) : (
    <h2 className='text-2xl text-white font-bold'>Loading...</h2>
  );
}

export default App;
