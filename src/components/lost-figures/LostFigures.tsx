import React, { FC } from 'react'
import { Figure } from '../../models/figures/Figure'

interface LostFiguresProps {
    title: string
    figures: Figure[]
}

export const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className='lost-figures'>
        <h3>{title}</h3>
        {figures.map(figure => 
            <div key={figure.id}>
                {figure.logo && <img width={20} height={20} src={figure.logo} alt=''></img>}
            </div>
        )}
    </div>
  )
}   
