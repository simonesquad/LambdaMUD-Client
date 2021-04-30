// this could be the menu at the bottom that compartmentalizes the say and move controls
// say could generate a popup window with an input form and cancel/enter buttons
// move can be a list at the bottom of key presses which will move the player in certain directions each

import React from 'react';
import axios from 'axios';

function Controls() {

    const submitSay = () => {

        axios 
        .post('https://simonegameapp.herokuapp.com/api/say', formValues)
        .then(res => {
            dispatch(toggleMain())
            //might not need this here
            history.push('/room')
        })
        .catch(err => {
            dispatch(setErrors(err))
        })
    }

    const submitMove = () => {

        axios 
        .post('https://simonegameapp.herokuapp.com/api/move', formValues)
        .then(res => {
            dispatch(toggleMain())
            //might not need this here
            history.push('/room')
        })
        .catch(err => {
            dispatch(setErrors(err))
        })
    }

    return (
        <div className="controls__bar">
            <div className="say">
            <button onClick={submitSay}>Say Something</button>
            </div>
            <div className="move">
            <button onClick={submitMove}>Move</button>
            </div>
        </div>
    )
}

export default Controls
