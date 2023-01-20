// add display to let the users know who's turn it is
// add colors 
// add restart button
// add victory counter
// add hover preview
const cells = document.querySelectorAll('.game-cell')


const gameBoard = (() => {
    const cells = []
    
    return {
        cells
    }
})()

document.addEventListener('click', (e) => {
    if (gameBoard.cells[e.target.id] === undefined) {
        const marker = xOrO()
        gameBoard.cells[e.target.id] = marker
        render()
        if(victoryCheck() === 'x') {
            alert('x wins')
        }
        if(victoryCheck() === 'o') {
            alert('o wins')
        }
    }
    
})

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