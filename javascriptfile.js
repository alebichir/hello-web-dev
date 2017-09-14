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

//console.warn(numbers);

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


$('#random-numbers td').click(function () {
    var nr = this.innerHTML;
    var id = this.id.replace('square', '');
    console.info("Clicked cell", this, id, nr);

    var $td = $(this);
    var index = $td.index(), $tr =$td.parent();
    var $nbrs = $td.prev(); //find the previous td
    $nbrs = $nbrs.add($td.next());//find the next td
    $nbrs = $nbrs.add($tr.prev().find('td').eq(index));//find the td with the same index in previous row
    $nbrs = $nbrs.add($tr.next().find('td').eq(index));//find the td with the same index in next row
    console.log($nbrs.get());

if (nr === '') {
    console.info("Clicked cell is empty", this, id, nr);
    } else {
    console.info("Clicked cell is not empty", this, id, nr);
};

$("td:empty").text(nr);
$(this).text('');

});






