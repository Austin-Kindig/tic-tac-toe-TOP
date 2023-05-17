document.addEventListener('submit', (e) => {
    e.preventDefault()
    Game.reset()
    let input = new FormData(document.querySelector('form'))
    input = Object.fromEntries(input)
    
    // create players
    let player1 = Player(input['player1-name'], input['player1-color'])
    player1.marker = 'x'
    let player2 = Player(input['player2-name'], input['player2-color'])
    player2.marker = 'o'
    document.querySelector('form').reset()
    Game.displayPlayers()
    return {
        player1,
        player2
    }
})

const resetButton = document.querySelector('.reset-game')
const clearButton = document.querySelector('.clear-game')
resetButton.addEventListener('click', Game.reset())
clearButton.addEventListener('click', GameBoard.clear())

// need event listerner for clicking cells,


// game control logic
const Game = (() => {
    let currentPlayer = 1
    const playRound = (position) => {
        if (currentPlayer === 1) {
            GameBoard.placeMarker('x', position)
            currentPlayer = 2
            if (checkVictory === 'end') {
                player1.score += 1
            }
        }
        else {
            GameBoard.placeMarker('x', position)
            currentPlayer = 1
            if (checkVictory === 'end') {
                player2.score += 1
            }
        }
        updateDisplay()
    }
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
    const displayPlayers = () => {
        const player1Display = document.getElementById('player1')
        const player1Score = document.getElementsByClassName('x-score')
        const player2Display = document.getElementById('player2')
        const player2Score = document.getElementsByClassName('o-score')

        player1Display.innerText = player1.getName()
        player1Display.style.color = player1.getColor()
        player1Score.innerText = player1.getScore()
        player2Display.innerText = player2.getName()
        player2Display.style.color = player2.getColor()
        player2Score.innerText = player2.getScore()
    }
    const reset = () => {
        GameBoard.clear()
        player1.resetScore()
        player2.resetScore()
        updateDisplay()
    }
    const updateDisplay = () => {
        GameBoard.draw()
        displayPlayers()
    }

    return {
        playRound,
        checkVictory,
        displayPlayers,
        reset,
        updateDisplay
    }
})

// game board module - holds the board array and
// manages the markers on it.
const GameBoard = (() => {
    let board = []

    const placeMarker = (marker, position) => {
        board[position] = marker;
    }
    const getBoard = () => board;
    const draw = () => {
        const cells = document.querySelectorAll('.game-cell')
        cells.forEach(cell => {
            if (gameBoard.cells[cell.id] === undefined) {
                cell.innerHTML = ''
            } else {
                cell.innerHTML = board[cell.id]
                if (cell.innerHTML === 'x') {
                    cell.style.color = player1.color
                } else {
                    cell.style.color = player2.color
                }
            }
        });
    }
    const clear = () => {
        board = []
        draw()
    }

    return {
        placeMarker,
        getBoard,
        draw,
        clear
    };
})();

// factory to create tic-tac-toe players
const Player = (name, color) => {
    let score = 0

    const getName = () => name
    const getColor = () => color
    const getScore = () => score
    const incrementScore = () => {
        ++score
    }
    const resetScore = () => {
        score = 0
    }

    return {
        getName,
        getColor,
        getScore,
        incrementScore,
        resetScore
    }
}


/*
//const board = document.querySelector('.game-board')
const userMessage = document.querySelector('.user-message')

function xOrO() {
    return (gameBoard.cells.filter(n=> n === 0 || n ).length % 2 === 0 ? 'x' : 'o') 
}

