import React, { useState } from 'react';
import BallImageTable from "./BallImageTable";

function App() {
  const [rackBalls, setRackBalls] = useState(new Set([...Array(9).keys()]))
  const [innings, setInnings] = useState(0)
  const [player1State, setPlayer1State] = useState({
    balls: new Set(),
    score: 0,
    assignment: 0,
  })
  const [player2State, setPlayer2State] = useState({
    balls: new Set(),
    score: 0,
    assignment: 1,
  })
  const [deadBallState, setDeadBallState] = useState({
    balls: new Set(),
    score: 0,
    assignment: 2,
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
    setInnings(0)
    setPlayer1State({ balls: emptyRack, score: player1State.score, assignment: player1State.assignment })
    setPlayer2State({ balls: emptyRack, score: player2State.score, assignment: player2State.assignment })
    setDeadBallState({ balls: emptyRack, score: deadBallState.score, assignment: deadBallState.assignment })
    setRackBalls(fullRack)
  }



  function sortRack(unsortedRack) {
    const tempRack = Array.from(unsortedRack).sort();
    const tempSet = new Set(tempRack)
    setRackBalls(tempSet)

  }
  function calulateBallPoints(ballNumber) {
    let point = 1
    if (ballNumber === 8) {
      point = 2
    }
    return point
  }

  function returnBallToRack([playerState, setPlayerState], ballNumber) {
    let point = calulateBallPoints(ballNumber)
    const [newPlayerBalls, newRackBalls] = moveBall(ballNumber, playerState.balls, rackBalls);
    setPlayerState({ balls: newPlayerBalls, score: playerState.score - point, assignment: playerState.assignment });
    sortRack(newRackBalls);
  }

  function createPlayerBlock([playerState, setPlayerState], styleName) {
    return <>
      <div className={styleName}>
        <button className={`${styleName}Button`} onClick={() => { setSelectedPlayerThenHandleInnings(playerState) }}>
          {`${styleName}`}
        </button>
        {"   "}
        {playerState.score}
        <BallImageTable balls={playerState.balls} handleClick={(ballNumber) => {
          returnBallToRack([playerState, setPlayerState], ballNumber)
        }}
        />
      </div>
    </>
  }
  function setSelectedPlayerThenHandleInnings(playerState) {
    setSelectedPlayer(playerState.assignment);
    if (playerState.assignment === 0) { changeCounter(1) }
  }

  return <>
    <div className="background">

      <div className="innings">
        Innings
        <button className="counterButton" onClick={() => changeCounter(-1)}>-</button>
        {innings}
        <button className="counterButton" onClick={() => changeCounter(1)}>+</button>
      </div>

      <div>{createPlayerBlock([player1State, setPlayer1State], "player1")}</div>
      <div>{createPlayerBlock([player2State, setPlayer2State], "player2")}</div>
      <div>{createPlayerBlock([deadBallState, setDeadBallState], "deadBalls")}</div>

      <div className="rackBalls">
        Balls on Table
        <BallImageTable balls={rackBalls} handleClick={(ballNumber) => {
          let point = calulateBallPoints(ballNumber)
          const [selectedState, setSelectedState] = selectedPlayer === 0 ? [player1State, setPlayer1State] : (selectedPlayer === 1 ? [player2State, setPlayer2State] : [deadBallState, setDeadBallState])
          const [newRackBalls, newSelectedBalls] = moveBall(ballNumber, rackBalls, selectedState.balls);
          sortRack(newRackBalls);
          setSelectedState({ balls: newSelectedBalls, score: selectedState.score + point, assignment: selectedPlayer });
        }}
        />
      </div>

      <button style={{ width: 600, height: 100, background: '#8f8f8f', fontSize: 20 }} onClick={() => resetBalls()}>Next Rack</button>
    </div>
  </>


}

export default App;
