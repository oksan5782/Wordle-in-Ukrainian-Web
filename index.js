// Dark mode switcher
const page = document.querySelector(".page")
const toggle = document.getElementById("dark_mode")
const navbar = document.getElementById("navigation")

toggle.addEventListener("click", changeTheme)

function changeTheme() {
    if (page.classList.contains("light")) {
        page.classList.replace("light" , "dark")
        toggle.innerText = "light_mode";
        navbar.classList.replace("bg-light" , "bg-dark")
    }
    else {
        page.classList.replace("dark" , "light")
        toggle.innerText = "dark_mode";
        navbar.classList.replace("bg-dark" , "bg-light")
    }
}


// Rules pop up - react to Rules button and closing icon
const rulesBtn = document.getElementById("rules-list")
rulesBtn.addEventListener("click", openRules)

function openRules() {
  const rulesContent = document.querySelector(".rules-text")
  const statsCheck = document.querySelector(".statistics")
  const endGamePop = document.querySelector(".end-game")

  if (getComputedStyle(statsCheck).display == "block")  {
    statsCheck.style.display = "none"
  }
  if (getComputedStyle(endGamePop).display == "block") {
    endGamePop.style.display = "none"
  }
  if (getComputedStyle(rulesContent).display == "none") {
      rulesContent.style.display = "block"
  }
  else {
      rulesContent.style.display = "none"

  }
}

const closeRulesBtn = document.getElementById("rules-close-btn")
closeRulesBtn.addEventListener("click", closeRules)

function closeRules() {
    const rulesContent = document.querySelector(".rules-text")
    rulesContent.style.display = "none";
}


// Statistics pop up - react to Stats button and closing icon
const statsBtn = document.getElementById("stats")
statsBtn.addEventListener("click", openStats)

function openStats() {
  const statsContent = document.querySelector(".statistics")
  const rulesCheck = document.querySelector(".rules-text")
  const endGamePop = document.querySelector(".end-game")
  if (getComputedStyle(rulesCheck).display == "block") {
      rulesCheck.style.display = "none"
  }
  if (getComputedStyle(endGamePop).display == "block") {
      endGamePop.style.display = "none"
  }

  if (getComputedStyle(statsContent).display == "none") {

    // Get values from local storage
    let totalGamesCount = localStorage.getItem('totalGamesPlayed')
    let gamesStats = JSON.parse(localStorage.getItem('sessionStats'))
    let winsPercentage = ""
    if (gamesStats.length == 0) {
        winsPercentage = "Немає даних"
    } else {
        let winsCount = 0
        for (const game of gamesStats) {
            if (game == "win") {
                winsCount = winsCount + 1
            }
        }
        winsPercentage = Math.floor(winsCount * 100 / totalGamesCount)
    }


    // Update values to display
    const winsElement = document.getElementById("total-games-data")
    const winsPercElement = document.getElementById("wins-count-per-data")
    winsElement.innerText = totalGamesCount
    winsPercElement.innerText = winsPercentage


      statsContent.style.display = "block"
  }
  else {
      statsContent.style.display = "none"
  }
}

// Add event listener to the buttons after the game has ended
const closeStatsBtn = document.getElementById("stats-close-btn")
closeStatsBtn.addEventListener("click", openStats)


function closeStats() {
    const statsContent = document.querySelector(".statistics")
    statsContent.style.display = "none";
}

const startNextGame = document.getElementById("next-game")
startNextGame.addEventListener("click", returnToStart)

const checkStatsEnd = document.getElementById("check_stats")
checkStatsEnd.addEventListener("click", openStats)


// Game logic

// import a dictionary with all possible word combinations to check
import { ALL_WORDS } from "./all_words.js";


