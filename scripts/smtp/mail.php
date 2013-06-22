<?php
	/*
	 * If you need to authenticate using SMTP, use this in place of the mail.php file.
	 * You'll need to configure the SMTP connection to a valid email account.
	 * PEAR is required to use this method.
	 */

	// Require PEAR mailer
	require_once "Mail.php";

	// Success message
	$success 	= "Your message successfully sent!";

	// Setup basic mail information
	$from 		= "Jane Smith <from@example.com>";
	$to 		= "John Smith <to@example.com>";
	$subject 	= "Contact Form Submission";

	// SMTP connection
	$host 		= "smtp.domain.com";
	$username 	= "example@domain.com";
	$password 	= "password";

	// Setup mail headers
	$headers = array (
		'From' 			=> $from,
		'To' 			=> $to,
		'Subject' 		=> $subject,
		'Content-Type'	=> 'text/html; charset=iso-8859-1'
	);

	// Authenticate with SMTP
	$smtp = Mail::factory('smtp',
	array ('host' => $host,
		'auth' => true,
		'username' => $username,
		'password' => $password)
	);

	// Construct the basic HTML for the message
	$head = "<html><body>";
	$table_start = "<table border='1' width='100%'><td align='center'><strong>Field</strong></td><td align='center'><strong>Value</strong></td>";

	// Fetch all the form fields and their values
	$text = "";
	foreach($_POST as $name => $value) {
		$text .= "<tr><td>$name</td><td>$value</td></tr>";
	}

	// End the table and add extra footer information
	$table_end = "</table>";
	$info = "<br />Message sent from: ".$_SERVER['SERVER_NAME'];
	$footer = "</body></html>";

	// Combine all the information
	$body = "$head $table_start $text $table_end $info $footer";

	$mail = $smtp->send($to, $headers, $body);

	// Return success or failure message
	if (PEAR::isError($mail)) {
		echo("<p>" . $mail->getMessage() . "</p>");
	} else {
		echo($success);
	}
?>