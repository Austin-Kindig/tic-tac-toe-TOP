// add colors 
// add hover preview
// refactor and modularize
const cells = document.querySelectorAll('.game-cell')
const resetButton = document.querySelector('.reset-game')
const clearButton = document.querySelector('.clear-game')
const board = document.querySelector('.game-board')
const score1Display = document.querySelector('.x-score')
const score2Display = document.querySelector('.o-score')



resetButton.addEventListener('click', resetGame)
clearButton.addEventListener('click', clearBoard)

function resetGame() {
    clearBoard()
    resetScores()
}
function resetScores() {
    gameBoard.player1Score = 0
    gameBoard.player2Score = 0
}

function clearBoard() {
    gameBoard.cells = []
    render()
}

const gameBoard = (() => {
    const cells = []
    const player1Score = 0
    const player2Score = 0
    
    return {
        cells,
        player1Score,
        player2Score
    }
})()

board.addEventListener('click', (e) => {
    if (gameBoard.cells[e.target.id] === undefined) {
        const marker = xOrO()
        gameBoard.cells[e.target.id] = marker
        render()
        if(victoryCheck() === 'x') {
            alert('x wins')
            incrementScore('x')
        }
        if(victoryCheck() === 'o') {
            alert('o wins')
            incrementScore('o')
        }
    }
    
})

function incrementScore(winner) {
    if (winner === 'x') {
        gameBoard.player1Score += 1
        score1Display.innerHTML = gameBoard.player1Score

    } else {
        gameBoard.player2Score += 1
        score2Display.innerHTML = gameBoard.player2Score
    }
    clearBoard()

}

function render() {
    cells.forEach(cell => {
        if (gameBoard.cells[cell.id] === undefined) {
            cell.innerHTML = ''
        } else {
            cell.innerHTML = gameBoard.cells[cell.id]
        }
        
    });
}


function xOrO() {
    return (gameBoard.cells.filter(n=> n === 0 || n ).length % 2 === 0 ? 'x' : 'o') 
}

function generateCheckLine(start, add) {
    const line = []
    line.push(gameBoard.cells[start])
    line.push(gameBoard.cells[start + add])
    line.push(gameBoard.cells[start + add + add])
    return line
}

function generateLinesArray() {
    const array = [
        generateCheckLine(0,1),
        generateCheckLine(3,1),
        generateCheckLine(6,1),
        generateCheckLine(0,3),
        generateCheckLine(1,3),
        generateCheckLine(2,3),
        generateCheckLine(0,4),
        generateCheckLine(2,2)
    ]
    return array
}

function victoryCheck() {
    const array = generateLinesArray()
    const xWin = 'xxx'
    const oWin = 'ooo'
    let victory = ''
        array.forEach(element => {
            if (element.join('') === xWin) {
                victory = 'x'
            }
            if (element.join('') === oWin) {
                victory = 'o'
            }
        })
    
    return victory

}


/*
function horizontalCheck() {
    const win = ['x','x','x']
    for (i = 0; i > 3; i--) {

    }
} */