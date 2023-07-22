//FATAL FLAW
var REFLECTIONS = [];
var IMPULSES = [];
//site becomes useless if user prevents page dialouges
function toggleTextarea(buttonId) {
    // Get the button and its position
    var button = document.getElementById(buttonId);
    var rect = button.getBoundingClientRect();

    // Get the id of the textarea
    var textareaId = buttonId + '_textarea';

    // Check if a textarea already exists
    var existingTextarea = document.getElementById(textareaId);
    if (existingTextarea) {
        // If a textarea already exists, remove it
        existingTextarea.remove();
    } else {
        // If no textarea exists, create a new one
        var textarea = document.createElement('textarea');

        // Set textarea properties
        textarea.id = textareaId;
        textarea.style.width = rect.width + 'px';
        textarea.style.height = '50px';
        textarea.style.position = 'absolute';
        textarea.style.left = rect.left + 'px';
        textarea.style.top = (rect.top + rect.height) + 'px';
        textarea.style.resize = 'none';

        // Append the textarea to the body
        document.body.appendChild(textarea);
        return textarea;
    }
}
//TOP BUTTONS FUNCTIONS
// HELP BUTTON
function displayPopup() {
    let helpTextbox = toggleTextarea("helpButton");
    if (helpTextbox) {
        helpTextbox.textContent = "This is epic Ernie's productivity maker, make yourself at home and good luck on your productivity! [Press help to hid this message]";
        helpTextbox.style.width = '400px';
    }
}

//IMPULSE BUTTON
let impulseR = false;
function recordRandomShit() {
    impulseR = true;
    reflectionInput();
}

//REFLECTION BUTTON
function reflectionInput() {
    let helpTextbox = toggleTextarea("helpButton");
    console.log(impulseR);
    if (helpTextbox) {
        if (!impulseR) {
            helpTextbox.textContent = "Enter your daily reflection here. [Press enter to save and exit]";
        }
        else {
            helpTextbox.textContent = "Enter whatever thought you had that robbed you of your precious focus: [press enter to save and exit]";
        }
        helpTextbox.style.width = '670px';
        // Add flag to track if this is the first click
        helpTextbox.isFirstClick = true;

        // Clear the initial text on first click
        helpTextbox.addEventListener('click', function (event) {
            if (helpTextbox.isFirstClick) {
                helpTextbox.value = '';
                helpTextbox.isFirstClick = false;
            }
        });

        // Clear the textarea when its content is cleared
        helpTextbox.addEventListener('input', function (event) {
            if (helpTextbox.value === '') {
                helpTextbox.value = '';
            }
        });

        // Remove the textarea when 'Enter' key is pressed
        helpTextbox.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log(impulseR);  // prevent form submission or line break
                if (impulseR == true) {
                    IMPULSES.push(helpTextbox.value);
                }
                else {
                    REFLECTIONS.push(helpTextbox.value);
                    console.log("impulse not turned on");
                }
                helpTextbox.remove();
            }

        });
        impulseR = false;
    }
}


//SET WAKE UP TIME BUTTON
function changetime(inputTime) {
    let text;
    if (inputTime) {
        text = inputTime;
    }
    else {
        text = window.prompt("Please set your wakeup time:", 9);
    }
    var regex = /^(0?[0-9]|1[0-9]|2[0-3])$/;
    // Test the variable against the regular expression
    if (regex.test(text)) {
        for (let i = 0; i < 24; i++) {
            var timeblock = document.getElementById(i);
            var timeshow = timeblock.querySelector("#rectangleNumber");
            timeshow = timeshow.querySelectorAll('button');
            timeshow2 = null;
            if (timeshow.length == 3) {
                timeshow2 = timeshow[1];
            }
            timeshow = timeshow[0];
            number = parseInt(text)
            if (i + number > 23) {
                number = i + number - 24;
                if (number < 0) {
                    number++;
                }
            }
            else {
                number = i + number;
            }
            if (number < 12) {
                timeshow.textContent = number + " am";
            }
            else {
                timeshow.textContent = (number - 12) + " pm";
            }
            if (timeshow.textContent.charAt(0) == "0") {
                timeshow.textContent = '12' + timeshow.textContent.slice(1);
            }
            if (timeshow2) {
                timeshow2.textContent = timeshow.textContent.replace(/(\d+)\b/, '$1:30');
            }
        }
    }
}

//RECORD IMPULSE BUTTON
var randomImpulseAndThoughts = [];

//RESET BUTTON
let clickTimes = [];
function resetAll() {
    clickTimes.push(new Date().getTime());
    if (clickTimes.length < 5) {
        return;
    }
    let lastFiveClicks = clickTimes.slice(-5);
    if (lastFiveClicks[4] - lastFiveClicks[0] <= 1000) {
        // If so, perform the action
        location.reload(true);
    }
    clickTimes = clickTimes.filter(time => new Date().getTime() - time <= 1000);
}