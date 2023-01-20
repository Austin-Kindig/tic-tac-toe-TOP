const cells = document.querySelectorAll('.game-cell')

const gameBoard = (() => {
    const cells = []
    
    return {
        cells
    }
})()

document.addEventListener('click', (e) => {
    const marker = xOrO()
    gameBoard.cells[e.target.id] = marker
    render()
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
// 'x','x','x','x','x','x','x','x','x'