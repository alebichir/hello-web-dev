//Start the numeric puzzle
var numbers = [],
    timer;

function newTable() {
    for (var i = 0; i < 25; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "sq" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
}

function manageTd(numbers) {
    $('#random-numbers5X5 td').each(function (i) {
        $(this).html(numbers[i]);

        if ($(this).text() === '0') {
            $(this).text("");
            $(this).addClass('empty');
        } else {
            $(this).removeClass('empty');
        }
    });
}

function shuffle(numbers) {
    return function (numbers) {
        var tmp, current, top = numbers.length;
        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = numbers[current];
            numbers[current] = numbers[top];
            numbers[top] = tmp;
        }
        numbers.forEach(setSquare);
        manageTd(numbers);
        startTimer();
    }
}

//1. ajax - read from a json file
// 2. show numbers
// $.ajax('numbers0.json').done(function (numbers) {
//     console.debug('numbers ', numbers);
//     numbers.forEach(setSquare);
//     manageTd(numbers);
// });

$.ajax('numbers5X5.json', {
    cache: false,
    dataType: 'json'
}).done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    manageTd(numbers);
});

//Start the game
$('#random-numbers5X5').ready(function () {
    $("#start").click(function () {
        $.get('numbers5X5.json', shuffle(numbers));
    });
});


//Reset the game
$('#random-numbers5X5').ready(function () {
    $("#reset").click(function () {
        $.get('numbers5X5.json', function (numbers) {
            console.debug('numbers ', numbers);
            numbers.forEach(setSquare);
            manageTd(numbers);
        });
    });
});

//Find an empty neighbor cell inside a table and do a move
$('#random-numbers5X5 td').click(function () {
    var nr = this.innerHTML,
        td = $(this),
        elements = [];

    elements.push(
        td.prev(),
        td.next(),
        td.parent().prev().find('td').eq(td.index()),
        td.parent().next().find('td').eq(td.index())
    );

    elements.forEach(function (element) {
        if (element.html() == '') {
            element.html(nr);
            element.removeClass('empty');
            td.html('');
            td.addClass('empty')
        }
    });
});