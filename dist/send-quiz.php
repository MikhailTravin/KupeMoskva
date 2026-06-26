<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	echo json_encode(['success' => false, 'message' => 'Только POST запросы']);
	exit;
}

// Email получателя
$to_email = 'Kupemoskva@yandex.ru';

// Собираем данные
$body = "Новая заявка с квиза\n\n";

if (isset($_POST['location']) && !empty($_POST['location'])) {
	$body .= 'Где будет шкаф: ' . $_POST['location'] . "\n";
}

if (isset($_POST['size']) && !empty($_POST['size'])) {
	$body .= 'Размеры: ' . $_POST['size'] . "\n";
}

if (isset($_POST['facade']) && !empty($_POST['facade'])) {
	$body .= 'Фасады: ' . $_POST['facade'] . "\n";
}

if (isset($_POST['telegram']) && !empty($_POST['telegram'])) {
	$body .= 'Telegram: ' . $_POST['telegram'] . "\n";
}

if (isset($_POST['max_name']) && !empty($_POST['max_name'])) {
	$body .= 'Max: ' . $_POST['max_name'] . "\n";
}

if (isset($_POST['phone']) && !empty($_POST['phone'])) {
	$body .= 'Телефон: ' . $_POST['phone'] . "\n";
}

if (empty($_POST) || strlen($body) < 50) {
	$body .= "Дополнительная информация\n";
	$body .= "POST данные: " . print_r($_POST, true);
}

// Тема письма
$subject = '=?UTF-8?B?' . base64_encode('Новая заявка с квиза - ' . date('d.m.Y H:i')) . '?=';

// Заголовки письма
$headers = "From: noreply@kupemoskva.ru\r\n";
$headers .= "Reply-To: noreply@kupemoskva.ru\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Отправка письма
if (mail($to_email, $subject, $body, $headers)) {
	echo json_encode(['success' => true, 'message' => 'Данные успешно отправлены!']);
} else {
	// Логируем ошибку
	error_log("Ошибка отправки письма на $to_email");
	error_log("POST данные: " . print_r($_POST, true));

	echo json_encode([
		'success' => false,
		'message' => 'Ошибка отправки письма. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
	]);
}
