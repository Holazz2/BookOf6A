// PHP (Contoh sederhana untuk memeriksa sesi)
$session_token = $_COOKIE['session_token'];
$query = "SELECT * FROM sessions WHERE session_token = '$session_token' AND expires_at > NOW()";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // Sesi masih valid
    $session_data = mysqli_fetch_assoc($result);
    $user_id = $session_data['user_id'];
} else {
    // Sesi sudah kadaluarsa
    echo "Sesi kadaluarsa, silakan login kembali.";
    header("Location: login.php");
}