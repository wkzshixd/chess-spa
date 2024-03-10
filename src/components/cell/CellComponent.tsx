import React, { FC } from 'react'
import { Cell } from '../../models/Cell'

interface CellProps {
  cell: Cell
  selected: boolean
  click: (cell: Cell) => void
}

export const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div 
    className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
    onClick={() => click(cell)}
    style={{backgroundColor: cell.available && cell.figure ? "green" : ''}} // FIXME:
    >
      {cell.available && !cell.figure && <div className={"available"}></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt=''></img>}
    </div>
  )
}
