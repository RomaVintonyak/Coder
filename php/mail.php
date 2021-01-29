<?php
$email = trim(strip_tags($_POST['mail']));
$message = '<h3 style="margin: 0; padding: 0; font-size: 18px; font-weight: 700">Дані повідомлення:</h3>'.'<br/>';
$message .= '<span style="margin: 0; padding: 0; font-size: 14px; font-weight: 700; color: #896052">Ім`я: </span>'.'<strong>'.trim(strip_tags($_POST['name'])).'</strong>'.'<br/>';
$message .= '<span style="margin: 0; padding: 0; font-size: 14px; font-weight: 700; color: #896052">Прізвище: </span>'.'<strong>'.trim(strip_tags($_POST['lastName'])).'</strong>'.'<br/>';
$message .= '<span style="margin: 0; padding: 0; font-size: 14px; font-weight: 700; color: #896052">Телефон: </span>'.'<strong>'.'<a href="tel:'.trim(strip_tags($_POST['phone'])).'">'.trim(strip_tags($_POST['phone'])).'</a>'.'</strong>'.'<br/>';
$message .= '<span style="margin: 0; padding: 0; font-size: 14px; font-weight: 700; color: #896052">Email адреса: </span>'.'<strong>'.trim(strip_tags($_POST['mail'])).'</strong>'.'<br/>';
$message .= '<span style="margin: 0; padding: 0; font-size: 14px; font-weight: 700; color: #896052">Текст повідомлення: </span>'.'<strong>'.trim(strip_tags($_POST['message'])).'</strong>'.'<br/>';

$subject = "=?utf-8?B?".base64_encode("Повідомлення із сайту Coder Studio Development")."?=";
$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n"."X-Mailer: PHP/".phpversion();

$success = mail("loren.decor@ukr.net", $subject, $message, $headers);
echo "Thank you for writing to us";
?>