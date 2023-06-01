import React, { useState } from 'react'
import "./CricketComponent.css";

let ballsLeft = 15, wicketsLeft = 10;

function CricketComponent() {
    const [score, setScore] = useState(0);
    const [ball, setBall] = useState(0);
    const [wicket, setWicket] = useState(0);
    const [extra, setExtra] = useState(0);
    const [history, setLastBall] = useState([]);

    function addHistory(data) {
        let prevBall = history.at(-1);
        let index = 1;
        if (prevBall){
            let { id } = prevBall;
            index = id+1;
        } 
        setLastBall((prev) => [
            ...prev,
            {
                id: index,
                className: data.className,
                val: data.val
            }
        ]);
    }

    function addScore(num){
        if (wicket < 10  && ballsLeft > 0){
            addHistory(
                {
                    className: "runs",
                    val: num,
                }
            );
            setScore(score + num);
            setBall(ball + 1);
            ballsLeft -= 1;
        }
        
    }

    function addExtra(){
        if (wicket < 10  && ballsLeft > 0){
            addHistory(
                {
                    className: "extraRuns",
                    val: "+1",
                }
            );
            setScore(score + 1);
            setExtra(extra + 1);    
        }
    }

    function addWicket(){
        if (wicket < 10  && ballsLeft > 0){
            addHistory(
                {
                    className: "wicket",
                    val: "W",
                }
            );
            setWicket(wicket + 1);
            setBall(ball + 1);
            ballsLeft -= 1;
            wicketsLeft-= 1;
        }  
    }

    function reset() {
        setScore(0);
        setBall(0);
        setExtra(0);
        setWicket(0);
        setLastBall([]);
        ballsLeft = 15;
        wicketsLeft = 10;
    }

    return (
        <div className='container'>
            <div className='cricket-box'>
                <h1>Score Board</h1>
                <div className='history'>
                    {history.map((data)=>(
                        <span key={data.id} className={data.className}>{data.val}</span>
                    ))}
                </div>
                <h2 className='score'>{score}</h2>
                <button onClick={() => addScore(0)}>0</button>
                <button onClick={() => addScore(1)}>1</button> 
                <button onClick={() => addScore(2)}>2</button> 
                <button onClick={() => addScore(3)}>3</button> 
                <button onClick={() => addScore(4)}>4</button> 
                <button onClick={() => addScore(5)}>5</button> 
                <button onClick={() => addScore(6)}>6</button>
                <button onClick={addExtra}>WB</button>
                <button onClick={addExtra}>NB</button> 
                <button onClick={addWicket}>Wicket</button> 
                <h2>
                    Ball count: {ball} / 15
                </h2>
                <h2>
                    Wickets fallen: {wicket} / 10
                </h2>
                <h2>
                    Extras: {extra}
                </h2>

                {(ballsLeft === 0 || wicketsLeft === 0) && <h2 className='final-score'>Your Score is {score} <button onClick={reset}>Reset</button></h2>}
            </div>
        </div>
  )
}

export default CricketComponent