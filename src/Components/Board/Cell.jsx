import React from 'react';
import { useBoard } from '../../store/gameStore';


function Cell({row,col}) {
  const {qboard,setSelectedCell,selectedCell,board,isPause,isComplete} = useBoard();

  function handleClick(){
    if(isPause || isComplete) return
    setSelectedCell(row,col)
  }
  function isSelected(){
    const query = {current:false,other:false};
    if(selectedCell.row == null) return query;
    for (const sq of selectedCell.squares) {
      if(sq[0]==row && sq[1]==col) query.other=true;
    }
    if(selectedCell.row==row && selectedCell.col==col) query.current=true;
    if(selectedCell.row==row || selectedCell.col==col) query.other = true;
    if(qboard[row][col].value!=0 && qboard[row][col].value==qboard[selectedCell.row][selectedCell.col].value) query.other = true;
    return query
  }
  return (
    <div
    onClick={handleClick}
      className={`Cell relative select-none flex items-center justify-center cursor-pointer 
        bg-slate-800 w-full h-full rounded-md hover:outline outline-1 text-white ${isSelected().current && "bg-slate-950 outline outline-blue-500"} 
        ${isSelected().other && "bg-slate-900"}`}
    >
      {qboard[row][col].value!=0 && (
        <span className={
        `text-2xl md:text-3xl 
        ${qboard[row][col].default ? "text-gray-400":qboard[row][col].value==board[row][col]?"text-blue-500":"text-red-500"}`}>
          {qboard[row][col].value}
        </span>
        )}
        {qboard[row][col].pencilValue !=0 && !qboard[row][col].default && (
        <span className="text-base md:text-2xl absolute -top-1 right-1 text-green-600">
          {qboard[row][col].pencilValue}
        </span>
        )}
     
    </div>
  );
}

export default Cell;
