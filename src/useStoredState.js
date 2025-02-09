import { useState } from 'react'

function mergeInitialState (storedState, initialState) {
    const storedStateIsSafe = typeof storedState === 'object';
    const initialStateIsSafe = typeof initialState === 'object';
  if (storedStateIsSafe && initialStateIsSafe && Array.isArray(storedState) === Array.isArray(initialState)) {  
    return [
      ...initialState,
      ...storedState
    ];
  } else if(storedStateIsSafe && initialStateIsSafe) {
    return {
      ...initialState,
      ...storedState
    };

  }

  return storedState
}

export default function useStoredState (stateName, initialState) {
  const storedState = localStorage.getItem(stateName)
  const pageStateString = storedState
    ? storedState
    : JSON.stringify(initialState)
  const pageState = mergeInitialState(JSON.parse(pageStateString), initialState)
  const [state, setState] = useState(pageState)

  function setStoredState (newState) {
    localStorage.setItem(stateName, JSON.stringify(newState))
    setState(newState)
  }

  return [state, setStoredState]
}