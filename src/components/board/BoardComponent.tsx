import React, { FC, useEffect, useState } from 'react'
import { Board } from '../../models/Board'
import { CellComponent } from '../cell/CellComponent';
import { Cell } from '../../models/Cell';


interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void
}

export const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      setSelectedCell(null)
    } else {
      setSelectedCell(cell)
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
  )
}
