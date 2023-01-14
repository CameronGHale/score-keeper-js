export default class player {
    constructor(name, balls) {
        this.name = name;
        this.score = 0;
        this.balls = balls;
    }

    addBall(ballNumber) {
        this.balls.add(ballNumber)
        this.score++
    }
    removeBall(ballNumber) {
        if (this.balls.delete(ballNumber)) { this.score-- }
    }
    resetBalls() {
        this.balls = new Set;
    }
    sortBalls() {
        const tempRack = Array.from(this.setOfBalls).sort();
        this.setOfBalls = new Set(tempRack)
    }
}

export function moveBall(from, to, ball) {
    from.removeBall(ball - 1)
    to.addBall(ball - 1)
}