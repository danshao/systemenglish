<?php
    if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
        die('Error: Missing variables');
    }

    $name=$_POST['name'];
    $email=$_POST['email'];
    $message=$_POST['message'];
    $to='danshao@gmail.com';
    $headers = 'From: '.$email."\r\n" .
        'Reply-To: '.$email."\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $subject = "Contact Form";
    $body='You have got a new message from the contact form on your website.'."\n\n";
    $body.='Name: '.$name."\n";
    $body.='Email: '.$email."\n";
    $body.='Message: '."\n".$message."\n";

    if(mail($to, $body, $headers)) {
        die('Mail sent');
    } else {
        die('Error: Mail failed');
    }
?>