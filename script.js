const cell0 = document.getElementById('0')
const gameBoard = (() => {
    const cells = ['x','x','x','x','x','x','x','x','x']
    
    return {
        cells
    }
})()

function render() {
    cell0.innerHTML = gameBoard.cells[0]
}