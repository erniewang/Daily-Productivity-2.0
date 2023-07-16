function split(butt) {
    var parent = butt.parentNode.parentNode;
    var amount = parent.querySelectorAll('textarea');
    if (amount.length > 1) {
        var textArea1 = amount[0];
        var textArea2 = amount[1];
        var textArea = document.createElement('textarea');
        textArea.style.width = '175%';
        textArea1.parentNode.insertBefore(textArea, textArea1);
        textArea1.parentNode.removeChild(textArea1);
        textArea2.parentNode.removeChild(textArea2);
        butt.textContent = 'Split';
    } else {
        var textArea = parent.querySelector('textarea');
        var textArea1 = document.createElement('textarea');
        var textArea2 = document.createElement('textarea');
        textArea1.style.width = '82%';
        textArea2.style.width = '82%';
        textArea.parentNode.insertBefore(textArea1, textArea);
        textArea.parentNode.insertBefore(textArea2, textArea);
        textArea.parentNode.removeChild(textArea);
        butt.textContent = 'Join';
    }
    buttonSplit(parent);
}
//helper function
function buttonSplit(parent) {
    var buttons = parent.querySelectorAll('button');
    if (buttons.length <= 2) {
        var delButton = parent.querySelector('button');
        var string = delButton.textContent;
        string = string.split(' ');
        nstring = string[0].replace(/[\r\n]+/g, "") + " " + string[string.length - 1];
        var newstring = string[0].replace(/[\r\n]+/g, "") + ":30 " + string[string.length - 1];
        var button0 = document.createElement('button');
        button0.onmousedown = function () { startColorChange(this); };
        button0.onmouseup = function () { stopButtonChange(this); };
        button0.textContent = nstring
        button0.style.fontSize = '8px';
        var button30 = document.createElement('button');
        button30.textContent = newstring;
        button30.style.fontSize = '8px';
        button30.onmousedown = function () { startColorChange(this); };
        button30.onmouseup = function () { stopButtonChange(this); };
        delButton.parentNode.insertBefore(button0, delButton);
        delButton.parentNode.insertBefore(button30, delButton);
        delButton.parentNode.removeChild(delButton);
    }
    else {
        var removed = buttons[1];
        removed.remove();
        buttons[0].style.fontSize = '12px';
    }
}
//make it split into 2 different rectangles, each with a button of the time, the time, and the time + 30 minutes
//both functions should change the color accordingly
