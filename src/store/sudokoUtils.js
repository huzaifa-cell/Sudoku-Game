export const modes ={
    easy: {
        key:"easy",
        name: "Easy",
        value: [15,25],
        mistake: 5,
        hints: 6
    },
    medium: {
        key:"medium",
        name: "Medium",
        value: [25,40],
        mistake: 4,
        hints: 5
    },
    hard: {
        key:"hard",
        name: "Hard",
        value: [40,50],
        mistake: 3,
        hints: 4
    }
}
export function generateRandom(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
}
export function isSafe(board,row,col,num){
     for(let x =0;x<9;x++){
        if(board[row][x]==num || board[x][col]==num){
            return false
        }
     }
     const iRow = Math.floor(row/3)*3
     const iCol = Math.floor(col/3)*3;
     for(let x = iRow;x<iRow+3;x++){
        for(let y = iCol;y<iCol+3;y++){
            if(board[x][y]==num){
                return false
            }
        }
     }
     return true
}
export function generateSuduko(board,randomArray){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            if(board[row][col]==0){
                for(let num of randomArray){
                    if(isSafe(board,row,col,num)){
                        board[row][col] = num
                        if(generateSuduko(board,randomArray)){
                            return true
                        }
                        board[row][col] = 0;
                    }
                }
                return false
            }
        }
    }
    return true
}
export function removeCells(board,no){
    for(let x = 0;x<no;x++){
        const row = generateRandom(1,9)-1;
        const col = generateRandom(1,9)-1;
        board[row][col] = 0
    }
}
export function sudoko(mode){
    const no_of_cell = generateRandom(modes[mode].value[0],modes[mode].value[1])
    let solvedBoard = Array.from({length:9},()=>Array(9).fill(0))
    let randomArray = [];
    while(1){
        if(randomArray.length == 9)break;
        const num = generateRandom(1,9)
        if((!randomArray.includes(num))){
            randomArray.push(num);
        }
    }
    generateSuduko(solvedBoard,randomArray);
    let unSolvedBoard = solvedBoard.map(row=>row.map(num=>num))
    removeCells(unSolvedBoard,no_of_cell);
    unSolvedBoard = unSolvedBoard.map(row =>{
        return row.map(num=>{
            if(!num==0){
                return{value:num,default:true,pencilValue:0}
            }
            return {value:0,default:false,pencilValue:0}
        })
    })
    console.log(unSolvedBoard);
    
   
    
    return {solvedBoard,unSolvedBoard};
}

