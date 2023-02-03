script.
let cardType = ['k', 'l', 'p', 's']
let cardNumber = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
let cardDeck = []
let playerCards = []
let dealerCards = []
let turnedDealerCards = []
let wallet = 500
let bet = 0
//let betBox = document.getElementById('bet-box')
//let betAmount = parseInt(betBox.innerText)
let playBtn = document.getElementById('play-btn')
let betBtn = document.getElementById('bet-btn')
let betAmount = document.getElementById('bet-amount')
let betIncreaseBtn = document.getElementById('bet-increase-btn')
let betDecreaseBtn = document.getElementById('bet-decrease-btn')
let walletAmount = document.getElementById('wallet-amount')
let bettingBoard = document.getElementById('betting-board')
let bettingBoardItems = document.getElementById('betting-board-items')
let hitBtn = document.getElementById('hit-btn')
let stayBtn = document.getElementById('stay-btn')
let newRoundBtn = document.getElementById('new-round-btn')
let newRoundBtnBox = document.getElementById('new-round-btn-box')
let message = document.getElementById('message')
let playerCardsValue = 0
let dealerCardsValue = 0
let playerMarginTop = 180
let playerMarginLeft = 170
//let cardName = ''
let hitCounter = 0
let playerBust = false
let dealerBust = false
let increaseClickCnt = 0
// card coordinates
let firstPlayerCardStart = ['z-index = 4', 'transform:rotate(70deg)', 'margin-left:160px']
let firstPlayerCardEnd = ['margin-left:-210px', 'margin-top:300px']
let a = 'transform:rotate'
let playerCardStartPosition = [a + '(75deg);', a + '(70deg);', a + '(65deg);', a + '(60deg);', a + '(55deg);', a + '(50deg);', a + '(45deg);']
let b = 'margin-left:'
let playerCardEndPosition = [b + '-210px;', b + '-153px;', b + '-96px;', b + '-39px;', b + '18px;', b + '75px;', b + '132px;']
let pESP = [-210, -153, -96, -39, 18, 75, 132]
let playerCardTimes = [275, 250, 225, 200, 175, 150, 125]
let DealerCardStartPosition = [a + '(115deg);', a + '(120deg);', a + '(125deg);', a + '(130deg);', a + '(135deg);', a + '(140deg);', a + '(145deg);']
let firstPlayerStartEnd = []
//loop animation for adding/taking money away from wallet
//betting board
function Increase() {
    if (parseInt(walletAmount.innerText) > parseInt(betAmount.innerText)) {
        let currentAmount = parseInt(betAmount.innerText)
        betAmount.innerText = (currentAmount + 25).toString()
        increaseClickCnt = increaseClickCnt + 1
    }
}
function Decrease() {
    if (parseInt(betAmount.innerText) > 0) {
        let currentAmount = parseInt(betAmount.innerText)
        betAmount.innerText = (currentAmount - 25).toString()
        increaseClickCnt = increaseClickCnt - 1
    }
}
//place bet
//update wallet
function WalletBet() {
    let currentAmount = ParseInt(walletAmount.innerText)
    walletAmount.innerText = currentAmount - (increaseClickCnt * 25)
}
//hide betting board
function HideBetting() {
    bettingBoard.style.visibility = 'hidden'
    bettingBoardItems.style.visibility = 'hidden'
}
// main program when a bet is placed
betBtn.addEventListener('click', GameStart)
function GameStart() {
    hitCounter = 0
    HitAndStayBtnsOff()
    HideBetting()
    NewDeck()
    cardDeck = ShuffleDeck(cardDeck)
    AddCardToPlayerHand()
    PlayerCardMovement()
    // takes (275*20 + 1)
    //console.log(Math.abs(pESP[hitCounter-1]-150))
    setTimeout(function () {
        AddCardToDealerHand()
        DealerCardMovement()
        //console.log(playerCardsValue.toString())
    }, (25 + 2) * 20)
    setTimeout(function () {
        AddCardToPlayerHand()
    }, (25 + 25 + 3) * 20)
    setTimeout(function () {
        PlayerCardMovement()
        //console.log(playerCardsValue.toString())
        //250*20+1
    }, (25 + 25 + 4) * 20)
    setTimeout(function () {
        AddCardToDealerHand()
        DealerCardMovement()
        //250*20+1
    }, (25 + 25 + 20 + 5) * 20)
    setTimeout(function () {
        BJAndBustCheck()
    }, 100 * 20)
    setTimeout(function () {
        //console.log(playerCards[0].type + " " + playerCards[0].number + ",   " + playerCards[1].type + " " + playerCards[1].number + "      " + playerCardsValue.toString())
        //console.log(Math.abs(pESP[hitCounter-1]-150))
    }, ((25 + 25 + 20 + 6) * 20))
}
hitBtn.addEventListener('click', GameProgress)
function GameProgress() {
    AddCardToPlayerHand()
    PlayerCardMovement()
    setTimeout(function () {
        BJAndBustCheck()
    }, 16 * 20)
}
stayBtn.addEventListener('click', Stay)
function Stay() {
    HitAndStayBtnsOff()
    DealerFinish()
}
betIncreaseBtn.addEventListener('click', Increase)
betDecreaseBtn.addEventListener('click', Decrease)
newRoundBtn.addEventListener('click', NewRound)
function NewRound() {
    betAmount.innerText = '0'
    newRoundBtnBox.style.visibility = 'hidden'
    bettingBoardItems.style.visibility = 'visible'
    for (let i = 0; i < playerCards.length; i++) {
        let cardNum = i + 1
        let cardToReset = document.getElementById("c" + cardNum)
        cardToReset.style.visibility = 'hidden'
        cardToReset.style.visibility
    }
    for (let i = 0; i < dealerCards.length; i++) {
        let cardNum = i + 1
        let cardToReset = document.getElementById("dc" + cardNum.toString())
        cardToReset.style.visibility = 'hidden'
        cardToReset.src = './Imgs/back.jpg'
    }
    playerCards = []
    dealerCards = []
    HitAndStayBtnsOff()
    message.innerText = "place your bet!"
    increaseClickCnt = 0
}
function DealerFinish() {
    let secondCard = document.getElementById('dc2')
    secondCard.style.visibility = 'visible'
    secondCard.src = "./Imgs/" + turnedDealerCards[0] + ".png"
    hitCounter = 3
    AddCardToDealerHand()
    DealerCardMovement()
    setTimeout(function () {
        let thirdCard = document.getElementById('dc3')
        thirdCard.style.visibility = 'visible'
        thirdCard.src = "./Imgs/" + turnedDealerCards[1] + ".png"
    }, 226)
    setTimeout(function () {
        if (dealerCardsValue < 17) {
            for (let i = dealerCardsValue; i < 17; i = dealerCardsValue) {
                setTimeout(function () {
                    hitCounter = hitCounter + 1
                    AddCardToDealerHand()
                    DealerCardMovement()
                }, playerCardTimes[hitCounter - 1] + 50)
                setTimeout(function () {
                    let c = document.getElementById("dc" + hitCounter.toString())
                    c.style.visibility = 'visible'
                    c.src = "./Imgs/" + turnedDealerCards[hitCounter - 2] + ".png"
                }, (playerCardTimes[hitCounter - 1] + 51) * 2)
            }
        }
    }, 227)
    setTimeout(function () {
        if (dealerCardsValue > 21) {
            BetWon()
            DealerBustMessage()
            setTimeout(function () {
                bettingBoard.style.visibility = 'visible'
                newRoundBtnBox.style.visibility = 'visible'
            }, 200)
        }
        else {
            GameEnd()
        }
    }, 500)
    //compares value, and executes functions accordingly also reveals dealers hiddden cards etc...
    //switch?
}
function GameEnd() {
    if (playerCardsValue == dealerCardsValue) {
        StandoffMessage()
    }
    else if (playerCardsValue > dealerCardsValue) {
        BetWon()
        YouWinMessage()
    }
    else {
        BetLost()
        DealerWinsMessage()
    }
    setTimeout(function () {
        bettingBoard.style.visibility = 'visible'
        newRoundBtnBox.style.visibility = 'visible'
    }, 200)
}
// betwon  betlost  betreturned
function BetWon() {
    walletAmount.innerText = (wallet + (increaseClickCnt * 25) * 2).toString()
    wallet = wallet + (increaseClickCnt * 25)
}
function BetLost() {
    walletAmount.innerText = (wallet - (increaseClickCnt * 25)).toString()
    wallet = wallet - (increaseClickCnt * 25)
}
// function BetReturned()
// {
//     let winnings = Number(walletAmount.innerText) + Number(betAmount.innerText)
//     let winnings2 = winnings.toString()
//     walletAmount.innerText =  winnings2
//     //console.log(Number(betAmount.innerText))
// }
function BJAndBustCheck() {
    if (playerCardsValue == 21) {
        DealerFinish()
        HitAndStayBtnsOff()
        setTimeout(function () {
            bettingBoard.style.visibility = 'visible'
            newRoundBtnBox.style.visibility = 'visible'
        }, 200)
    }
    else if (playerCardsValue > 21) {
        playerBust = true
        PlayerBustMessage()
        HitAndStayBtnsOff()
        BetLost()
        setTimeout(function () {
            bettingBoard.style.visibility = 'visible'
            newRoundBtnBox.style.visibility = 'visible'
        }, 200)
    }
    else {
        HitAndStayBtnsOn()
    }
}
//hit and stay buttons light up (after first cards are dealt)
function HitAndStayBtnsOn() {
    hitBtn.style.opacity = '1'
    stayBtn.style.opacity = '1'
    hitBtn.disabled = false
    stayBtn.disabled = false
}
function HitAndStayBtnsOff() {
    hitBtn.style.opacity = '0.1'
    stayBtn.style.opacity = '0.1'
    hitBtn.disabled = true
    stayBtn.disabled = true
    let box = document.getElementById('message-box')
    //box.className = "position-absolute border bg-warning"
}
//cards, after bet placed, shuffling, moving cards
function AssignCards() {
    cardDeck = NewDeck()
    cardDeck = ShuffleDeck(cardDeck)
}
function DealCards() {
    let imageName = playerCards[0].type + toString(playerCards[0].number) + ".png"
    for (let a = 0; a < 50; a++) {
        setTimeout()
    }
}
function PlayerCardMovement() {
    //let start = performance.now()
    let start = Date.now(); // remember start time
    let card = document.getElementById('player-card-move')
    let count = 160
    let countTop = 50
    card.style = playerCardStartPosition[hitCounter - 1] + "height:120px; width:auto; margin-left: 170px; margin-top:180px; position: absolute; z-index: 10;"
    let timer = setInterval(function () {
        // how much time passed from the start?
        let timePassed = Date.now() - start;
        if (timePassed >= playerCardTimes[hitCounter - 1]) {
            clearInterval(timer); // finish the animation after 2 seconds
            return;
        }
        // draw the animation at the moment timePassed
        draw(timePassed);
    }, 20);
    // as timePassed goes from 0 to 2000
    // left gets values from 0px to 400px
    function draw(timePassed) {
        card.style.left = count + 'px';
        card.style.top = countTop + 'px';
        count = count - 21
        countTop = countTop + 4
    }
    setTimeout(function () {
        let handCard = document.getElementById('c' + (hitCounter).toString())
        handCard.style = "height:120px; width:auto; z-index: 3; visibility: visible; position: relative;"
        handCard.src = "./Imgs/" + CardName(playerCards) + ".png"
        card.style = "visibility: hidden; position:absolute;"
        //console.log(hitCounter.toString())
    }, playerCardTimes[hitCounter - 1] + 1)
}
// card.style.left = timePassed / 5 + 'px';
//     card.style.top = timePassed / 5 + 'px';
function DealerCardMovement() {
    let start = Date.now(); // remember start time
    let card = document.getElementById('player-card-move')
    let count = 160
    let countTop = 50
    card.style = DealerCardStartPosition[hitCounter - 1] + "height:120px; width:auto; margin-left: 170px; margin-top:110px; position: absolute; z-index: 10;"
    let timer = setInterval(function () {
        // how much time passed from the start?
        let timePassed = Date.now() - start;
        if (timePassed >= playerCardTimes[hitCounter - 1]) {
            clearInterval(timer); // finish the animation after 2 seconds
            return;
        }
        // draw the animation at the moment timePassed
        draw(timePassed);
    }, 20);
    // as timePassed goes from 0 to 2000
    // left gets values from 0px to 400px
    function draw(timePassed) {
        card.style.left = count + 'px';
        card.style.top = countTop + 'px';
        count = count - 21
        countTop = countTop - 4
    }
    setTimeout(function () {
        if (hitCounter >= 2) {
            let handCard = document.getElementById('dc' + (hitCounter).toString())
            handCard.style = "height:120px; width:auto; z-index: 3; visibility: visible; position: relative;"
            card.style = "visibility: hidden; position:absolute;"
            turnedDealerCards.push(CardName(dealerCards))
        }
        else {
            let handCard = document.getElementById('dc' + (hitCounter).toString())
            handCard.style = "height:120px; width:auto; z-index: 3; visibility: visible; position: relative;"
            handCard.src = "./Imgs/" + CardName(dealerCards) + ".png"
            card.style = "visibility: hidden; position:absolute;"
            //console.log(hitCounter.toString())
        }
    }, playerCardTimes[hitCounter - 1] + 1)
}
//messages
function DealerBustMessage() {
    message.innerText = "Dealer Bust!"
    setTimeout(function () {
        YouWinMessage()
    }, 500)
}
function StandoffMessage() {
    message.innerText = "Standoff!"
}
function BlackJackMessage() {
    message.innerText = "Blackjack!"
}
function YouWinMessage() {
    message.innerText = "You Win!"
}
function DealerWinsMessage() {
    message.innerText = "Dealer Wins!"
}
function PlayerBustMessage() {
    message.innerText = "Bust!"
}
//fix
function CardName(cards) {
    let cardNumberString = ''
    if (cards[cards.length - 1].number > 10) {
        let arr = ['j', 'q', 'k', 'a']
        cardNumberString = arr[cards[cards.length - 1].number - 11]
    }
    else {
        cardNumberString = parseInt(cards[cards.length - 1].number)
    }
    let cardName = cards[cards.length - 1].type + cardNumberString
    return cardName
}
//
function NewDeck() {
    while (cardDeck.length < 52) {
        for (var a = 0; a < 4; a++) {
            for (var b = 0; b < 12; b++) {
                cardDeck.push({ type: cardType[a], number: cardNumber[b] })
            }
        }
    }
}
function ShuffleDeck(arr) {
    arr.sort(() => Math.random() - 0.5);
    return arr
    // var tempDeck = []
    // var newDeck = []
    // for(var a = 0; a < 52; a++)
    // {
    //     tempDeck.push(a)
    // }
    // for(var a = 0; tempDeck.length > 0; a++)
    // {
    //     var r = Math.floor(Math.random() * 52)
    //     if(tempDeck.includes(r))
    //     {
    //         tempDeck.pop(r)
    //         newDeck.push(arr[r])
    //     }
    // }
    // return newDeck
}
//
function AddCardToPlayerHand() {
    playerCards.push(cardDeck[cardDeck.length - 1])
    cardDeck.splice(cardDeck.length - 1, 1)
    playerCardsValue = CardsValue(playerCards)
    hitCounter = hitCounter + 1
}
function AddCardToDealerHand() {
    dealerCards.push(cardDeck[cardDeck.length - 1])
    cardDeck.splice(cardDeck.length - 1, 1)
    dealerCardsValue = CardsValue(dealerCards)
}
function Raise() {
    if (parseInt(betAmount.innerText) < wallet) {
        let a = parseInt(betAmount.innerText) + 20
        betAmount.innerText = a.toString()
    }
    betIncreaseBtn.disabled = false
}
function Lower() {
    if (parseInt(betAmount.innerText) > 0) {
        let a = parseInt(betAmount.innerText) - 20
        betAmount.innerText = a.toString()
    }
    betDecreaseBtn.disabled = false
}
//
function CardsValue(cards) {
    var value = 0
    for (var a = 0; a < cards.length; a++) {
        if (10 < cards[a].number && cards[a].number < 14) {
            value = value + 10
        }
        else if (cards[a].number == 14) {
            if (value + 11 >= 21) {
                value = value + 1
            }
            else {
                value + 11
            }
        }
        else {
            value = value + cards[a].number
        }