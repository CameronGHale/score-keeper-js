import Player, { moveBall } from "../Player";
import App from "../App"

const player1 = new Player("player1")
const rack = new Player("rack", true)
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

test('ReRack_PlayerAndRackBalls', () => {
    player1.resetBalls()
    rack.resetBalls()
    expect(rack.balls).toEqual(new Set([...Array(9).keys()]))
    expect(player1.balls).toEqual(new Set)
})

test('PlayerisNot_Rack', () => {
    expect(player1.isRack).toEqual(false)
})

test('AddAndSubtractBallsFromRack', () => {
    let tempPlayer = new Player("temp")
    moveBall(rack, tempPlayer, 8)
    moveBall(rack, tempPlayer, 7)
    moveBall(rack, tempPlayer, 2)
    moveBall(rack, tempPlayer, 5)
    expect(tempPlayer.balls).toEqual(new Set([1, 4, 6, 7]))
    moveBall(tempPlayer, rack, 7)
    moveBall(tempPlayer, rack, 2)
    expect(tempPlayer.balls).toEqual(new Set([4, 7]))

})

