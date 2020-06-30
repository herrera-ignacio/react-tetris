import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
	const latestCallback = useRef()
	
	useEffect(() => {
		latestCallback.current = callback
	}, [callback])

	// set up interal
	useEffect(() => {
		function tick() {
			latestCallback.current()
		}

		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
