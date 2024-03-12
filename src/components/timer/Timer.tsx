import React, { FC, useEffect, useRef, useState } from 'react'
import { Player } from '../../models/Player'
import { Colors } from '../../models/Colors'

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

export const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {

    const [whiteTime, setWhiteTime] = useState(300)
    const [blackTime, setBlackTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer () {
        if(timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decWhite : decBlack;
        timer.current = setInterval(callback, 1000)
    }

    function decWhite () {
        setWhiteTime(prev => prev - 1)
    }

    function decBlack () {
        setBlackTime(prev => prev - 1)
    }

    function handleRestart() {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }
    
  return (
    <div>
        <button onClick={handleRestart}>
            restart
        </button>
        <h3>white time: {whiteTime}</h3>
        <h3>black time: {blackTime}</h3>
    </div>
  )
}