// Constant with list of usable words to guess
const WORDS_LIST = ['пакет', 'курка', 'буква', 'чайка', 'берег', 'башта', 'архів', 'зірка', 'кобза', 'ліжко', 'сусід', 'узвар', 'цегла', 'хімія', 'фінал', 'юрист', 'халва', 'поїзд', 'обʼєм', 'горло', 'опіум', 'синус', 'мокро', 'фарба', 'учень', 'зріст', 'група', 'шинка', 'пошук', 'трава', 'свиня', 'обвал', 'туман', 'форма', 'склад', 'щогла', 'утиск', 'лицар', 'вітер', 'голка', 'аорта', 'вафля', 'етика', 'земля', 'базар', 'ртуть', 'хунта', 'фініш', 'мойра', 'пугач', 'кошти', 'буття', 'жінка', 'разом', 'бісер', 'вазон', 'напад', 'жрець', 'тонус', 'мавпа', 'цифра', 'лимон', 'злива', 'добро', 'аркуш', 'баран', 'особа', 'обрив', 'епоха', 'ожина', 'двері', 'цукат', 'гроно', 'діжка', 'ворог', 'акула', 'зеніт', 'річка', 'назва', 'табун', 'анонс', 'бідон', 'пекло', 'рибак', 'хвиля', 'горіх', 'килим', 'намул', 'жменя', 'дзиґа', 'медіа', 'олень', 'шинок', 'читач', 'живіт', 'допис', 'кухар', 'таксі', 'опора', 'норма', 'зерно', 'короп', 'цвіль', 'гідра', 'злоба', 'коала', 'обмін', 'хруст', 'чохол', 'знать', 'плита', 'ринок', 'чавун', 'еклер', 'думка', 'праця', 'намір', 'горох', 'осока', 'лиман', 'гвинт', 'дієта', 'блуза', 'ґвалт', 'дошка', 'кювет', 'зміна', 'буряк', 'щастя', 'павич', 'арена', 'втома', 'аґрус', 'обсяг', 'колія', 'докір', 'розум', 'буфет', 'хмара', 'дикун', 'цукор', 'чобіт', 'радар', 'титан', 'осика', 'магія', 'вузол', 'запас', 'голод', 'увага', 'журба', 'фазан', 'крило', 'майор', 'пусто', 'носій', 'дотик', 'мотор', 'наука', 'жнива', 'огида', 'пасок', 'спирт', 'унція', 'обряд', 'груша', 'озеро', 'кіоск', 'нація', 'бутон', 'дрова', 'залік', 'еліта', 'синяк', 'касир', 'пацюк', 'гілля', 'кошик', 'рядок', 'аргон', 'череп', 'торік', 'життя', 'буйок', 'школа', 'лишай', 'отвір', 'марка', 'слива', 'армія', 'зшити', 'какао', 'філія', 'зошит', 'пучок', 'емаль', 'гамір', 'натяк', 'ангар', 'секта', 'гроші', 'ляпас', 'атлет', 'копія', 'естет', 'вигук', 'кабан', 'адепт', 'ордер', 'точка', 'окріп', 'комар', 'замша', 'мопед', 'книга', 'серце', 'агент', 'океан', 'черга', 'масло', 'весна', 'ложка', 'кефір', 'набір', 'салон', 'зрада', 'нафта', 'казан', 'обгін', 'князь', 'аташе', 'торба', 'батон', 'карма', 'манго', 'пасаж', 'зебра', 'алмаз', 'чарка', 'кожух', 'літак', 'пудра', 'заєць', 'щітка', 'пункт', 'ідеал', 'логік', 'чумак', 'страх', 'клоун', 'гумор', 'усміх', 'палій', 'мумія', 'злука', 'атлас', 'пошта', 'фішка', 'гість', 'кішка', 'майно', 'бочка', 'квант', 'осінь', 'морда', 'завше', 'мазут', 'сталь', 'мряка', 'обруч', 'мозок', 'ліцей', 'квота', 'палка', 'ліміт', 'ціпок', 'ікона', 'збори', 'атака', 'окунь', 'каска', 'лазня', 'балка', 'факел', 'інжир', 'омлет', 'поділ', 'ручка', 'магма', 'бренд', 'пласт', 'пісок', 'дятел', 'сором',  'миска', 'лінза', 'номер', 'канва', 'дзвін', 'онука', 'паска', 'азарт', 'спина', 'щебет', 'іспит', 'зброя', 'астма', 'олово', 'жупан', 'дамба', 'тирса', 'запах', 'хвіст', 'метал', 'фасон', 'брила', 'вуаль', 'лаваш', 'намет', 'напій', 'губка', 'товар', 'попіл', 'мʼясо', 'драма', 'робот', 'шкіра', 'порох', 'оазис', 'монах', 'олімп', 'гроза', 'зміст', 'вокал', 'криво', 'орден', 'мавка', 'індик', 'плече', 'нетрі', 'чвари', 'вдома', 'алібі', 'успіх', 'попит', 'кажан', 'віяло', 'абзац', 'озноб', 'цезій', 'олива', 'вгорі', 'збоку', 'іскра', 'папір', 'цинга', 'кавун', 'булка', 'орган', 'чашка', 'ватра', 'любов', 'ранок', 'гуляш', 'екран'];

