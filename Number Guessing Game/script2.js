var data = localStorage.getItem("score");
var val = parseInt(data.substring(0, data.indexOf("+")),10);
var output = data.substring(data.indexOf("+")+1);
if(output)
{
  document.querySelector("h1").innerHTML = "You Won";
}
else
{
  document.querySelector("h1").innerHTML = `You lost!!! The original number was ${val}`;
}
function dotask() {
    location.href='index.html';
}