const randomNumber = Math.floor(Math.random() * 100) + 1;

const data1 = document.querySelector("#guessField");

const prevValues = document.querySelector(".prev");

const remainGuess = document.querySelector(".remain");

const btn = document.querySelector("#subbtn");

const hint = document.querySelector(".hint");

const newgame = document.querySelector(".score");

let guesses = 0;

let play = true;

if(play)
{
    btn.addEventListener("click", myfunction);
}

function myfunction(event)
{
    event.preventDefault();
    const deci = parseInt(data.value);
    if(!isNaN(deci) && deci.length > 0)
    {
        validate(deci);
    }
}

function validate(val)
{
    if(isNaN(val) || val < 1 || val > 100)
    {
        alert("Enter valid number");
    }
    else if(guesses == 10)
    {
        displayGuess(val);
        endGame();
    }
    else
    {
        displayGuess(val);
        check(val);
    }
}

function check(val)
{
    if(val == randomNumber)
    {
        endGame();
    }
    else if(val < randomNumber)
    {
        displayMessage("Number is lower than the random number");
    }
    else
    {
        displayMessage("Number is higher than the random number");
    }
}

function displayGuess(val)
{
    data.value="";
    prevValues.innerHTML += `${val}`;
    guesses++;
    if(val == 0)
    {
        remainGuess.innerHTML = `0`;
    }
    else
    {
        remainGuess.innerHTML = `${10 - guesses}`;
    }
}

function displayMessage(message)
{
    hint.innerHTML = message;
}

function endGame(val, output)
{
    var sco = val + "+" + output;
    localStorage.setItem("score", sco);
    location.href = "index1.html";
}