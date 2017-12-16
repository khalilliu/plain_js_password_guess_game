window.onload = (function(){
   return function(){
        init();
    }
})()


function init(){
   var wordCount =10,
    guessCount=4,
    password='';
    var start = document.getElementById('start');

    start.addEventListener("click", function(){
      reset();
      startGame();
    })

    function toggleClasses(elem,className){
        for(var i=0;i<className.length;i++){
            elem.classList.toggle(className[i]);
        }
    }

    function startGame(){
      var wordList = document.getElementById("word-list");
      wordList.innerHTML = '';
      document.getElementById("guess-remaining").innerText = "Guesses remaining: " + guessCount + ".";
      var randomWords = getRandomValues(words,wordCount);
      console.log(randomWords,guessCount);
      randomWords.forEach(function(word){
          var li = document.createElement('li');
          li.innerText = word;
          wordList.appendChild(li);
      })

      //set the password
      password = getRandomValues(randomWords,1)[0];
      setGuessCount(guessCount);

      //add guess eventlistener
     wordList.addEventListener('click',updateGame);
    }


    function getRandomValues(wordArr, numOfValues){
        return shuffle(wordArr).slice(0,numOfValues);
    }

    function shuffle(array){
        var arrayCopy = array.slice();
        var length = arrayCopy.length;
        var shuffled = Array(length);
        for(var index=0,rand;index<length;index++){
            rand = random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = arrayCopy[index];
        }
        return shuffled;
    }

    function random(min,max){
        if(max==null){
            max=min;
            min=0;
        }
        return min + Math.floor(Math.random()*(max-min+1))
    }

    function setGuessCount(numOfGuess){
        guessCount = numOfGuess;
        document.getElementById("guess-remaining").innerText = "Guesses remaining: " + guessCount + ".";
    }

    function updateGame(ev){
        if(ev.target.tagName == 'LI'&& !ev.target.classList.contains('disable')){
            var guess = ev.target.innerText;
            var similarityScore = compareWords(guess,password);
            ev.target.classList.add('disable');
            console.log(password);
            ev.target.innerText = ev.target.innerText + "-->Matching letters: "+ similarityScore;
            setGuessCount(guessCount-1);

            if(similarityScore === password.length){
                toggleClasses(document.getElementById("winner"),["hide","show"]);
                this.removeEventListener('click',updateGame);
            }
            else if(guessCount == 0){
                toggleClasses(document.getElementById("loser"),["hide","show"]);
                this.removeEventListener("click",updateGame);
            }
        }
    }

    function compareWords(word1,word2){
        if (word1.length !== word2.length) throw "Words must have the same length";
        var count = 0;
        for(var i=0;i<word1.length;i++){
            if(word1[i] === word2[i]) count++;
        }
        return count;
    }

    var playagain = document.querySelectorAll('.play-again');

    playagain.forEach(function(link){
        link.addEventListener("click",function(){
                reset();
            })
        })

    function reset(){
     wordCount =10,
     guessCount=4,
     password='';
    document.getElementById("word-list").removeEventListener('click',updateGame);
        toggleClasses(document.getElementById('game-screen'),['show','hide']);

    toggleClasses(document.getElementById('start-screen'),['show','hide']);
    document.getElementById("loser").className = 'hide';
    document.getElementById("winner").className = 'hide';
    document.getElementById('word-list').innerHTML = '';
    document.getElementById("guess-remaining").innerText = "Guesses remaining: " + guessCount + ".";
    }
}