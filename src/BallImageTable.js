import React, { useRef, useState } from 'react';

export default function BallImageTable({ balls, handleClick }) {


    function makeBall(ballNumber) {
        const path = "/public/img/" + (ballNumber + 1) + ".png"
        return (
            <div className="item" key={ballNumber} onClick={() => handleClick(ballNumber)}>
                <img src={path} width="100" height="100" />

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