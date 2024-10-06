/*

//  Higher Order Function
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function calculator(num1, num2, operator) {
  return operator(num1, num2);
}


// Keyborad Event Listner
document.addEventListener(
    "keydown",
    (event) => {
      const keyName = event.key;
  
      if (keyName === "Control") {
        // do not alert when only Control key is pressed.
        return;
      }
  
      if (event.ctrlKey) {
        // Even though event.key is not 'Control' (e.g., 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the same time.
        alert(`Combination of ctrlKey + ${keyName}`);
      } else {
        alert(`Key pressed ${keyName}`);
      }
    },
    false,
  );
  
  document.addEventListener(
    "keyup",
    (event) => {
      const keyName = event.key;
  
      // As the user releases the Ctrl key, the key is no longer active,
      // so event.ctrlKey is false.
      if (keyName === "Control") {
        alert("Control key was released");
      }
    },
    false,
  );
*/

// Anonymous Function
let numberOfButton = document.querySelectorAll(".drum").length;
for (let i = 0; i < numberOfButton; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    // alert("I got click")
    console.log(this.innerHTML);
    // let audio = new Audio("sounds/tom-1.mp3");
    // audio.play();
    let buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keypress", (event) => {
  let KeyName = event.key;
  console.log(KeyName);
  makeSound(KeyName);
  buttonAnimation(KeyName);
});

function makeSound(buttonInnerHTML) {
  switch (buttonInnerHTML) {
    case "w":
      let audio1 = new Audio("sounds/tom-1.mp3");
      audio1.play();
      break;
    case "a":
      let audio2 = new Audio("sounds/tom-2.mp3");
      audio2.play();
      break;
    case "s":
      let audio3 = new Audio("sounds/tom-3.mp3");
      audio3.play();
      break;
    case "d":
      let audio4 = new Audio("sounds/tom-4.mp3");
      audio4.play();
      break;
    case "j":
      let audio5 = new Audio("sounds/snare.mp3");
      audio5.play();
      break;
    case "k":
      let audio6 = new Audio("sounds/crash.mp3");
      audio6.play();
      break;
    case "l":
      let audio7 = new Audio("sounds/kick-bass.mp3");
      audio7.play();
      break;

    default:
      console.log("Unvalid Buttom");
      break;
  }
}

function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(() => {
    activeButton.classList.remove("pressed");
  }, 200);
}
