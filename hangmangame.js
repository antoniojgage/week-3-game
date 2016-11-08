    // set array of random words
    var options = ["bird", "batman", "superman", "green arrow"];
    // var options = ["green arrow"]; /* For testing */

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
            getAllIndexes(randomWord, lastKey);
            getAllIndexes(randomWord, " ");
            console.log("Removing Spaces");
            console.log(dashGuesses.indexOf("_"));
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
            reset();
        }
    }



    // Here we create the HTML that will be injected into our div and displayed on the page.
    function writeStats() {
        var html = "<p id=dashes>" + dashGuesses.join("") + "</p>" +
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

    // Initiates a new game by generating a new word and emptying out all index positions for underscore (_)
    function randomWordChoice() {
        randomWord = options[Math.floor(Math.random() * options.length)];
        lives = randomWord.length + 1;
        //Empties the previous user input and dashed guess arrays
        userInput = [];
        dashGuesses = [];
        newGame = true;

        for (i = 0; i < randomWord.length; i++) {
            dashGuesses.push("_");
        }
    }

    //Function to rset H1 alert message when user losses.
    function resetAlert() {
        resetAlert = "";
        document.querySelector("#resetAlert").innerHTML = resetAlert;
    }

    //Begin Logic to replace dash
    function getAllIndexes(arr, val) {
        var indexes = [];
        i = -1;
        while ((i = arr.indexOf(val, i + 1)) != -1) {
            indexes.push(i);
            // currentI equals the current index in the word that will replace _ for the correct guessed letter.
            var currentI = i;
            var start_index = currentI;
            var number_of_elements_to_remove = 1;
            var replacementElement = userInput[userInput.length - 1]
            if (val === " ") {
                replacementElement = " ";
            }
            // 1st element = Start of the index 2nd element = how many elements to remove, 3rd element = element to replace
            var removed_elements = dashGuesses.splice(start_index, number_of_elements_to_remove, replacementElement);
            console.log("removed index " + removed_elements.indexOf() + " for " + val);
        }
        if ((dashGuesses.indexOf("_")) < 0) {
            wins++
            reset();
            console.log("loop determined a winner!");
        }
        return indexes;
    }

    // var indexes = getAllIndexes(randomWord, lastKey);

    writeStats();
