// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
const canvas = document.getElementById('myCanvas')
const context = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height - 30

let fillColour = '#0095DD'

let dx = 2
let dy = -2

const ballRadius = 10

const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2

let rightPressed = false
let leftPressed = false

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30

let score = 0
let lives = 3

const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }
    }
}



function keyDownHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true
    }
}

function keyUpHandler(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r]
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy
                    b.status = 0
                    fillColour = randomColour()
                    score++
                    if (score === brickRowCount * brickColumnCount) {
                        alert('YOU WIN, CONGRATULATIONS')
                        document.location.reload()
                    }
                }
            }
        }
    }
}

function randomColour() {
    const max = 255
    randomRed = Math.floor(Math.random() * max + 1)
    randomGreen = Math.floor(Math.random() * max + 1)
    randomBlue = Math.floor(Math.random() * max + 1)
    return `rgba(${randomRed}, ${randomGreen}, ${randomBlue}, 1)`
}

function drawScore() {
    context.font = '16px Arial'
    context.fillStyle = '#0095DD'
    context.fillText(`Score: ${score}`, 8, 20)
}

function drawLives() {
    context.font = '16px Arial'
    context.fillStyle = '#0095DD'
    context.fillText(`Lives: ${lives}`, canvas.width - 65, 20)
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                context.beginPath()
                context.rect(brickX, brickY, brickWidth, brickHeight)
                context.fillStyle = '#0095DD'
                context.fill()
                context.closePath()
            }
        }
    }
}

function drawBall() {
    context.beginPath()
    context.arc(x, y, ballRadius, 0, Math.PI * 2)
    context.fillStyle = fillColour
    context.fill()
    context.closePath()
}

function drawPaddle() {
    context.beginPath()
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    context.fillStyle = '#0095DD'
    context.fill()
    context.closePath()
}

function draw() {
    // drawing code
    context.clearRect(0,0,canvas.width, canvas.height)
    drawBricks()
    drawBall()
    drawScore()
    drawLives()
    drawPaddle()
    collisionDetection()

    if (y + dy < ballRadius) {
        dy = -dy
        fillColour = randomColour()
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy
        } else {
            lives--
            if (!lives) {
                alert('GAME OVER')
                document.location.reload()
            } else {
                x = canvas.width / 2
                y = canvas.height - 30
                dx = 2
                dy = -2
                paddleX = (canvas.width - paddleWidth) / 2
            }
        }
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx
        fillColour = randomColour()
    }
    x += dx
    y += dy

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth)
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0)
    }
    requestAnimationFrame(draw)
}



draw()