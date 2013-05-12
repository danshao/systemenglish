 <?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From: systemenglishschool.com Contact Form';
    $to = 'danshao@gmail.com';
    $subject = 'Message from Website Contact Form';

    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

    if ($_POST['submit']) {
        if (mail ($to, $subject, $body, $from)) {
        echo '<p>Message Sent Successfully!</p>';
        } else {
        echo '<p>Ah! Try again, please?</p>';
        }
    }
?>