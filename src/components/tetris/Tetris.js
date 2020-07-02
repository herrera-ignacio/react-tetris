import React, { useState } from 'react'

// Components
import Stage from '../stage/Stage'
import Display from '../display/Display'
import StartButton from '../start-button/StartButton'
import { StyledTetrisWrapper, StyledTetris } from './StyledTetris'

// Helpers
import { usePlayer } from '../../hooks/usePlayer'
import { useStage } from '../../hooks/useStage'
import { createStage, checkCollision } from '../../game-helpers/constants'


const Tetris = (props) => {
	const [dropTime, setDropTime] = useState(null)
	const [gameOver, setGameOver] = useState(false)

	const [player, updatePlayerPos, resetPlayer] = usePlayer()
	const [stage, setStage] = useStage(player, resetPlayer)

	const movePlayer = dir => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) {
			updatePlayerPos({ x: dir, y: 0 })
		}
	}

	console.log('re-render')
	
	const startGame = () => {
		setStage(createStage())
		resetPlayer()
		setGameOver(false)
	}

	const drop = () => {
		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false })
		} else {
			// Game Over
			if (player.pos.y < 1) {
				console.log('Game Over!')
				setGameOver(true)
				setDropTime(null)
			}
			updatePlayerPos({ x: 0, y: 0, collided: true })
		}
	}

	const dropPlayer = () => {
		drop()
	}	

	const move = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 37) {
				movePlayer(-1)
			} else if (keyCode === 39) {
				movePlayer(1)
			} else if (keyCode === 40) {
				dropPlayer()
			}
		}
	}

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
				{
					gameOver ? (
						<Display gameOver={gameOver} text="Game Over" />
					) : (
						<div>
							<Display text="Score" />
							<Display text="Rows" />
							<Display text="Level" />
						</div>
					)
				}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	)
}

export default Tetris;
