import React from 'react';
import Cell from './Cell';

function Square({row,col}) {
    const cells = Array(3).fill(Array(3).fill(null))
  return (
    <div className="box flex flex-col gap-1 w-full h-full">
        {cells.map((cell,i)=>(
              <div key = {i}className="flex gap-1 w-full h-full items-center justify-center">
                {cell.map((_,k)=>(
                    <Cell key = {k}row = {row*3+i} col = {col*3+k}/>
                ))}  
              </div>
        ))}
    
       
    </div>
  );
}

export default Square;
