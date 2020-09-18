let map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let mapReference = [...map]

let mazeMain = document.getElementById('maze')

let start = document.getElementById('start')
    start.addEventListener('click', maze)

let playerXY = [0 , 0]

let side = 'Right'

function getPlayerIndex() {
    let playerRow = false
    let rowCounter = 0
    while (playerRow === false) {
        rowCounter++
        playerRow = map[rowCounter].includes('S')
    }
    
    let row = map[rowCounter].split('')

    playerXY[0] = row.indexOf('S')
    playerXY[1] = rowCounter

    return (playerXY)
}

function maze() {
    mazeMain.innerHTML = ''
    mazeMain.classList.remove('hidden')

    start.classList.add('hidden')

    playerIndex = getPlayerIndex()

    map.forEach(row => {
        let rowMaze = document.createElement('div')
            rowMaze.classList.add("flexBox")

        mazeMain.appendChild(rowMaze) 

        let cell = row.split('')
            cell.forEach(cell => {
                
                let cellMaze = document.createElement('div')
                    rowMaze.appendChild(cellMaze)

                if (cell === ' ') {cellMaze.classList.add("floor")}
                if (cell === 'W') {cellMaze.classList.add('wall')}
                if (cell === 'F') {cellMaze.classList.add('final')}
                if (cell === 'S') {cellMaze.classList.add(`player${side}`);}

            })
    })

    document.addEventListener('keydown', getKey)
}

function getKey(event) {
    const keyName = event.key;
    console.log('keydown event\n\n' + 'key: ' + keyName);

    if (keyName === 'ArrowUp') {moveUp()}
    if (keyName === 'ArrowRight') {moveRight()}
    if (keyName === 'ArrowDown') {moveDown()}
    if (keyName === 'ArrowLeft') {moveLeft()}

};

function moveUp() {
    side = 'Up'

    document.removeEventListener('keydown', getKey)

    let splitRow = (map[playerXY[1]-1].split(''))

    if (splitRow[playerXY[0]] !== 'W') {
        splitRow[playerXY[0]] = 'S'
        map[playerXY[1]-1] = splitRow.join('') 
        deleteLast()  
    }
         
    maze()
}

function moveRight() {
    side = 'Right'

    document.removeEventListener('keydown', getKey)

    let splitRow = (map[playerXY[1]].split(''))

    if (splitRow[playerXY[0]+1] !== 'W') {
        splitRow[playerXY[0]+1] = 'S'   
        map[playerXY[1]] = splitRow.join('') 
        deleteLast()
    }
    
    checkWin() ? endGame() : maze()
}

function moveDown() {
    side = 'Down'

    document.removeEventListener('keydown', getKey)

    let splitRow = (map[playerXY[1]+1].split(''))

    if (splitRow[playerXY[0]] !== 'W') {
        splitRow[playerXY[0]] = 'S'
        map[playerXY[1]+1] = splitRow.join('') 
        deleteLast()  
    }
         
    maze()
}

function moveLeft() {
    side = 'Left'

    document.removeEventListener('keydown', getKey)

    if (playerXY[0] !== 0) {

        let splitRow = (map[playerXY[1]].split(''))

        if (splitRow[playerXY[0]-1] !== 'W') {
            splitRow[playerXY[0]-1] = 'S'   
            map[playerXY[1]] = splitRow.join('') 
            deleteLast()
        }
    }

    maze()
}

function deleteLast() {
    let deleteLastPosition = map[playerXY[1]].split('')
    deleteLastPosition[playerXY[0]] = " "
    map[playerXY[1]] = deleteLastPosition.join('')

    return
}

function checkWin() {
    finalPosition = [19 , 8]

    return (finalPosition[0] === playerXY[0] && finalPosition[1] === playerXY[1]) ? true : false

}

function endGame() {
    endGameModal = document.getElementById('endgame')
    endGameModal.classList.remove('hidden')

    map = [...mapReference]
}