// Create another word list to check possible letter combinations in a valid word
const GUESS_COUNT = 6;

// Define variables that will be updated during the game
let remainingGuesses = GUESS_COUNT;
let currentGuess = [];
let letterCount = 0;

// Keeping variables in local storage - total games for total + stats
if (!localStorage.hasOwnProperty('totalGamesPlayed')) {
    localStorage.setItem('totalGamesPlayed', 0);
}
if (!localStorage.hasOwnProperty('sessionStats')) {
    let sessionStatsArray = []
    localStorage.setItem('sessionStats', JSON.stringify(sessionStatsArray))
}

let todayWordIndex = parseInt(localStorage.getItem('totalGamesPlayed'))
let todayGuessWord = WORDS_LIST[todayWordIndex];

// Add reactions to keypress events
const ukrCharsList = ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и', 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш','щ', 'ь', 'ю', 'я', 'ʼ']

// Add event listener for the whole document
document.addEventListener("keyup", function(e) {
    // Check if we have any gusses left
    if (remainingGuesses === 0) {
        return
    }

    // Apply special chars functions
    if (e.key === "Backspace" && letterCount !== 0) {
        deleteChar()
        return
    }

    if (e.key == "Enter") {
        checkGuess()
        return
    }
    // Check if the input is a valid character in Ukrainian alphabet, make it lowercase
     if (ukrCharsList.includes(e.key)) {
        insertChar(e.key.toLowerCase())
    }
})

function deleteChar() {

    // Select the tab and clear it
    let currentRow = document.querySelectorAll(".row")[GUESS_COUNT - remainingGuesses]
    let currentLetter = currentRow.children[letterCount - 1]
    currentLetter.innerText = ''

    // Remove letter from the guess list and update letter count
    currentGuess.pop()
    letterCount = letterCount - 1

}

function checkGuess() {
    if (currentGuess.length < 5) {
        Toastify({
            text: "Не вистачає букв!",
            className: "pop-ups",
            position: "center",
            close: true,

            style: {
                background: "linear-gradient(45deg, #688c88, #5D7186)"
              },
            offset: {
                x: "2em",
                y: "2.5em"
            },
          }).showToast();
        return
    }

    // Turn guess word from a list to a string to perform string checks
    let currentGuessJoined = currentGuess.join('')

    // Return alert if the word is not valid (check if I can find this list in Ukrainian)
    if (!ALL_WORDS.includes(currentGuessJoined)) {
        Toastify({
            text: "Такого слова не існує!",
            className: "pop-ups",
            position: "center",
            close: true,

            style: {
                background: "linear-gradient(45deg, #688c88, #5D7186)"
              },
            offset: {
                x: "2em",
                y: "2.5em"
            },
          }).showToast();
          return
    }
    // Get current row
    let currentRow = document.querySelectorAll(".row")[GUESS_COUNT - remainingGuesses]
    let currentGameScore = GUESS_COUNT - remainingGuesses
    const endGamePop = document.querySelector(".end-game")

    // Iterate over every letter in the word and change the color of the cell
    for (let i = 0; i < 5; i++) {
        let letterPresense = ''
        // Select letter cell to color it later
        let currentLetter = currentRow.children[i]
        // Select current letter in guess
        let toBeCheckedLetter = currentGuessJoined[i]

        // Check where current letter is presset in the word of the day
        let letterPosition = todayGuessWord.indexOf(currentGuessJoined[i])

         //indexOf returns -1 if the value is not in the list (string)
         if (letterPosition === -1) {
            letterPresense = 'not-here'
         } else {
            // if the indexes are the same - the letter is in the right position
            if (todayGuessWord[i] === currentGuessJoined[i]) {
                letterPresense = "right-place"
            } else {
                // The only option remaining is presense but in a  wrong position
                letterPresense = "wrong-place"
            }
         }

         // Change colors of the cell and Keyboard key adding small delay
         let delay_time = 200 * i
         setTimeout(()=> {
            currentLetter.classList.add(letterPresense)
            colorKeyboard(toBeCheckedLetter, letterPresense)
         }, delay_time)


    }
    // Display results of the check
    setTimeout(()=> {
        if (currentGuessJoined == todayGuessWord) {
            Toastify({
                text: "Молодець!",
                className: "pop-ups",
                position: "center",
                close: true,
                style: {
                    background: "linear-gradient(45deg, #688c88, #5D7186)"
                },
                offset: {
                    x: "2em",
                    y: "2.5em"
                },
            }).showToast();
            remainingGuesses = 0

            // Update values at local storage
            let previuosGameCount = parseInt(localStorage.getItem('totalGamesPlayed'))
            let newGameCount = previuosGameCount + 1
            localStorage.setItem("totalGamesPlayed", newGameCount)

            let gamesStats = JSON.parse(localStorage.getItem('sessionStats'))
            gamesStats.push("win")
            localStorage.setItem("sessionStats", JSON.stringify(gamesStats))

            endGamePop.style.display = "block"
            return
        } else {
            remainingGuesses = remainingGuesses - 1
            currentGuess = []
            letterCount = 0

            // Inform about the end of the game if there are no guesses left
            if (remainingGuesses === 0) {
                Toastify({
                    text: `Гру закінчено!
                            Слово дня — "${todayGuessWord}"`,
                    className: "pop-ups",
                    position: "center",
                    close: true,
                    style: {
                        background: "linear-gradient(45deg, #688c88, #5D7186)"
                    },
                    offset: {
                        x: "2em",
                        y: "2.5em"
                    },
                }).showToast();
                        // Update values at local storage
                    let previuosGameCount = parseInt(localStorage.getItem('totalGamesPlayed'))
                    let newGameCount = previuosGameCount + 1
                    localStorage.setItem("totalGamesPlayed", newGameCount)

                    let gamesStats = JSON.parse(localStorage.getItem('sessionStats'))
                    gamesStats.push("lose")
                    localStorage.setItem("sessionStats", JSON.stringify(gamesStats))
                    endGamePop.style.display = "block"
            }
        }
    }, 1400)
}

