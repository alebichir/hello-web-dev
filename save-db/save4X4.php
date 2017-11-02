<?php
include "db-connect.php";
if(isset($_GET["numbers"])) {
    $numbers = json_encode($_GET["numbers"]);
    $sql = "UPDATE puzzle SET numbers='$numbers' WHERE id = 4";
    $conn->query($sql);
}
$conn->close();
?>