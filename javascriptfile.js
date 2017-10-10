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

function manageTd(numbers) {
    $('#random-numbers td').each(function (i) {
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
    // return function (numbers) {
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
    // }
}

//1. ajax - read from a json file
// 2. show numbers
// $.ajax('numbers0.json').done(function (numbers) {
//     console.debug('numbers ', numbers);
//     numbers.forEach(setSquare);
//     manageTd(numbers);
// });

// $.ajax('numbers0.json', {
$.ajax('./list.php', {
    cache: false,
    dataType: 'json'
}).done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    manageTd(numbers);
});

// //Start the game
// $('#random-numbers').ready(function () {
//     $("#start").click(function () {
//         $.get('numbers0.json', shuffle(numbers));
//     });
// });

//Start the game
$('#random-numbers').ready(function () {
    var j = 1;

    // $("#start").click(function () {
    //     $.ajax('numbers' + j + '.json', {
    //         cache: false,
    //         dataType: 'json'
    //     }).done(function (numbers) {
    //         console.debug('numbers ', numbers);
    //         numbers.forEach(setSquare);
    //         manageTd(numbers);
    //         startTimer();
    //         console.info(j);
    //         $("#start").text("Restart level 1");
    //         if(j < 4) {
    //             j++;
    //         } else {
    //             j = 1;
    //         }
    //     });
    // });

    $("#start").click(function () {
        $.ajax('./list.php').done(function (response) {
            var numbers = JSON.parse(response);
            numbers.forEach(setSquare);
            console.debug('shuffle', shuffle(numbers));
            shuffle(numbers);
        });

    });
});


//Reset the game
    $('#random-numbers').ready(function () {
        $("#reset").click(function () {
            $.get('numbers0.json', function (numbers) {
                console.debug('numbers ', numbers);
                numbers.forEach(setSquare);
                manageTd(numbers);
            });
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

        save();
    });


//Stopwatch
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

        this.stop = function () {
            if (timerObj) {
                clearInterval(timerObj);
                timerObj = null;
            }
            return this;
        };

        // start timer using current settings (if it's not already running)
        this.start = function () {
            if (!timerObj) {
                this.stop();
                timerObj = setInterval(fn, t);
            }
            return this;
        };

        // start with new interval, stop current interval
        this.reset = function (newT) {
            t = newT;
            return this.stop().start();
        };
    }




// $.ajax('./list.php').done(function(response) {
//     console.warn('response',JSON.parse(response))
// })


function save() {

    var nrs = [];

    $('#random-numbers td').each(function () {
        var number = this.innerHTML;
        nrs.push(number || 0);
    });

    $.ajax('./save.php', {
        dataType: 'json',
        data: {
            numbers: nrs
        }
    }).done(function (response) {
        console.warn('response', JSON.parse(response))
    })
}
