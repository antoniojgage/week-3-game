    // set array of random words
    var options = ["bird", "batman", "superman", "green arrow"];

    // var scoreInfo = "<p>Wins: " + wins + "</p>" +
    //     "<p>Losses: " + losses + "</p>" +
    //     "<p>Letters Input: " + userInput + "</p>";
    // var randomWord = options[Math.floor(Math.random() * options.length)];
    // console.log(randomWord);
    var wins = 0;
    // var lives = randomWord.length + 1;
    var losses = 0
    var userInput = [];
    var dashGuesses = [];
    var resetAlert;

    randomWordChoice();

    console.log(dashGuesses);

    document.onkeyup = function(event) {
        // Saves user input into the array userInput (lowercase)
        userInput.push(String.fromCharCode(event.keyCode).toLowerCase());


        //If user input is contained in random word & lives > 0, replace user input with index of array
        if (randomWord.indexOf(userInput[userInput.length - 1]) > -1 && lives > 0) {
            // resetAlert();
            replaceElements();
            writeStats();
            console.log("last entry: " + userInput[userInput.length - 1] + " is in the mystery word!");
        } else if (lives > 0) {
            //user inputs incorrect answer and losses a life.
            lives = (lives - 1);
            // resetAlert();
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
    }


    //Begin Logic to replace dash
    function replaceElements() {
        var start_index = randomWord.indexOf(userInput[userInput.length - 1]);
        var number_of_elements_to_remove = 1;
        var removed_elements = dashGuesses.splice(start_index, number_of_elements_to_remove, userInput[userInput.length - 1]);
        console.log(removed_elements);
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
        if (lives === 0) {
            resetAlert = "<h1>You've lost! Game has been reset, new words has been chosen</h1>";
            resetDivStatus();
        } else {
            resetAlert = "<h1>You've Won!!! Game has been reset, new words has been chosen</h1>";
            resetDivStatus();
        }

        // function newGame() {
        //     userInput = [];
        //     dashGuesses = [];
        //     newGame = true;
        // }

        function resetDivStatus() {
            document.querySelector("#resetAlert").innerHTML = resetAlert;
        }
        // newGame();
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

    writeStats();
