//Initial Data
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let playerTime = ''
let warning = ''
let gameOver = false

reset()
//Events
document.querySelector('.reset').addEventListener('click', reset)
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick)
})


//Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item')
    if (gameOver && board[item] === '') {
        board[item] = playerTime
        renderBoard()
        togglePlayer()
    }
}

function reset() {
    warning = ''
    let random = Math.floor(Math.random() * 2)
    playerTime = (random === 0)? 'X' : 'O'

    for (let i in board) {
        board[i] = ''
}
    gameOver =  true
    renderBoard()
    renderInfo()
}

function renderBoard() {
    for(let i in board){
        console.log("ITEM", i)
        let item = document.querySelector(`div[data-item=${i}`)
        item.innerHTML = board[i]
    }
    checkGame()
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTime
    document.querySelector('.resultado').innerHTML = warning
}

function togglePlayer() {
    playerTime = (playerTime === 'X')? 'O' : 'X'
    renderInfo()
}

function checkGame() {
     if (checkWinner('X')) {
         warning = 'O "X" venceu'
         gameOver = false
     }else if (checkWinner('O')) {
         warning = 'O "O" venceu'
         gameOver = false
     }else if (isFull()) {
         warning = 'Deu empate'
         gameOver = false
     }
}

function checkWinner(player) {
    let pos  = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for (let w in pos) {
        let pArray = pos[w].split(',')
        let hasWon = pArray.every(option => board[option] === player)

        if (hasWon) {
            return true
        }
    }
    return false
}

function isFull() {
    for (let i in board) {
        if (board[i] === '') {
         return false
        }   
    }
    return true 
}