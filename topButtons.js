//TOP BUTTONS FUNCTIONS
// HELP BUTTON
function displayPopup() {
    alert("Welcome to ernie's productivty tracker!!");
}

//REFLECTION
function reflectionInput() {
    let text = "";
    text = window.prompt("Enter your reflection", "");
    //Task: prevent the enter key from fucking everything up
}

//SET WAKE UP TIME BUTTON
function changetime() {
    let text = window.prompt("Please set your wakeup time:", 9);
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

