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

// Получаем значения из скрытых полей
$contact_method = isset($_POST['contact_method']) ? $_POST['contact_method'] : 'Не выбран';
$contact_value = isset($_POST['user_contact_value']) ? $_POST['user_contact_value'] : 'Не указан';

// Формируем тело письма
$body = "Новая заявка на смету\n\n";
$body .= "Выбранный способ связи: " . $contact_method . "\n";
$body .= "Контакт для связи: " . $contact_value . "\n";

// Тема письма
$subject = '=?UTF-8?B?' . base64_encode('Новая заявка на смету - ' . date('d.m.Y H:i')) . '?=';

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
