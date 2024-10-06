const calculateTemp = () => {
    const numberTemp = document.getElementById('cel-temp').value;
    console.log(numberTemp);

    const tempSelected = document.getElementById('temp_diff');
        const valueTemp =temp_diff.options[tempSelected.selectedIndex].value;
        
   const celToFah = (cel) =>{
    let fahrenheit = ((cel * 9/5) + 32 );
    return fahrenheit ;
   }
   const celTokelvin = (cel) => {
    cel=parseInt(cel);
    let Kelvin = (273.15 + cel);
    return Kelvin;
   }

        let result;
        if(valueTemp == 'cel'){
        result= numberTemp ;
        document.getElementById('result').innerHTML= ` = ${result}℃elsius` ;
        }
        else if(valueTemp == "fah"){
           result= celToFah(numberTemp);
           document.getElementById('result').innerHTML= ` = ${result} ℉ahrenheit` ;
        }
        else if(valueTemp == "kel"){
            result= celTokelvin(numberTemp);
           document.getElementById('result').innerHTML= ` = ${result} Kelvin` ;
        }

}