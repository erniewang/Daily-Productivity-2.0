//'#bab0b0'

//colors shit
function interpolateColor(n, N_min, N_max) {
    var colors = [
        [255, 0, 0],        // Red
        [255, 165, 0],      // Orange
        [255, 255, 0],      // Yellow
        [144, 238, 144],    // Light Green
        [0, 255, 0]         // Green (slightly lighter)
    ];
    var idx = Math.min(Math.floor(((n - N_min) / (N_max - N_min)) * (colors.length - 1)), colors.length - 2);
    var t = ((n - N_min) / (N_max - N_min)) * (colors.length - 1) - idx;
    var interp = colors[idx].map((startValue, i) => Math.floor(startValue + t * (colors[idx + 1][i] - startValue)));
    return '#' + interp.map(value => value.toString(16).padStart(2, '0')).join('');
}

//changing the colors action
function changeSingleSquare(button) {
    var parent = button.parentNode.parentNode;
    var textes = parent.querySelectorAll('textarea');
    let realColorValue = variableRateIncrease(textColorValue);
    if (button.textContent.includes("30")) {
        textes[1].style.backgroundColor = interpolateColor(textColorValue, 0, 100);
    }
    else {
        textes[0].style.backgroundColor = interpolateColor(textColorValue, 0, 100);
    }
}

//math shit to change the rate of color change
function variableRateIncrease(x) {
    const normalizedX = x / 100;
    let y;
    if (normalizedX >= 0 && normalizedX < 0.1) {
        y = 0.4 * 4 * normalizedX * (1 - normalizedX) * 100; // slowest
    } else if (normalizedX >= 0.1 && normalizedX < 0.2 || normalizedX >= 0.8 && normalizedX < 0.9) {
        y = 0.75 * 4 * normalizedX * (1 - normalizedX) * 100; // slower
    } else if (normalizedX >= 0.2 && normalizedX < 0.3 || normalizedX >= 0.7 && normalizedX < 0.8) {
        y = 1 * 4 * normalizedX * (1 - normalizedX) * 100; // faster
    } else {
        y = 1.25 * 4 * normalizedX * (1 - normalizedX) * 100; // fastest
    }
    const roundedY = Math.round(y);
    return roundedY;
}


//holddown shit
var intervalId;

function startColorChange(button) {
    intervalId = setInterval(function () {
        performAction(button);
    }, 100);
}

function stopButtonChange(button) {
    clearInterval(intervalId);
}

let textColorValue = 0;
let final_limiter = 0;
let buffer = 0;
let reset = -10;

function performAction(button) {
    textColorValue = textColorValue + 2;
    reset++;
    if (reset < 0) {
        textColorValue = 0;
    }
    if (textColorValue >= 100 && buffer == 10) {
        textColorValue = 0;
        buffer = 0;
        negCounter = -100;
        reset = -10;
    }
    else if (textColorValue >= 100 && buffer < 10) {
        textColorValue = 100;
        buffer++;
    }
    changeSingleSquare(button);
}

//make a function that makes it so the color of the button background changes color when it is held down.