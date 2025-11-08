import React, { useRef } from 'react'
import { useBoard } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {startGame,continueGame} = useBoard();
  const navigate = useNavigate();
  const modeRef = useRef();
  function handleContinue(){
    continueGame();
    navigate("/game")
  }
  function handleStart(){
    console.log(modeRef.current.value);
    startGame(modeRef.current.value);
   
    localStorage.setItem("mode",modeRef.current.value)
    navigate('/game');
  }
  return (
    <>
    <span id='heading' className='text-3xl font-bold'>Sudoko Game</span>
    <div className='flex flex-col items-center justify-center gap-5'>
        <button onClick={handleStart}className='bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90'>Start New</button>
        <button onClick={handleContinue}className='bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90'>Continue</button>
        <div className='flex items-center gap-5'>
            <label htmlFor='mode'>Difficulty:</label>
            <select ref={modeRef}className='bg-slate-900 p-5 rounded-lg' id="mode">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

        </div>
    </div>
    </>
  )
}
