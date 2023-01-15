import React, { useState } from 'react';
import BallImageTable from "./BallImageTable";

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

  function returnBallToRack([playerState, setPlayerState], ballNumber) {
    let point = 1
    if (ballNumber === 8) {
      point = 2
    }
    const [newPlayerBalls, newRackBalls] = moveBall(ballNumber, playerState.balls, rackBalls);
    setPlayerState({ balls: newPlayerBalls, score: playerState.score - point });
    sortRack(newRackBalls);
  }


  return <>
    <div className="background">

      <div className="innings">
        Innings
        <button className="counterButton" onClick={() => changeCounter(-1)}>-</button>
        {innings}
        <button className="counterButton" onClick={() => changeCounter(1)}>+</button>
      </div>
      <div className="player">
        <button className="player1Button" onClick={() => { setSelectedPlayer(0); changeCounter(1) }}>Player 1</button>
        {"   "}
        {player1State.score}

        <BallImageTable balls={player1State.balls} handleClick={(ballNumber) => {
          returnBallToRack([player1State, setPlayer1State], ballNumber)
        }
        } />
      </div>


      <div className="player">
        <button className="player2Button" onClick={() => setSelectedPlayer(1)}>Player 2</button>
        {"   "}
        {player2State.score}

        <BallImageTable balls={player2State.balls} handleClick={(ballNumber) => {
          returnBallToRack([player2State, setPlayer2State], ballNumber)
        }}
        />
      </div>

      <div className="deadBalls">
        <button className="playerButton3" onClick={() => setSelectedPlayer(3)}>Dead Balls</button>
        {"   "}
        {deadBallState.score}

        <BallImageTable balls={deadBallState.balls} handleClick={(ballNumber) => {
          returnBallToRack([deadBallState, setDeadBallState], ballNumber)
        }}
        />
      </div>


      <div className="rackBalls">
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
