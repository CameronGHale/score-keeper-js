import player, { moveBall } from "../player";
import App from "../App"

const player1 = new player("player1", new Set())
const rack = new player("rack", new Set([...Array(9).keys()]))
test('NewPlayer_Creation', () => {
    expect(player1.name).toEqual("player1")
    expect(player1.balls.size).toEqual(0)
});

test('NewRack_Creation', () => {
    expect(rack.name).toEqual("rack")
    expect(rack.balls.size).toEqual(9)
})

test('Increase_PlayerScore', () => {
    expect(player1.score).toEqual(0)
    player1.addBall(1)
    expect(player1.score).toEqual(1)
})

test('RemoveBallToDecrease_PlayerScore', () => {
    expect(player1.score).toEqual(1)
    player1.removeBall(1)
    console.log(player1.score)
    expect(player1.score).toEqual(0)
})

test('RemoveNonExistingBallFrom_Player', () => {
    player1.removeBall(1)
    expect(player1.score).toEqual(0)
})

test('GetBallsFrom_Rack', () => {
    expect(rack.balls).toEqual(new Set([...Array(9).keys()]))
})

test('MoveBallsFromRackTo_Player', () => {
    let ball = 8
    moveBall(rack, player1, ball)
    expect(rack.balls).toEqual(new Set([0, 1, 2, 3, 4, 5, 6, 8]))
})

test('ReRackPlayerAndRackBalls', () => {
    player1.resetBalls
    rack.resetBalls
    expect(rack.balls).toEqual(new Set([...Array(9).keys()]))
    expect(player1.balls).toEqual(new Set)
})

