var scores, roundScore, activePlayer;
scores = [0,0];
roundScore = 0;
activePlayer = 0;


document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';



document.querySelector('.btn-roll').addEventListener('click', function(){
    // need a random number 
     var dice = Math.floor(Math.random() * 6) + 1; //1-6

     //display the result
    var diceDOM = document.querySelector('dice');
    //document.querySelector('.dice').style.display = 'block';
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png' // this will get the image 
     //update the round/score if the rolled numner was not a 1

});



/*
//console.log(dice);

document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'  + dice + '</em>';

var x = document.querySelector('#score-0').textContent;
//console.log(x);
*/