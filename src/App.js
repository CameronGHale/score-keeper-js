import React, { useState } from 'react';
import BallImageTable from "./BallImageTable";

function App() {
  const [rackBalls, setRackBalls] = useState(new Set([...Array(9).keys()]))
  const [innings, setInnings] = useState(0)
  const [selectedPlayer, setSelectedPlayer] = useState(0)
  const [playerArray, setPlayerArray] = useState(initAllPlayers(3))

  function nextRack() {
    setRackBalls(new Set([...Array(9).keys()]))
    setPlayerArray(playerArray.map((player) => ({ ...player, balls: new Set() })))
    setInnings(0)
  }
  function moveBallToPlayer(id, ballNumber) {
    let point = calulateBallPoints(ballNumber)
    for (let i = 0; i < playerArray.length; i++) {

      if (id === playerArray[i].id) {
        let player = playerArray[i]
        const [newRackBalls, newSelectedBalls] = moveBall(ballNumber, rackBalls, player.balls);
        sortRack(newRackBalls);
        playerArray[i] = ({ balls: newSelectedBalls, score: player.score + point, id: player.id, name: player.name });
      }
    }
  }

  function returnBallToRack(player, ballNumber) {
    let point = calulateBallPoints(ballNumber)
    for (let i = 0; i < playerArray.length; i++) {
      if (player.id === playerArray[i].id) {
        const [newPlayerBalls, newRackBalls] = moveBall(ballNumber, player.balls, rackBalls);
        playerArray[i] = ({ balls: newPlayerBalls, score: player.score - point, id: player.id, name: player.name });
        sortRack(newRackBalls);
      }
    }
  }

  function createPlayer(player, number) {
    return {
      name: player,
      balls: new Set(),
      score: 0,
      id: number,
    }
  }

  function initAllPlayers(numberOfPlayers) {
    let tempArray = []
    for (let i = 1; i < numberOfPlayers; i++) {
      tempArray.push(createPlayer("player" + i, i))
    }
    tempArray.push(createPlayer("deadBalls", -1))
    return tempArray
  }

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

  function createPlayerBlock(player, styleName) {
    return <React.Fragment key={styleName}>
      <div className={styleName}>
        <button className={`${styleName}Button`} onClick={() => { setSelectedPlayerThenHandleInnings(player.id) }}>
          {`${styleName}`}
        </button>
        {"   "}
        {player.score}
        <BallImageTable balls={player.balls} handleClick={(ballNumber) => {
          returnBallToRack(player, ballNumber)
        }}
        />
      </div>
    </React.Fragment>
  }

  function setSelectedPlayerThenHandleInnings(id) {
    setSelectedPlayer(id);
    console.log(id)
    if (id === 1) { changeCounter(1) }
  }

  function setPage() {
    let playerBlocks;
    for (let player of playerArray) {
      playerBlocks += <div>{createPlayerBlock(player, player.name)}</div>
    }
    return playerBlocks;
  }

  return <>
    <div className="background">
      <div className="innings">
        Innings
        <button className="counterButton" onClick={() => changeCounter(-1)}>-</button>
        {innings}
        <button className="counterButton" onClick={() => changeCounter(1)}>+</button>
      </div>
      <div >{playerArray.map((player) => createPlayerBlock(player, player.name))}</div>
      <div className="rackBalls">
        Balls on Table
        <BallImageTable balls={rackBalls} handleClick={(ballNumber) => {
          moveBallToPlayer(selectedPlayer, ballNumber)
        }}
        />
      </div>
      <button style={{ width: 600, height: 100, background: '#8f8f8f', fontSize: 20 }} onClick={() => nextRack()}>Next Rack</button>
    </div>
  </>


}

export default App;
