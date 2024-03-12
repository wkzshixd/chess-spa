import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './models/Board';
import { BoardComponent } from './components/board/BoardComponent';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFigures } from './components/lost-figures/LostFigures';
import { Timer } from './components/timer/Timer';
const App = () => {

  const [board, setBoard] = useState(new Board())
  const [whitePlayer,] = useState(new Player(Colors.WHITE))
  const [blackPlayer,] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    currentPlayer?.color === whitePlayer.color ? setCurrentPlayer(blackPlayer) : setCurrentPlayer(whitePlayer)
  }

  return (
    <div className="app">
      <Timer 
        currentPlayer={currentPlayer} 
        restart={restart}/>
      <BoardComponent 
        board={board} 
        setBoard={setBoard} 
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures 
          title='black' 
          figures={board.lostBlackFigures}/>
        <LostFigures 
          title='white' 
          figures={board.lostWhiteFigures}/>
      </div>
    </div>
  );
}

export default App;


// TODO: 
// 1. king and castle logic
// 2. styles