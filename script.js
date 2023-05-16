document.addEventListener('submit', (e) => {
    e.preventDefault()
    let input = new FormData(document.querySelector('form'))
    input = Object.fromEntries(input)
    
    // create players
    let player1 = Player(input['player1-name'], input['player1-color'])
    let player2 = Player(input['player2-name'], input['player2-color'])
    document.querySelector('form').reset()
    return {
        player1,
        player2
    }
})

// game control logic
const Game = (() => {
    // check to see if any row has 3 markers that are the same
    const horizontalCheck = () => {
        let board = gameBoard.getBoard()
        for (position = 0; position <= 6; position + 3) {
            if ((new Set(board[position], board[position + 1], board[position + 2]).size == 1) && (board[position] != null)) {
                return 'victory'
            }
        }
    }
    // check to see if any column has 3 markers that are the same
    const verticalCheck = () => {
        let board = gameBoard.getBoard()
        for (position = 0; position <= 2; position + 1) {
            if ((new Set(board[position], board[position + 3], board[position + 6]).size == 1) && (board[position] != null)) {
                return 'victory'
            }
        }
    }
    // check to see if any diagonal row has 3 markers that are the same
    const diagonalCheck = () => {
        let board = gameBoard.getBoard()
        if ((new Set(board[0], board[4], board[8]).size == 1) && (board[0] != null)) {
            return 'victory'
        }
        if ((new Set(board[2], board[4], board[6] == 1).size == 1) && (board[2] != null)) {
            return 'victory'
        }
    }
    // check to see if the game board is full (tie condition)
    const isFull = () => {
        if (gameBoard.cells.filter(n => n === 0 || n).length === 9) {
            return true
        }
    }
    // check whether any victory/tie conditions have been met
    const checkVictory = () => {
       if ((horizontalCheck() == 'victory') || (verticalCheck() == 'victory') || (diagonalCheck() == 'victory')) {
            return 'end'
        }
        else if (isFull() == true) {
            return 'tie'
        }
    }

    return {
        checkVictory
    }
})

// game board module - holds the board array and
// manages the markers on it.
const GameBoard = (() => {
    board: []

    const placeMarker = (marker, position) => {
        board[position] = marker;
    }
    const getBoard = () => {
        return board;
    }

    return {
        placeMarker,
        getBoard
    };
})();

// factory to create tic-tac-toe players
const Player = (name, color) => {
    name : name
    color : color
    score : 0

    const getName = () => {
        return name
    }
    const getColor = () => {
        return color
    }
    const getScore = () => {
        return score
    }

    const incrementScore = () => {
        ++score
    }

    return {
        getName,
        getColor,
        getScore,
        incrementScore
    }
}








/*
//const cells = document.querySelectorAll('.game-cell')
const resetButton = document.querySelector('.reset-game')
const clearButton = document.querySelector('.clear-game')
//const board = document.querySelector('.game-board')
const score1Display = document.querySelector('.x-score')
const score2Display = document.querySelector('.o-score')
const userMessage = document.querySelector('.user-message')


function populateData(input) {
    const player1 = document.getElementById('player1')
    const player2 = document.getElementById('player2')

    player1.innerText = input['player1-name']
    player1.style.color = input['player1-color']
    player2.innerText = input['player2-name']
    player2.style.color = input['player2-color']
}

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
            displayMessage(`${temp['player1-name']} wins`)
            incrementScore('x')
            return
        }
        if(victoryCheck() === 'o') {
            displayMessage(`${temp['player2-name']} wins`)
            incrementScore('o')
            return
        }
        if(scratchCheck() === true) {
            displayMessage('Scratch!')
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

function render(input) {
    cells.forEach(cell => {
        if (gameBoard.cells[cell.id] === undefined) {
            cell.innerHTML = ''
        } else {
            cell.innerHTML = gameBoard.cells[cell.id]
            if (cell.innerHTML === 'x') {
                cell.style.color = temp['player1-color']
            } else {
                cell.style.color = temp['player2-color']
            }
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

function scratchCheck() {
    if(gameBoard.cells.filter(n=> n === 0 || n ).length === 9) {
        return true
    }
}

function displayMessage(message) {
    userMessage.innerText = message
}*/