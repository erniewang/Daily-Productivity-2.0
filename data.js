//Convert to the hex thing because javascript is complete dogshit 
function rgbToHex(rgb) {
    // Parse the RGB values from the input string
    const values = rgb.match(/\d+/g);
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);

    // Convert the RGB values to hexadecimal
    const hex = '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');

    return hex;
}

class textBox {
    constructor(boxNumber, inputString) {
        if (inputString != null) {
            this.alternateConstructor(boxNumber, inputString);
            return;
        }
        //bpx
        this.boxNumber = parseInt(boxNumber);
        let box = document.getElementById(boxNumber);
        //get the time
        let buttonList = box.querySelectorAll('button');
        this.times = 0;
        let realtime = buttonList[0].textContent.replace(/\s/g, "");
        let numero = parseInt(realtime.replace(/(am|pm)/i, ""))

        if (realtime.slice(-2) == "pm") {
            this.times = numero + 12;
        }
        else {
            this.times = numero;
        }

        this.secondBox = false;
        if (buttonList.length > 2) {
            this.secondBox = true;
        }


        //getting the tangiable score
        let data = box.querySelectorAll('textarea');
        this.boxData = "";
        let count = 0;
        data.forEach((node) => {
            if (count > 0) {
                this.boxData = this.boxData + "--" + node.value;
            }
            else {
                this.boxData = this.boxData + node.value;
                count++;
            }
        });

        //declare the scores
        let score1 = parseInt(box.querySelector('#colorScore').textContent) || 0;
        let score2 = parseInt(box.querySelector('#colorScore2').textContent) || 0;

        this.secondscore = score2 || 0;

        //checking if thecolors are gray
        let bgColor1 = rgbToHex(window.getComputedStyle(data[0]).backgroundColor);
        if (bgColor1 == '#bab0b0') {
            score1 = -1;
        }
        this.score = score1;
        let bgColor2;

        //if it i in split mode
        if (this.secondBox == true) {
            bgColor2 = rgbToHex(window.getComputedStyle(data[1]).backgroundColor);
            if (bgColor2 == '#bab0b0') {
                score2 = -1;
                this.secondscore = -1;
            }
        }
        else {
            return;
        }
    }
    //how will i be able to update the colors scores of all the boxes? that means i must have access to textareascore global variable
    serializeData() {
        let dataString = this.boxNumber + "|" + this.times + "|" + this.score + "|" + this.secondBox + "|" + this.boxData + "|" + this.secondscore;
        return dataString;
    }

    //alternate constructor
    alternateConstructor(boxNumber, inputString) {
        inputString = inputString.split("|");
        this.boxNumber = boxNumber;
        this.times = parseInt(inputString[1]);
        this.score = parseInt(inputString[2]);
        this.secondBox = JSON.parse(inputString[3]);
        this.boxData = inputString[4].split("--");
        this.secondscore = inputString[5];
    }

    //HARD ONE
    updateBox() {
        let box = document.getElementById(this.boxNumber);
        let buttonlest = box.querySelectorAll('button');
        let textlest;
        if (this.secondBox == true) {
            split(buttonlest[1]);
            textlest = box.querySelectorAll('textarea');
            textlest[1].textContent = this.boxData[1];
            textColorValue = parseInt(this.secondscore);
            //refresh
            buttonlest = box.querySelectorAll('button');
            if (this.secondscore != -1) {
                changeSingleSquare(buttonlest[1]);
            }
        }
        textlest = box.querySelector('textarea');
        textlest.textContent = this.boxData[0];
        textColorValue = parseInt(this.score);
        buttonlest = box.querySelector('button');
        if (this.score != -1) {
            changeSingleSquare(buttonlest);
        }
    }
    calculateTrueBoxScore() {
    }
}
var allBoxInfo;

//save button to save ALL of the shit, the next step is to figure out how to turn all the shit back into a readable shit 
function save() {
    allBoxInfo = [];
    let NEWBOX;
    for (let i = 0; i < 24; i++) {
        NEWBOX = new textBox(i);
        allBoxInfo.push(NEWBOX.serializeData());
    }
    allBoxInfo = allBoxInfo.join('^');
    console.log("saving data", allBoxInfo);
    return;
}

//upload string to use as a alternate constructor 

var boxList = [];
function uploadString() {
    const STRING = prompt("Paste your data in here");
    let inputString = STRING.split('^');
    let uploadedSingle = new textBox(0, inputString[0]);
    let tim = uploadedSingle.times;
    if (tim == 24) {
        tim = tim - 12;
    }
    changetime(tim);
    for (let i = 1; i < 24; i++) {
        uploadedSingle = new textBox(i, inputString[i]);
        uploadedSingle.updateBox();
        boxList.push(uploadedSingle)
    }
}