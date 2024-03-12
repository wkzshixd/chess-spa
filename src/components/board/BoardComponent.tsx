import React, { FC, useEffect, useState } from 'react'
import { Board } from '../../models/Board'
import { CellComponent } from '../cell/CellComponent';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';


interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

export const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      swapPlayer()
      setSelectedCell(null)
    } else {
      if(cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
    }
  }

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopy()
    setBoard(newBoard)
  }

  return (
    <div>
      <h3>{currentPlayer?.color} to move</h3>
      <div className='board'>
        {board.cells.map((row, index) => 
          <React.Fragment key={index}>
            {row.map(cell => 
            <CellComponent 
              cell={cell}
              click={click}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              key={cell.id}
            />)}
        </React.Fragment>
        )}
      </div>
    </div>
  )
}
