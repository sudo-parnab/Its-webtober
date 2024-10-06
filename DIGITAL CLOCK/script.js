// Adding animation
$(".stopwatch-btn").click(function(){
  // hide all other wrapper
  $(".outer-wrapper > div").slideUp();

  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch")
});
$(".timer-btn").click(function(){
  // hide all other wrapper
  $(".outer-wrapper > div").slideUp();

  $(".timer").slideDown();
  $(".type").html("Timer")
});
$(".back-btn").click(function(){
  // hide all other wrapper
  $(".outer-wrapper > div").slideUp();

  $(".clock").slideDown();
  $(".type").html("Clock")
});
const addTrailingZero=(num)=>{
    return num < 10 ? "0" +num : num;
 };

 const updatetime = ()=>{
    const time=new Date();
    let hours =time.getHours();
    let minutes=time.getMinutes();
    let seconds=time.getSeconds();
    let ampm=hours >= 12 ? "PM" :"AM"; 
    let otherampm=hours >= 12 ? "AM" :"PM";

    // converting 24 hours into 12
    hours=hours%12 ||12  

    // add trailing zeros if less than 10
    hours=addTrailingZero(hours);
    minutes=addTrailingZero(minutes);
    seconds=addTrailingZero(seconds);
    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
 };

//  Calling the function on page land
updatetime(); 

// calling function every second
setInterval(updatetime,1000);

// Stopwatch
let stopwatchHours=0,
stopwatchMinutes=0,
 stopwatchSeconds=0,
stopwatchMiliseconds=0,
stopwatchRunning=false,
laps=0,
stopwatchInterval;

const stopwatch = () => {
    //  increasing miliseconds by one
    stopwatchMiliseconds++;

    if(stopwatchMiliseconds == 100){
        // if stopwatchMiliseconds equals 100 increase one second and ms=0
      stopwatchSeconds++;
      stopwatchMiliseconds=0;
    }
    if(stopwatchSeconds == 60){
        // if stopwatchSeconds equals 60 increase one second and s=0
      stopwatchMinutes++;
      stopwatchSeconds=0;
    }
    if(stopwatchMinutes == 60){
        // if stopwatchMinutes equals 60 increase one second and m=0
      stopwatchHours++;
      stopwatchMinutes=0;
    }
    
    // show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliseconds));
  };
    // Funciton to start the Stopwatch
    const startStopwatch = () => {
      if(!stopwatchRunning){
        //  if stopwatch not already running
        stopwatchInterval=setInterval(stopwatch,10);
        stopwatchRunning=true;
      }
    };
// Function to stop stopwatch
const stopStopwatch = () => {
  //Clearing all the values to default
  clearInterval(stopwatchInterval);
  stopwatchRunning=false;

};
//Reset StopWatch function
const resetStopwatch = () => {
    //Clearing the interval
  clearInterval(stopwatchInterval);
  stopwatchHours=0;
stopwatchMinutes=0;
 stopwatchSeconds=0;
stopwatchMiliseconds=0;
stopwatchRunning=false;
laps=0;
 // update value to initail
   $("#stopwatch-hour").html("00");
   $("#stopwatch-min").html("00");
   $("#stopwatch-sec").html("00");
   $("#stopwatch-ms").html("00");
   $(".laps").html("");
};
// Start stopwatch on start button
$(".start-stopwatch").click(function(){
  startStopwatch();
  // hide start button show lap button
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

// Reset stopWatch on Reset button
$(".reset-stopwatch").click(function(){
  resetStopwatch();
  // hide start button show lap button
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".laps").html("");
}); 

$(".lap-stopwatch").click(function(){
   // on lap button click
   laps++;
  //Remove Active class
  $(".lap").removeClass(".active");
   $(".laps").prepend(
    ` <div class="lap active">
    <p>lap ${laps}</p>
    <p>
     ${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}:${addTrailingZero(stopwatchSeconds)}:${addTrailingZero(stopwatchMiliseconds)}
     </p>
</div>
    `
   );
});

// Timer

let time=0,timerHours=0,timerMinutes=0,timerSeconds=0,
   timerMiliseconds=0, timerInterval;
  
   const getTime=()=>{
    time=prompt("Enter time in Minutes");
    // Convert time to Seconds 
    time=time*60;
    // update timer default
    setTime();
   };

   const setTime = () => {
    timerHours=Math.floor(time/3600);
    timerMinutes=Math.floor((time % 3600)/60);
    timerSeconds=Math.floor(time%60);

    // show user entered time on document
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
  };

const timer = () =>{
   timerMiliseconds--;
   if(timerMiliseconds==-1){
    timerMiliseconds=99;
    timerSeconds--;
   }
   if(timerSeconds==-1){
    timerSeconds=59;
    timerMinutes--;
   }
   if(timerMinutes==-1){
    timerMinutes=59;
    timerHours--;
   }  
   
   //Update time
   $("#timer-hour").html(addTrailingZero(timerHours));
   $("#timer-min").html(addTrailingZero(timerMinutes));
   $("#timer-sec").html(addTrailingZero(timerSeconds));
   $("#timer-ms").html(addTrailingZero(timerMiliseconds));
  
  //  Checking time of Every Interval
   timeUp();
  };

  // Start timer
const startTimer=()=>{
  // before checking if valid time given
  if((timerHours==0 & timerMinutes==0 && timerSeconds==0 && timerMiliseconds==0)){
    // if all the values are zero
    getTime();
  }
  else{
    // start timer
    timerInterval=setInterval(timer,10);
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
};

// stop timer
const stopTimer=()=>{
  clearInterval(timerInterval);
  $(".start-timer").show();
  $(".stop-timer").hide();
}

// Reset timer
const resetTimer=()=>{
    stopTimer();
    time=0;
    setTime();

}

// Check this timer remaining is 0
const timeUp=()=>{
  if((timerHours==0 & timerMinutes==0 && timerSeconds==0 && timerMiliseconds==0)){
    // if all the values are zero
    stopTimer();
    alert("time is up");
    setTime();
  }
}
// start timer
$(".start-timer").click(function(){
  startTimer();
  });

  // stop timer
  $(".stop-timer").click(function(){
    stopTimer();
  })

  // Reset Timer
  $(".reset-timer").click(function(){
    resetTimer();
  })

