<?php

session_start();

$db = new mysqli("davidjosephmills.co.uk.mysql", "davidjosephmills_co_uk", "PXSbPQAovXdEb8ymRFS4DiS9", "davidjosephmills_co_uk");

$sql = "INSERT INTO baskets
            (session, basket) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE
            session = VALUES(session),
            basket = VALUES(basket)";

$stmt = $db -> prepare($sql);

$null = null;
$session = session_id();
$stmt -> bind_param("sb", $session, $null);

$basket = $_POST["basket"];

$stmt -> send_long_data(1, $basket);
$stmt -> execute();

if ($db -> error) echo $db -> error;

$db -> close();