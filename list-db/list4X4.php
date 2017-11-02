<?php
include "db-connect.php";
$sql = "SELECT * FROM puzzle WHERE id = 4";
$result = $conn->query($sql);
$numbers = '';
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $numbers = $row["numbers"];
    }
}
$conn->close();
echo $numbers;
?>
