function newTable() {
    for (var i=0; i<16; i++) {
       setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "square" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
}

for (var numbers = [], i = 0; i < 15; ++i) {
    numbers[i] = i;
}

console.warn(numbers);

function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}

var shuffledNumbers = shuffle(numbers);

for (var i = 0; i < shuffledNumbers.length; i++) {
    var entry = shuffledNumbers[i];
    setSquare(i, entry);
}


$('table td').click(function () {
    var nr = this.innerHTML;
    var id = this.id.replace('square', '');
    console.info("Handler for .click() called.", this, id, nr);

});