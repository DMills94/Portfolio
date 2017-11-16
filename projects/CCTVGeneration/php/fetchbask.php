<?php

session_start();

$db = new mysqli("davidjosephmills.co.uk.mysql", "davidjosephmills_co_uk", "PXSbPQAovXdEb8ymRFS4DiS9", "davidjosephmills_co_uk");

$sql = "SELECT basket FROM baskets WHERE
            session = ?";

$stmt = $db -> prepare($sql);

$session = session_id();
$stmt -> bind_param("s", $session);

$stmt -> execute();

if ($db -> error) echo $db -> error;

$stmt -> bind_result($basket);
$stmt -> fetch();

echo $basket;

$db -> close();