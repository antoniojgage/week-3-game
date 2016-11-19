window.onload = function() {
    // set array of random words
    var options = ["thor", "batman", "superman", "green arrow", "wolverine", "spider man", "captain america", "martian manhunter", "flash", "robin", "daredevil"];
    var clues = ["Drop Da Hamma!", "Out of the night that covers me", "Is it a bird? Maybe a plane?", "Not the Lantern but the...", "Healing Factor +1", "I leave a mark on walls...sorry to the maid", "Motivational Speaker", "I can defeat the entire justice League Alone", "Little time travel before lunch?", "Sidekick Extrodinare", "blind as a bat, but not a bat."]
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    var wins = 0;

    var losses = 0
    var userInput = [];
    var dashGuesses = [];
    var resetAlert;
    var winAudio = new Audio('assets/audio/kids.mp3');
    createButtons();
    randomWordChoice();
    console.log(randomWord);
    console.log(dashGuesses);

    document.onkeyup = function(event) {
        // Saves user input into the array userInput (lowercase)
        if (event.keyCode) {
            var lastKey = String.fromCharCode(event.keyCode).toLowerCase();
        } else {
            //applies the last button push inside the button "letter" to the variable last key
            var lastKey = $(this).data('letter').toLowerCase();
            console.log("button push was " + lastKey)
            console.log("Current user Input = " + userInput)
        }
        if (/[a-zA-Z0-9-_]/.test(lastKey)) { //if keycode in alphabet
            //if match, replace underscore w/matching letter

            //performs a check to see if this is a new game, if so...delete the previous win/loss message
            if (newGame === true) {
                console.log("Initiated new Game! " + newGame)
                resetAlert = "";
                document.querySelector("#resetAlert").innerHTML = resetAlert;
            }
            //Checks if the last key is in the index of Random word, if so and its not a previously selected key replace the index
            if (randomWord.indexOf(lastKey) >= 0 && userInput.indexOf(lastKey) === -1 && lives > 0) {
                userInput.push(lastKey);
                getAllIndexes(randomWord, lastKey);
                getAllIndexes(randomWord, " ");
                console.log("Removing Spaces");
                console.log(dashGuesses.indexOf("_"));
                writeStats();
                console.log("Great Guess! Adding " + (String.fromCharCode(event.keyCode).toLowerCase()) + "!");
            } else if (userInput.indexOf(lastKey) >= 0) {
                //if the conditions above already met add method here to tell user its already been guessed.
                console.log("You have already Guessed: " + (String.fromCharCode(event.keyCode).toLowerCase()) + " key skipping...");
            } else if (randomWord.indexOf(lastKey) === -1 && lives > 0) {
                //Logic for incorrect guesses.
                --lives;
                userInput.push(lastKey);
                writeStats();
                console.log("Sorry " + lastKey + " is not a correct guess.");
                // console.log("last entry: " + userInput[userInput.length - 1] + " is NOT in the mystery word!");
                console.log("Lost a life! Current Count " + lives);
            } else if (dashGuesses.indexOf("_") === 0 && (lives < 1)) {
                //User is out of lives, resets the game incriments a loss.
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


    // Function to write all stats on the page
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
    //Function to reset the current win/loss status
    function reset() {
        if (lives < 1) {
            resetAlert = "<h3>You've lost! Game has been reset, new words has been chosen</h3>";
            resetDivStatus();
        } else {
            resetAlert = "<h3>You've Won!!! Game has been reset, new words has been chosen</h3>";
            resetDivStatus();
        }
        //Reset inner HTML
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
        console.log("random clue is: " + randomClue + " Index of R is = " + r + " Random Word = " + randomWord);
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
        //checks if the user is a winner at the time of the guess, if so perform win actions.
        if ((dashGuesses.indexOf("_")) < 0) {
            winAudio.play();
            wins++
            $("#lastGuess").html("Last word choice was: " + randomWord + "</h1>");
            reset();
            console.log("loop determined a winner!");
        }
        return indexes;
    }

    //Reset button that resets the game and chooses a new word
    $("#resetButton").on("click", function() {
        resetAlert = "";
        $("#lastGuess").html("Last word choice was: " + randomWord + "</h1>");
        document.querySelector("#resetAlert").innerHTML = resetAlert;
        writeStats();
        randomWordChoice();
    });

    //function that writes the alphabet and creates buttons elements in html
    function createButtons() {
        for (i = 0; i < letters.length; i++) {
            var letterBtn = $("<button class='btn-primary'>");
            letterBtn.html("<h1>" + letters[i] + "</h1>")
            letterBtn.addClass("letter-button", "letter", "letter-button-color");
            letterBtn.attr("data-letter", letters[i]);
            // console.log(letters[i]);

            $("#buttons").append(letterBtn);
        }
    }

    $('.letter-button').click(document.onkeyup)
        // var indexes = getAllIndexes(randomWord, lastKey);

    writeStats();
};
