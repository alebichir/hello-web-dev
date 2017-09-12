//window.onload = newTable;

function newTable() {
    for (var i=0; i<16; i++) {
       setSquare(i);
    }
}

function setSquare(thisSquare) {
    var currSquare = "square" + thisSquare;
    var newNum = Math.floor(Math.random() * 15) + 1;

    document.getElementById(currSquare). innerHTML = newNum;
}