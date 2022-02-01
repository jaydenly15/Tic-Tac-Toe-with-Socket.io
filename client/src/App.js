import './App.css';
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'

const socket = io("https://lylyrockpaperscissors.herokuapp.com/");

const PlayScreen = ({clickedWeapon}) => {
  return (
    <div className="App">
      <div className="images-container">
        <img id="paper" src="./imgs/paper.jpg" onClick={clickedWeapon}></img>
        <img id="rock" src="./imgs/rock.jpg" onClick={clickedWeapon}></img>
        <img id="scissors" src="./imgs/scissors.jpg" onClick={clickedWeapon}></img>
      </div>
    </div>
  )
}

const AnnounceWinner = ({winner}) => {
  let announcement = `The winner is ${winner}`;
  if (winner == "draw") {
    announcement = 'Draw!';
  }

  return (
    <div className="App">
      <h1>{announcement}</h1>
    </div>
  )
}

function App() {
  const [winner, setWinner] = useState(null);
  const [weapon, setWeapon] = useState(null);

  socket.on('receive-winner', (winner) => {
    setWinner(winner);
  })

  const clickedWeapon = (event) => {
    const image = event.currentTarget;
    setWeapon(image.id);
    console.log(image.id);
    socket.emit('clickedWeapon', image.id);
  }
  

  return winner == null ? <PlayScreen clickedWeapon={clickedWeapon} /> : <AnnounceWinner winner={winner}/>
}

export default App;
