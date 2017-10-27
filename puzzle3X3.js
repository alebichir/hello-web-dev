//Start the numeric puzzle
var numbers = [];
// var correctAnswer = ["0","1","2","3","4","5","6","7","8"];
var correctAnswer = [0,1,2,3,4,5,6,7,8];

function newTable() {
    for (var i = 0; i < 9; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "sqa" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
}

function manageTd(numbers) {
    $('#random-numbers3X3 td').each(function (i) {
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
    // }
}

$.ajax('./list3X3.php', {
    cache: false,
    dataType: 'json'
}).done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    manageTd(numbers);
});

//Start the game
$('#random-numbers3X3').ready(function () {
    $("#start").click(function () {
        $.ajax('./list3X3.php').done(function (response) {
            var numbers = JSON.parse(response);
            numbers.forEach(setSquare);
            console.debug('shuffle', shuffle(numbers));
            shuffle(numbers);
        });

    });
});


//Reset the game
$('#random-numbers3X3').ready(function () {
    $("#reset").click(function () {
        $.get('numbers3X3.json', function (numbers) {
            console.debug('numbers ', numbers);
            numbers.forEach(setSquare);
            manageTd(numbers);
        });
    });
});

//Find an empty neighbor cell inside a table and do a move
$('#random-numbers3X3 td').click(function () {
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

function save() {

    var nrs = [];
    var id = 3;

    $('#random-numbers3X3 td').each(function () {
        var number = this.innerHTML;
        nrs.push(number || 0);
    });

    $.ajax('./save3X3.php', {
        dataType: 'json',
        data: {
            numbers: nrs
        }
    }).done(function (response) {
        console.warn('response', JSON.parse(response))
    })
}

if (numbers === correctAnswer) {
    alert("Congratulations you solve the puzzle");
}

//Stopwatch
// Setting the variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var len, str;
var interavel;

// time interavel
function timeSetting(sec) {
    seconds += 1;
    str = seconds.toString();
    len = str.length;

    if (len < 2){
        document.getElementById('seconds').innerHTML = '0'+seconds;
    } else {
        if(seconds == 60){

            seconds = 0;
            minutes += 1;
            str = minutes.toString();
            len = str.length;

            if(len < 2){
                document.getElementById('seconds').innerHTML = '0'+seconds;
                document.getElementById('minutes').innerHTML = '0'+minutes;
            } else {
                if (minutes == 60){

                    minutes = 0;
                    hours += 1;
                    str = hours.toString();
                    len = str.length;

                    if (len < 2){
                        document.getElementById('seconds').innerHTML = '0'+seconds;
                        document.getElementById('minutes').innerHTML = '0'+minutes;
                        document.getElementById('hours').innerHTML = '0'+ hours;
                    } else {
                        if(hours == 24) {
                            hours = 0
                            document.getElementById('seconds').innerHTML = '0'+seconds;
                            document.getElementById('minutes').innerHTML = '0'+minutes;
                            document.getElementById('hours').innerHTML = '0'+ hours;
                        } else {
                            document.getElementById('seconds').innerHTML = '0'+seconds;
                            document.getElementById('minutes').innerHTML = '0'+minutes;
                            document.getElementById('hours').innerHTML = hours;
                        }
                    }

                } else {
                    document.getElementById('seconds').innerHTML = '0'+seconds;
                    document.getElementById('minutes').innerHTML = minutes;
                }
            }

        } else {
            document.getElementById('seconds').innerHTML = seconds;
        }
    }

}


document.getElementById('start').onclick = function() {
    interavel = setInterval(timeSetting, 1000);
};


// document.getElementById('stop').onclick = function() {
//     clearInterval(interavel);
// };


document.getElementById('reset').onclick = function() {
    clearInterval(interavel);

    seconds = 0;
    minutes = 0;
    hours = 0;

    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('hours').innerHTML = '00';
};