    // set array of random words
    // var options = ["bird", "batman", "superman", "green arrow"];
    var options = ["green arrow"]; /* For testing */

    var wins = 0;

    var losses = 0
    var userInput = [];
    var dashGuesses = [];
    var resetAlert;


    randomWordChoice();
    console.log(randomWord);
    console.log(dashGuesses);

    document.onkeyup = function(event) {
        // Saves user input into the array userInput (lowercase)
        var lastKey = String.fromCharCode(event.keyCode).toLowerCase();

        console.log("You entered: " + lastKey);

        if (newGame === true) {
            console.log("Initiated new Game! " + newGame)
            resetAlert = "<h1></h1>"
            document.querySelector("#resetAlert").innerHTML = resetAlert;
        }

        if (randomWord.indexOf(lastKey) >= 0 && userInput.indexOf(lastKey) === -1 && lives > 0) {
            userInput.push(lastKey);
            replaceElements();
            getAllIndexes(randomWord, lastKey);
            writeStats();
            console.log("Great Guess! Adding " + (String.fromCharCode(event.keyCode).toLowerCase()) + "!");
        } else if (userInput.indexOf(lastKey) >= 0) {
            console.log("You have already Guessed: " + (String.fromCharCode(event.keyCode).toLowerCase()) + " key skipping...");
        } else if (randomWord.indexOf(lastKey) === -1 && lives > 0) {
            lives = (lives - 1);
            writeStats();
            console.log("Sorry " + lastKey + " is not a correct guess.");
            // console.log("last entry: " + userInput[userInput.length - 1] + " is NOT in the mystery word!");
            console.log("Lost a life! Current Count " + lives);
        } else if (dashGuesses.indexOf("_") === 0 && (lives < 1)) {
            losses++;
            reset();
        } else if (dashGuesses.indexOf("_" === -1)) {
            //if none of the conditions above meet the user is a winner!
            wins++
        }
    }


    /* Removing for a second to check logic above.
            //If user input is contained in random word & lives > 0, replace user input with index of array
            if (randomWord.indexOf(userInput[userInput.length - 1]) > -1 && lives > 0) {
                replaceElements();
                writeStats();
                console.log("last entry: " + userInput[userInput.length - 1] + " rewriting stats!");
            } else if (lives > 0) {
                //user inputs incorrect answer and losses a life.
                lives = (lives - 1);
                writeStats();
                console.log("last entry: " + userInput[userInput.length - 1] + " is NOT in the mystery word!");
                console.log("Lost a life! Current Count " + lives);
            } else if (dashGuesses.indexOf("_") === 0 && (lives < 1)) {
                //Checks if underscore (_) exists in the dashGuesses array, if it does and the user is out of lives...reset the game and add 1 to losses.
                losses++;
                reset();
            } else {
                //if none of the conditions above meet the user is a winner!
                wins++;
            }
        } */


    //Begin Logic to replace dash
    function replaceElements() {

        // Matches the index of the last element pushed to userInputs. 
        // var start_index = randomWord.indexOf(userInput[userInput.length - 1]);
        // var number_of_elements_to_remove = 1;
        // var removed_elements = dashGuesses.splice(start_index, number_of_elements_to_remove, userInput[userInput.length - 1]);
        // console.log(removed_elements);
    }
    // Here we create the HTML that will be injected into our div and displayed on the page.
    function writeStats() {
        var html = "<p id=dashes>" + dashGuesses + "</p>" +
            "<p>The word you're guessing is " +
            randomWord.length + " letters long.</p>" +
            "<p> Previous Inputs: " + userInput + "</p>";
        // Write Wins, Lossees & Previous user input
        var scoreInfo = "<p>Wins: " + wins + "</p>" +
            "<p>Losses " + losses + "</p>" +
            "<p>Lives: " + lives + "</p>";
        document.querySelector("#gameInfo").innerHTML = scoreInfo;
        document.querySelector("#hangman").innerHTML = html;
    }

    function reset() {
        if (lives < 1) {
            resetAlert = "<h1>You've lost! Game has been reset, new words has been chosen</h1>";
            resetDivStatus();
        } else {
            resetAlert = "<h1>You've Won!!! Game has been reset, new words has been chosen</h1>";
            resetDivStatus();
        }


        function resetDivStatus() {
            document.querySelector("#resetAlert").innerHTML = resetAlert;
        }

        randomWordChoice();
        writeStats();
    }

    function randomWordChoice() {
        randomWord = options[Math.floor(Math.random() * options.length)];
        lives = randomWord.length + 1;

        userInput = [];
        dashGuesses = [];
        newGame = true;
        for (i = 0; i < randomWord.length; i++) {
            dashGuesses.push("_");
        }
    }

    function resetAlert() {
        resetAlert = "";
        document.querySelector("#resetAlert").innerHTML = resetAlert;
    }

    function getAllIndexes(arr, val) {
        var indexes = [];
            i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
            var start_index = randomWord.indexOf(userInput[userInput.length - 1]);
            var number_of_elements_to_remove = 1;
            var removed_elements = dashGuesses.splice(start_index, number_of_elements_to_remove, userInput[userInput.length - 1]);
            console.log(removed_elements);
        }
        return indexes;
    }

    // var indexes = getAllIndexes(randomWord, lastKey);

    writeStats();
