export default function BallImageTable({ balls, handleClick }) {


    function makeBall(ballNumber) {
        //for local testing add "/" before img and change img src to img src={process.env.PUBLIC_URL + path}
        const path = "img/" + (ballNumber + 1) + ".png"
        return (
            <div className="item" key={ballNumber} onClick={() => handleClick(ballNumber)}>
                <img src={path} alt={ballNumber + 1} className="item" />

            </div>)
    }
    function makeRack() {
        const divArray = []
        for (let ballNumber of balls) {
            divArray.push(makeBall(ballNumber));
        }
        return divArray
    }

    return (
        <>
            <div className="flex-container">
                {makeRack()}
            </div>
        </>
    );
}