function returnToStart(){

    // Remove color added
    // Close the pop-up window
    const endGamePop = document.querySelector(".end-game")
    endGamePop.style.display = "none"
    // Close stats
    const statsContent = document.querySelector(".statistics")
    statsContent.style.display = "none"

    // Retrieve index from local storage
    todayWordIndex = localStorage.getItem('totalGamesPlayed')
    todayGuessWord = WORDS_LIST[todayWordIndex]
    remainingGuesses = 6
    const page = document.querySelector(".page")


    // Remove colors from keyboard
    for (const keyElement of document.querySelectorAll(".key")) {
        keyElement.style.backgroundColor = ""
        keyElement.style.color = ""
    }

    currentGuess = []
    letterCount = 0
    for (const row of document.querySelectorAll(".row")) {
        for (const letterCell of row.children) {
            letterCell.innerText = ""
            letterCell.classList.remove("not-here", "wrong-place", "right-place")
        }

    }
}

// Add event listener to the button in statistics
const newGameStartBtn = document.getElementById("new-game-stats")
newGameStartBtn.addEventListener("click", returnToStart)

function insertChar(letter) {
    if (letterCount === 5 ) {
        return
    }

    // Get the row corresponding to the current guess and insert the letter
    let currentRow = document.querySelectorAll(".row")[GUESS_COUNT - remainingGuesses]
    let currentLetter = currentRow.children[letterCount]

    currentLetter.innerText = letter.toUpperCase()

    // Update checkword and letter count
    currentGuess.push(letter)
    letterCount += 1
}

// Add functionality to virtual keyboard
const keywordButtons = document.querySelectorAll(".key")
const deleteButton = document.getElementById("delete")
const enterButton = document.getElementById("enter")

// Add click event to each button
keywordButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // No need to check if the alphabet keys are correct - only Ukrainian keyboard is added
        insertChar(btn.innerText.toLowerCase())
    })
})

deleteButton.addEventListener("click", deleteChar)
enterButton.addEventListener("click", checkGuess)

function colorKeyboard(letter, colorClass) {

    // Select all key and iterate over them
    for (const keyElement of document.querySelectorAll(".key")) {

        // Apply style changes if the key is found
        if (keyElement.innerText.toLowerCase() === letter) {
            // Get color of each key
            let currentColor = window.getComputedStyle(keyElement).getPropertyValue('background-color')

            // Change color class in other cases
            keyElement.classList.add(colorClass)
            keyElement.style.color = "#e9f2f1"

            if (colorClass == "right-place") {
                keyElement.style.backgroundColor = "rgb(125,183,119)"
            }
            if (colorClass == "wrong-place") {
                keyElement.style.backgroundColor = "rgb(230,176,0)"
            }
            if  (colorClass == "not-here") {
                keyElement.style.backgroundColor = "rgb(134,144,150)"

            }
        }
    }
}