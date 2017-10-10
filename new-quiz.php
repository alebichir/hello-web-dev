<!DOCTYPE html>
<html>
<head>
    <title>NUMERIC PUZZLE</title>
    <link rel="stylesheet" type="text/css" href="style.css">
<!--    <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet">-->
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        //new-quiz
        //quiz generated using https://opentdb.com/api_config.php
        function check() {
            var answer = document.querySelector('input[name="answer"]').value;
        }
    </script>

</head>
<body>

<div id="layout">
    <header>
        <div>
            <h1 id="header">NUMERIC PUZZLE</h1>
        </div>
    </header>
    <br/>

    <div id="top-menu">
        <div>
            <ul>
                <li><a href="index.html" title="Welcome home" class="tm">HOME</a></li>
                <li><a href="puzzle3X3.html" title="Puzzle 3X3" class="tm">PUZZLE 3X3</a></li>
                <li><a href="numbers.html" title="Play with numbers" class="tm">PUZZLE 4X4</a></li>
                <li><a href="puzzle5X5.html" title="Play with numbers" class="tm">PUZZLE 5X5</a></li>
                <li><a href="old-quiz.html" title="Old quiz" class="tm">OLD QUIZ</a></li>
                <li><a href="new-quiz.php" title="New quiz" class="tm">NEW QUIZ</a></li>
            </ul>
        </div>
    </div>
    <br/>

    <div id="content">
        <div id="welcome-msg">NEW QUIZ</div>
        <br>
        <?php
        $json = file_get_contents("questions.json");
        $data = json_decode($json);
        if (count($data)) {
            // Open the list of questions
            echo "<div>";

            // Cycle through the array
            foreach ($data->results as $id => $results) {

                // Output a paragraph
                echo "<p>$results->question</p>";
                echo "<p><input type='radio' name='answer'> $results->correct_answer</p>";

                //put here radio buttons for incorrect answers
            }

            // Close the list of questions
            echo "</div>";
        }
        ?>

        <button onclick="check()">Check your quiz!</button>
    </div>

    <div class="clear"></div>

    <footer>
        <p>&copy; 2017 NUMERIC PUZZLE. All rights reserved.</p>
    </footer>
</div>
<!--<script src="javascriptfile.js"></script>-->
</body>
</html>