import { create }  from "zustand"
import { persist } from "zustand/middleware";
import { modes, sudoko } from "./sudokoUtils";
import { TrendingUpDown } from "lucide-react";

const initialState = {
    isStart: false,
    isPause: false,
    isComplete: false,
    pencilMode: false,
    mistake: 0,
    hints: 0,
    totalMistake: 5,
    time:0,
    mode:"easy",
    board: Array.from({length:9},()=>Array(9).fill(0)),
    qboard: Array.from({ length: 9 }, () =>
        Array(9).fill().map(() => ({
            default: false,
            value: 0,
            pencilValue: 0,
            hinted: false, // Initialize hinted as false
        }))
    ),
    
    selectedCell: {
        isUseHint: false,
        row: null,
        col: null,
        squares: null
    }
}
const gameState = (set)=>({
    ...initialState,
    startGame:(mode)=>{
        
        const data = sudoko(mode);
        set({
            ...initialState,
            board:data.solvedBoard,
            qboard:data.unSolvedBoard,
            isStart:true,
            hints:modes[mode].hints,
            totalMistake:modes[mode].mistake,
            mode:modes[mode]
        })
       
    },
    tryAgain:()=>{
        set(state=>{
            
            const qboard = state.qboard.map(row=>row.map(item=>{
                if(item.default) return item
                return{default:false,pencilValue:0,value:0}
            }))
            return {...state,qboard,mistake:0,hints:modes[state.mode.key].hints,isComplete:false,isPause:false,time:0}
        })
        
        
    },
    pauseGame:()=>{
        set(state =>({...state,isPause:!state.isPause}))
    },
    continueGame:()=>{
        set(state=>{
            if(localStorage.getItem("game")){
            let game = JSON.parse(localStorage.getItem("game"));
            return game
            }
            return state;
        })
    },
    tooglePencile:()=>{
        set(state =>({
            ...state,pencilMode:!state.pencilMode
        }))
    },
    changeQBoard:(num)=>{
        
        set(state=>{
            if(state.isPause || state.isComplete) return state;
            const row = state.selectedCell.row
            const col = state.selectedCell.col
            if(row ==null){
                return state
            }
            if(state.qboard[row][col].default) return state
            const qboard = state.qboard
            let mistake = state.mistake
            let isComplete = state.isComplete
            if(state.pencilMode){
            qboard[row][col] = {...qboard[row][col],pencilValue:num}
            }else{
                qboard[row][col] = {...qboard[row][col],value:num}
                if(qboard[row][col].value!=state.board[row][col]) mistake+=1;
                console.log(mistake);
                
                if(mistake>=state.totalMistake) isComplete = true
                console.log(state.totalMistake);
                
                let win = true;
                qboard.forEach((row,rIdx) => {
                    row.forEach((item,cIdx)=>{
                        if(item.value!=state.board[rIdx][cIdx]) win = false
                    })                    
                });
                if(win) isComplete = true
            }
           
            return {...state,qboard,mistake,isComplete}
        })
    },
    // checkComplete:()=>{
    //     set(state=>{
    //         const qboard = state.qboard
    //         qboard.array.forEach(element => {
                
    //         });
    //     })
    // },
    resetQBoard:()=>{
        set(state=>{
            if(state.isPause || state.isComplete) return state
            let qboard = state.qboard
            qboard = qboard.map(row=>row.map(item=>{
                if(item.default)return item
                else{
                    return {...item,value:0,pencilValue:0}
                }
            }))
            return {...state,qboard}
        })
    },
    quitGame:()=>{
        set(initialState);
    },
    setSelectedCell:(row,col)=>{
        const iRow = Math.floor(row/3)*3
        const iCol = Math.floor(col/3)*3
        const squares = [];
        for(let x = iRow;x<iRow+3;x++){
            for(let y = iCol;y<iCol+3;y++){
                squares.push([x,y])
            }
        }
        set({selectedCell:{row,col,squares}})
    },
    useHint: () => {
        set(state => {
            if (state.hints <= 0) return state; // No hints left
            if (state.selectedCell.row == null || state.selectedCell.col == null) return state; // No cell selected
            if (state.isPause || state.isComplete) return state; // Game is paused or complete
    
            let qboard = state.qboard;
            const { row, col } = state.selectedCell;
    
            if (qboard[row][col].default || qboard[row][col].hinted) return state; // Cell is default or already hinted
    
            // Use the hint
            qboard[row][col] = {
                ...qboard[row][col],
                value: state.board[row][col],
                hinted: true, // Mark this cell as hinted
            };
    
            return {
                ...state,
                qboard,
                hints: state.hints - 1, // Decrease the hints count
            };
        });
    },
    
    increaseTime:()=>{
        set(state=>{
            localStorage.setItem("game",JSON.stringify({...state,time:state.time+1}))
            return {...state,time:state.time+1}
        })
    
    },
    setState:()=>{},

}
)
export const useBoard = create(persist(gameState,{name:"board"}));