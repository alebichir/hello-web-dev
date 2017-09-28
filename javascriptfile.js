//DOM
var header = document.getElementById("header");
function changeHeaderColor() {
    header.style.color = "orange";
}
header.onclick = changeHeaderColor;


//Start the numeric puzzle
var numbers = [];
//var tableContent = '';

function newTable() {
    for (var i = 0; i <= 14; i++) {
        setSquare(i);
    }
}

function setSquare(thisSquare, entry) {
    var currSquare = "square" + thisSquare;
    document.getElementById(currSquare).innerHTML = entry;
    //tableContent = this.entry;
}

// for (i = 0; i < 15; ++i) {
//      numbers[i] = i;
// }

//1. ajax - read from a json file
// 2. show numbers
$.ajax('numbers.json').done(function (numbers) {
    console.debug('numbers ', numbers);
    numbers.forEach(setSquare);
    //$("#random-numbers td").html(tableContent);
    $('#random-numbers td').each(function (i) {
        i--;
        $(this).html(numbers[i]);
    });
});


//Mixing numbers inside the table
// function shuffle(array) {
//     var tmp, current, top = array.length;
//     if (top) while (--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//     }
//     return array;
// }
// $.ajax('numbers.json').done(function shuffle(numbers) {
//     var tmp, current, top = numbers.length;
//     if (top) while (--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = numbers[current];
//         numbers[current] = numbers[top];
//         numbers[top] = tmp;
//     }
//     //return numbers;
//     numbers.forEach(setSquare);
//     $('#random-numbers td').each(function (i) {
//         i--;
//         $(this).html(numbers[i]);
//     });
// });


//Start the game
$('#random-numbers').ready(function(){
    $("#start").click(function(){
        $.get('numbers.json',function shuffle(numbers) {
            var tmp, current, top = numbers.length;
            if (top) while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = numbers[current];
                numbers[current] = numbers[top];
                numbers[top] = tmp;
            }
            numbers.forEach(setSquare);
            $('#random-numbers td').each(function (i) {
                i--;
                $(this).html(numbers[i]);
            });
        });
    });
});

//Reset the game
$('#random-numbers').ready(function(){
    $("#reset").click(function(){
        $.get('numbers.json',function (numbers) {
            console.debug('numbers ', numbers);
            numbers.forEach(setSquare);
            //$("#random-numbers td").html(tableContent);
            $('#random-numbers td').each(function (i) {
                i--;
                $(this).html(numbers[i]);
            });
        });
    });
});

// var shuffledNumbers = shuffle(numbers);
//
// function showNumbers(numbers) {
//     for (var i = 0; i < numbers.length; i++) {
//         var entry = numbers[i];
//         setSquare(i, entry);
//     }
// }

//showNumbers(shuffledNumbers);

//console.warn(numbers);


//find empty neighbor cells inside a table and do a move inside the table
$('#random-numbers td').click(clickPeTd);


function clickPeTd() {
    var nr = this.innerHTML;//cell value
    var id = this.id.replace('square', ''); //cell number
    console.info("Clicked cell", this, id, nr);

    var $td = $(this);
    var index = $td.index();
    var $tr = $td.parent();
    var $left = $td.prev(); //find the previous td
    var $right = $td.next();//find the next td
    var $top = $tr.prev().find('td').eq(index);//find the td with the same index in previous row
    var $buttom = $tr.next().find('td').eq(index);//find the td with the same index in next row
    console.info(this, $left, $right, $buttom, $top);

    if ($left.html() == '') {
        console.info($left, 'left');
        $left.html(nr);
        $td.html('');
    } else if ($right.html() == '') {
        console.info($right, 'right');
        $right.html(nr);
        $td.html('');
    } else if ($top.html() == '') {
        console.info($top, 'top');
        $top.html(nr);
        $td.html('');
    } else if ($buttom.html() == '') {
        console.info($buttom, 'buttom');
        $buttom.html(nr);
        $td.html('');
    }
    ;

    if (nr === '') {
        console.info("Clicked cell is empty", this, id, nr);
    } else {
        console.info("Clicked cell is not empty", this, id, nr);
    }

}

// $('#random-numbers td').dblclick(function () {
//     var nr = this.innerHTML;
//     $("td:empty").text(nr);
//     $(this).text('');
//
// });


//verify a quiz
function verify() {
    var q1 = document.querySelector('input[name="q1"]:checked').value;
    var a1 = document.getElementById("q1").value;
    var q2 = document.querySelector('input[name="q2"]').value;
    var a2 = "2";
    var q3 = document.querySelector('input[name="q3"]:checked').value;
    var a3 = document.getElementById("q3").value;
    var q4 = document.querySelector('input[name="q4"]:checked').value;
    var a4 = document.getElementById("q4").value;
    var q5 = document.querySelector('input[name="q5"]').value;
    var a5 = "12";

    if (q1 == a1) {
        alert("Correct answer for question nr. 1!");
    } else {
        alert("Wrong answer for question nr. 1. The correct answer is 12.");
    }

    if (q2 == a2) {
        alert("Correct answer for question nr. 2!");
    } else {
        alert("Wrong answer for question nr. 2. The correct answer is 2.");
    }

    if (q3 == a3) {
        alert("Correct answer for question nr. 3!");
    } else {
        alert("Wrong answer for question nr. 3. The correct answer is 88%.");
    }

    if (q4 == a4) {
        alert("Correct answer for question nr. 4!");
    } else {
        alert("Wrong answer for question nr. 4. The correct answer is 180 degrees.");
    }

    if (q5 == a5) {
        alert("Correct answer for question nr. 5!");
    } else {
        alert("Wrong answer for question nr. 5. The correct answer is 12.");
    }
}


//new-quiz
//quiz generated using https://opentdb.com/api_config.php
function check() {
    var answer = document.querySelector('input[name="answer"]').value;
}




