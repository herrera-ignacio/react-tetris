import React from 'react'
import Stage from '../stage/Stage'
import Display from '../display/Display'
import StartButton from '../start-button/StartButton'
import { StyledTetrisWrapper, StyledTetris } from './StyledTetris';
import { createStage } from '../../game-helpers/constants'

const Tetris = () => {
	return (
		<StyledTetrisWrapper>
			<StyledTetris>
				<Stage stage={createStage()} />
				<aside>
					<div>
						<Display text="Score" />
						<Display text="Rows" />
						<Display text="Level" />
					</div>
					<StartButton />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	)
}

export default Tetris;
