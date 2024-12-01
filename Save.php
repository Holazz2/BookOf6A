// File submit_post.php (Backend)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $caption = $_POST['caption'];
    $user_id = $_POST['user_id'];
    $image = $_FILES['image']['name'];

    // Upload gambar ke server
    move_uploaded_file($_FILES['image']['tmp_name'], 'uploads/' . $image);

    // Simpan postingan di database
    $query = "INSERT INTO posts (user_id, caption, image_url) VALUES ('$user_id', '$caption', 'uploads/$image')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}