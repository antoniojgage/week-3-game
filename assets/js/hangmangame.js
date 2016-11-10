    // set array of random words
    var options = ["thor", "batman", "superman", "green arrow", "wolverine", "spider man", "captain america", "martian manhunter", "flash", "robin", "daredevil"];
    var clues = ["Drop Da Hamma!", "Out of the night that covers me", "Is it a bird? Maybe a plane?", "Not the Lantern but the...", "Healing Factor +1", "I can defeat the entire justice leage alone...", "I can defeat the entire justice League Alone", "Little time travel before lunch?", "Sidekick Extrodinare", "blind as a bat, but not a bat."]
    var wins = 0;

    var losses = 0
    var userInput = [];
    var dashGuesses = [];
    var resetAlert;
    var winAudio = new Audio('assets/audio/kids.mp3');


    randomWordChoice();
    console.log(randomWord);
    console.log(dashGuesses);

    document.onkeyup = function(event) {
        // Saves user input into the array userInput (lowercase)
        var lastKey = String.fromCharCode(event.keyCode).toLowerCase();
        if (/[a-zA-Z0-9-_]/.test(lastKey)) { //if keycode in alphabet
            //if match, replace underscore w/matching letter
            console.log("a-z,A-Z,0-9,-_");

            console.log("You entered: " + lastKey);

            if (newGame === true) {
                console.log("Initiated new Game! " + newGame)
                resetAlert = "";
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
                winAudio.play();
                $("#lastGuess").html("Last word choice was: " + randomWord + "</h1>");
                wins++
                reset();
            }
        }
    }


    // Here we create the HTML that will be injected into our div and displayed on the page.
    function writeStats() {
        var html = "<p id=dashes>" + dashGuesses.join("") + "</p>" +
            "<p>The word you're guessing is " +
            randomWord.length + " letters long.</p>" +
            "<p> Previous Inputs: " + userInput + "</p>" +
            "<p> Clue: " + randomClue + "</p>";
        // Write Wins, Lossees & Previous user input
        var scoreInfo = "<p>Wins: " + wins + "</p>" +
            "<p>Losses " + losses + "</p>" +
            "<p>Lives: " + lives + "</p>";

        document.querySelector("#gameInfo").innerHTML = scoreInfo;
        document.querySelector("#hangman").innerHTML = html;
    }

    function reset() {
        if (lives < 1) {
            resetAlert = "<h3>You've lost! Game has been reset, new words has been chosen</h3>";
            resetDivStatus();
        } else {
            resetAlert = "<h3>You've Won!!! Game has been reset, new words has been chosen</h3>";
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

        r = Math.floor(Math.random() * options.length);
        // randomWord = options[Math.floor(Math.random() * options.length)];
        randomWord = options[r];
        randomClue = clues[r];
        console.log("random clue is: " + randomClue);
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
            winAudio.play();
            wins++
            $("#lastGuess").html("Last word choice was: " + randomWord + "</h1>");
            reset();
            console.log("loop determined a winner!");
        }
        return indexes;
    }

    $("#resetButton").on("click", function() {
        resetAlert = "";
        $("#lastGuess").html("Last word choice was: " + randomWord + "</h1>");
        document.querySelector("#resetAlert").innerHTML = resetAlert;
        writeStats();
        randomWordChoice();
    });



    // var indexes = getAllIndexes(randomWord, lastKey);

    writeStats();
