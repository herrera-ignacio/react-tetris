import { useState, useCallback } from 'react'
import { STAGE_WIDTH, checkCollision } from '../game-helpers/constants'
import { randomTetromino, TETROMINOS } from '../game-helpers/tetrominos'

export const usePlayer = () => {
	const [player, setPlayer] = useState({
		pos: { x: 0, y: 0 },
		tetromino: TETROMINOS[0].shape,
		collided: false,
	})

	const rotate = (matrix, dir) => {
		// transpose
		const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]))
		// reverse each row
		if (dir > 0) return rotatedTetro.map(row => row.reverse())
		return rotatedTetro.reverse()
	}

	const playerRotate = (stage, dir) => {
		// rotate tetromino
		const clonedPlayer = JSON.parse(JSON.stringify(player))
		clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

		// handle collisions on rotation
		const posX = clonedPlayer.pos.x
		let offset = 1
		// If there's no collision at all, continue and setPlayer
		// While there's collision, move player position using horizontal offset
		while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
			// if we can avoid collision by moving with offset, setPlayer with new pos
			clonedPlayer.pos.x += offset
			// 1. offset = 1, check 1 to right from start
			// 2. offset = -2, check 1 to left from start
			// 3. offset = 3, check 2 to right from start
			offset = -(offset + (offset > 0 ? 1 : - 1))
			// if horizontal offset is higher than tetromino horizontal length
			// transpose tetromino in place
			if (offset > clonedPlayer.tetromino[0].length) {
				rotate(clonedPlayer.tetromino, -dir)
				clonedPlayer.pos.x = posX
				return
			}
		}

		setPlayer(clonedPlayer)
	}

	const updatePlayerPos = ({ x, y, collided }) => {
		setPlayer(prev => ({
			...prev,
			pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
			collided
		}))
	}

	const resetPlayer = useCallback(() => {
		setPlayer({
			pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
			tetromino: randomTetromino().shape,
			collided: false
		})
	}, [])


	return [player, updatePlayerPos, resetPlayer, playerRotate]
}