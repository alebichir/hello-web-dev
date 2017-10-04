//EXEMPLUL NR. 1-Andrei
//DOM
var header = document.getElementById("header");
function changeHeaderColor() {
    header.style.color = "orange";
}
header.onclick = changeHeaderColor;


//Start the numeric puzzle
var numbers = [],
    timer;

function newTable() {
    for (var i = 0; i < 16; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "square" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
    //tableContent = this.entry;
}

function manageTd(numbers) {
    $('#random-numbers td').each(function (i) {
        $(this).html(numbers[i]);

        if (i === 0) {//aici cred ca tre sa fie if($(this).text() === '0') {}
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


$.ajax('numbers.json').done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    manageTd(numbers);
});

//Start the game
$('#random-numbers').ready(function () {
    $("#start").click(function () {
        $.get('numbers.json', shuffle(numbers));
    });
});

//Reset the game
$('#random-numbers').ready(function () {
    $("#reset").click(function () {
        $.get('numbers.json', shuffle(numbers));//aici cred ca tre sa fie $.get('numbers.json', manageTd(numbers));
    });
});

//Find an empty neighbor cell inside a table and do a move
$('#random-numbers td').click(function () {
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

function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

    if (timer) {
        timer.reset(1000);
    } else {
        timer = new Timer(function () {
            setTime();
        }, 1000)
    }

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        }
        else {
            return valString;
        }
    }
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}


//EXEMPLUL NR. 2-Ale
//DOM
var header = document.getElementById("header");
function changeHeaderColor() {
    header.style.color = "orange";
}
header.onclick = changeHeaderColor;


//Start the numeric puzzle
var numbers = [],
    timer;

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
        if ($(this).text() === '0') {
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

                if ($(this).text() === '0') {
                    $(this).text('');
                    $(this).addClass('empty');
                } else {
                    $(this).removeClass('empty');
                }
            });
            startTimer();
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
                if ($(this).text() === '0') {
                    $(this).text('');
                    $(this).addClass('empty');
                } else {
                    $(this).removeClass('empty');
                }
            });
            startTimer();
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
    }
    ;
});


//Start timer
function startTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;

    if (timer) {
        timer.reset(1000);
    } else {
        timer = new Timer(function () {
            setTime();
        }, 1000)
    }

    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        }
        else {
            return valString;
        }
    }
}

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    };

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    };

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}







