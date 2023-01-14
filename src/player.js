export default class Player {
    constructor(name = "", isRack = false) {
        this.name = name;
        this.isRack = isRack;
        this.score = 0;
        this.balls = new Set();
        this.resetBalls();

    }

    addBall(ballNumber) {
        this.balls.add(ballNumber)
        this.score++
    }
    removeBall(ballNumber) {
        if (this.balls.delete(ballNumber)) { this.score-- }
    }
    resetBalls() {
        this.balls = new Set();
        if (this.isRack) {
            this.balls = new Set([...Array(9).keys()])
        }
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