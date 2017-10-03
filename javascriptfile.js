//DOM
var header = document.getElementById("header");
function changeHeaderColor() {
    header.style.color = "orange";
}
header.onclick = changeHeaderColor;


//Start the numeric puzzle
var numbers = [];

function newTable() {
    for (var i = 0; i < 16; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "square" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
}


//1. ajax - read from a json file
// 2. show numbers
$.ajax('numbers.json').done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    $('#random-numbers td').each(function (i) {
        $(this).html(numbers[i]);

        if (i === 0) {
            $(this).text('');
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });
});


//Start the game
$('#random-numbers').ready(function () {
    $("#start").click(function () {
        $.get('numbers.json', function shuffle(numbers) {
            var tmp, current, top = numbers.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = numbers[current];
                numbers[current] = numbers[top];
                numbers[top] = tmp;
            }
            numbers.forEach(setSquare);
            $('#random-numbers td').each(function (i) {
                $(this).html(numbers[i]);

                if (i === 0) {
                    $(this).text('');
                    $(this).addClass('empty');
                } else {
                    $(this).removeClass('empty');
                }
            });
        });
    });
});

//Reset the game
$('#random-numbers').ready(function () {
    $("#reset").click(function () {
        $.get('numbers.json', function (numbers) {
            console.debug('numbers ', numbers);
            numbers.forEach(setSquare);
            $('#random-numbers td').each(function (i) {
                $(this).html(numbers[i]);
                if (i === 0) {
                    $(this).text('');
                    $(this).addClass('empty');
                } else {
                    $(this).removeClass('empty');
                }
            });
        });
    });
});


//find empty neighbor cells inside a table and do a move inside the table
$('#random-numbers td').click(function clickPeTd() {
    var nr = this.innerHTML;//cell value
    var id = this.id.replace('square', ''); //cell number
    console.info("Clicked cell", this, id, nr);

    var td = $(this),
        index = td.index(),
        tr = td.parent(),
        left = td.prev(), //find the previous td
        right = td.next(),//find the next td
        top = tr.prev().find('td').eq(index),//find the td with the same index in previous row
        bottom = tr.next().find('td').eq(index);//find the td with the same index in next row

    //console.info(this, left, right, bottom, top);

    if (left.html() == '') {
        left.html(nr);
        td.html('');
        td.addClass('empty');
        left.removeClass('empty');
    } else if (right.html() == '') {
        right.html(nr);
        td.html('');
        td.addClass('empty');
        right.removeClass('empty');
    } else if (top.html() == '') {
        top.html(nr);
        td.html('');
        td.addClass('empty');
        top.removeClass('empty');
    } else if (bottom.html() == '') {
        bottom.html(nr);
        td.html('');
        td.addClass('empty');
        bottom.removeClass('empty');
    };
});









