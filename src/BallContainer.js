import React, { useRef, useState } from 'react';

export default function BallContainer({ balls, handleClick }) {


    function makeBall(ballNumber) {
        const path = "/img/" + (ballNumber + 1) + ".png"
        return (
            <div className="item" key={ballNumber} onClick={() => handleClick(ballNumber)}>
                <img src={path} width="100" height="100" />

            </div>)
    }//{ballNumber + 1}
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