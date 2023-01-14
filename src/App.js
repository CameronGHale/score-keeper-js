import React, { useRef, useState } from 'react';
import BallImageTable from "./BallImageTable";
import player from "./player";

function App() {
  const [rackBalls, setRackBalls] = useState(new Set([...Array(9).keys()]))
  const [innings, setInnings] = useState(0)
  const [player1State, setPlayer1State] = useState({
    balls: new Set(),
    score: 0,
  })


  const [player2State, setPlayer2State] = useState({
    balls: new Set(),
    score: 0,
  })
  const [deadBallState, setDeadBallState] = useState({
    balls: new Set(),
    score: 0,
  })
  const [selectedPlayer, setSelectedPlayer] = useState(0)



  function changeCounter(num) {
    setInnings(innings + num)
  }



  function moveBall(ballNumber, currentSet, destinationSet) {
    const tempCurrentSet = new Set(currentSet)
    const tempDestinationSet = new Set(destinationSet)
    tempCurrentSet.delete(ballNumber)
    tempDestinationSet.add(ballNumber)
    return [tempCurrentSet, tempDestinationSet]
  }

  function resetBalls() {
    const fullRack = new Set([...Array(9).keys()])
    const emptyRack = new Set()
    setPlayer1State({ balls: emptyRack, score: player1State.score })
    setPlayer2State({ balls: emptyRack, score: player2State.score })
    setDeadBallState({ balls: emptyRack, score: deadBallState.score })
    setRackBalls(fullRack)
  }

  function sortRack(unsortedRack) {
    const tempRack = Array.from(unsortedRack).sort();
    const tempSet = new Set(tempRack)
    setRackBalls(tempSet)

  }

  return <>
    <div style={{
      backgroundColor: '#2d2d30',
      borderRadius: 4,
      color: '#eee',
      minHeight: 1500,
      minWidth: 1500,
      padding: 12,
      width: 300,
      fontSize: 30,
    }}>

      <div style={{
        borderRadius: 4,
        color: '#eee',
        minHeight: 50,
        minWidth: 575,
        padding: 12,
        width: 300,
      }}>
        Innings
        <button style={{ width: 75, height: 75, background: '#8f8f8f', fontSize: 20 }} onClick={() => changeCounter(-1)}>-</button>
        {innings}
        <button style={{ width: 75, height: 75, background: '#8f8f8f', fontSize: 20 }} onClick={() => changeCounter(1)}>+</button>
      </div>
      <div style={{
        borderRadius: 4,
        color: '#eee',
        minHeight: 200,
        minWidth: 575,
        padding: 12,
        width: 300,

      }}>
        <button style={{ width: 200, height: 60, background: '#9e821b', fontSize: 20 }} onClick={() => { setSelectedPlayer(0); changeCounter(1) }}>Player 1</button>
        {"   "}
        {player1State.score}

        <BallImageTable balls={player1State.balls} handleClick={(ballNumber) => {
          let point = 1
          if (ballNumber === 8) {
            point = 2
          }
          const [newPlayer1Balls, newRackBalls] = moveBall(ballNumber, player1State.balls, rackBalls);
          setPlayer1State({ balls: newPlayer1Balls, score: player1State.score - point });
          sortRack(newRackBalls);
        }}
        />
      </div>


      <div style={{
        borderRadius: 4,
        color: '#eee',
        minHeight: 200,
        minWidth: 575,
        padding: 12,
        width: 300,
      }}>
        <button style={{ width: 200, height: 60, background: '#214175', fontSize: 20 }} onClick={() => setSelectedPlayer(1)}>Player 2</button>
        {"   "}
        {player2State.score}

        <BallImageTable balls={player2State.balls} handleClick={(ballNumber) => {
          let point = 1
          if (ballNumber === 8) {
            point = 2
          }
          const [newPlayer2Balls, newRackBalls] = moveBall(ballNumber, player2State.balls, rackBalls);
          sortRack(newRackBalls);
          setPlayer2State({ balls: newPlayer2Balls, score: player2State.score - point });
        }}
        />
      </div>
      <div style={{
        borderRadius: 4,
        color: '#eee',
        minHeight: 200,
        minWidth: 575,
        padding: 12,
        width: 300,
      }}>
        <button style={{ width: 200, height: 60, background: '#8f8f8f', fontSize: 20 }} onClick={() => setSelectedPlayer(3)}>Dead Balls</button>
        {"   "}
        {deadBallState.score}

        <BallImageTable balls={deadBallState.balls} handleClick={(ballNumber) => {
          let point = 1
          if (ballNumber === 8) {
            point = 2
          }
          const [newDeadBallState, newRackBalls] = moveBall(ballNumber, deadBallState.balls, rackBalls);
          sortRack(newRackBalls);
          setDeadBallState({ balls: newDeadBallState, score: deadBallState.score - point })
        }}
        />
      </div>


      <div style={{
        borderRadius: 4,
        color: '#eee',
        minHeight: 200,
        minWidth: 600,
        padding: 0,
        width: 300,
      }}>
        Balls on Table
        <BallImageTable balls={rackBalls} handleClick={(ballNumber) => {
          let point = 1
          if (ballNumber === 8) {
            point = 2
          }
          const [selectedState, setSelectedState] = selectedPlayer === 0 ? [player1State, setPlayer1State] : (selectedPlayer === 1 ? [player2State, setPlayer2State] : [deadBallState, setDeadBallState])
          const [newRackBalls, newSelectedBalls] = moveBall(ballNumber, rackBalls, selectedState.balls);
          sortRack(newRackBalls);
          setSelectedState({ balls: newSelectedBalls, score: selectedState.score + point });
        }}
        />
      </div>

      <button style={{ width: 600, height: 100, background: '#8f8f8f', fontSize: 20 }} onClick={() => resetBalls()}>Next Rack</button>
    </div>
  </>


}

export default App;
