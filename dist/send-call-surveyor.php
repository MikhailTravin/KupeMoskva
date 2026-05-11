<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Данные для входа в Gmail
$smtp_email = 'mikhail.travin@gmail.com';
$smtp_password = 'pogvnnfcuvruxrll';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	echo json_encode(['success' => false, 'message' => 'Только POST запросы']);
	exit;
}

$phpmailer_path = __DIR__ . '/PHPMailer/';

$required_files = [
	$phpmailer_path . 'src/Exception.php',
	$phpmailer_path . 'src/PHPMailer.php',
	$phpmailer_path . 'src/SMTP.php'
];

foreach ($required_files as $file) {
	if (!file_exists($file)) {
		echo json_encode(['success' => false, 'message' => 'Не найден файл: ' . basename($file)]);
		exit;
	}
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require $phpmailer_path . 'src/Exception.php';
require $phpmailer_path . 'src/PHPMailer.php';
require $phpmailer_path . 'src/SMTP.php';

// Собираем данные только с нужных полей
$body = "Заявка на вызов замерщика\n\n";

if (isset($_POST['name']) && !empty($_POST['name'])) {
	$body .= 'Имя: ' . $_POST['name'] . "\n";
}

if (isset($_POST['phone']) && !empty($_POST['phone'])) {
	$body .= 'Телефон: ' . $_POST['phone'] . "\n";
}

if (empty($_POST['name']) && empty($_POST['phone'])) {
	$body .= "Данные не получены\n";
	$body .= "POST данные: " . print_r($_POST, true);
}

// Настройка и отправка
$mail = new PHPMailer(true);

try {
	// Настройки сервера
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = $smtp_email;
	$mail->Password = $smtp_password;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
	$mail->Port = 587;
	$mail->CharSet = 'UTF-8';

	$mail->SMTPOptions = [
		'ssl' => [
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true
		]
	];

	$mail->setFrom($smtp_email, 'Заявка с сайта');
	$mail->addAddress($smtp_email);
	$mail->addReplyTo($smtp_email, 'Заявка с сайта');

	$mail->isHTML(false);
	$mail->Subject = '=?UTF-8?B?' . base64_encode('Заявка на вызов замерщика - ' . date('d.m.Y H:i')) . '?=';
	$mail->Body = $body;

	$mail->send();
	$response = ['success' => true, 'message' => 'Данные успешно отправлены!'];
} catch (Exception $e) {
	$error = $mail->ErrorInfo;

	if (strpos($error, 'authenticate') !== false || strpos($error, 'password') !== false) {
		try {
			$mail2 = new PHPMailer(true);
			$mail2->isSMTP();
			$mail2->Host = 'smtp.gmail.com';
			$mail2->SMTPAuth = true;
			$mail2->Username = $smtp_email;
			$mail2->Password = $smtp_password;
			$mail2->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
			$mail2->Port = 465;
			$mail2->CharSet = 'UTF-8';

			$mail2->SMTPOptions = [
				'ssl' => [
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true
				]
			];

			$mail2->setFrom($smtp_email, 'Заявка с сайта');
			$mail2->addAddress($smtp_email);
			$mail2->isHTML(false);
			$mail2->Subject = '=?UTF-8?B?' . base64_encode('Новая заявка - ' . date('d.m.Y H:i')) . '?=';
			$mail2->Body = $body;

			$mail2->send();
			$response = ['success' => true, 'message' => 'Данные успешно отправлены!'];
		} catch (Exception $e2) {
			$response = [
				'success' => false,
				'message' => 'Ошибка отправки: ' . $e2->getMessage(),
				'error_details' => 'Проверьте пароль приложения Gmail и настройки безопасности'
			];
		}
	} else {
		$response = [
			'success' => false,
			'message' => 'Ошибка SMTP: ' . $error,
			'error_details' => 'Проверьте подключение к интернету и настройки SMTP'
		];
	}
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response, JSON_UNESCAPED_UNICODE);
