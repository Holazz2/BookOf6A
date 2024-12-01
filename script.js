// Ambil data dari Local Storage saat halaman dimuat
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser') || null;

// Simpan data ke Local Storage
function saveData() {
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('users', JSON.stringify(users));
  if (currentUser) {
    localStorage.setItem('currentUser', currentUser);
  }
}

// Login atau Register
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please fill in both fields!');
    return;
  }

  if (!users[username]) {
    // Jika pengguna baru, tambahkan ke daftar pengguna
    users[username] = { followers: 0 };
  }

  currentUser = username;
  saveData(); // Simpan data setelah login

  document.getElementById('userDisplay').innerText = currentUser;
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('uploadSection').style.display = 'block';
  showLoggedInSections();
}

// Upload Post
function uploadPost() {
  const content = document.getElementById('content').value;
  const imageFile = document.getElementById('imageUpload').files[0];

  if (!content && !imageFile) {
    alert('Please write something or upload an image!');
    return;
  }

  const newPost = {
    id: posts.length + 1,
    username: currentUser,
    content: content,
    image: imageFile ? URL.createObjectURL(imageFile) : null,
    likes: 0,
    replies: []
  };

  posts.push(newPost);
  saveData(); // Simpan post baru ke Local Storage
  renderPosts();

  // Reset form
  document.getElementById('content').value = '';
  document.getElementById('imageUpload').value = '';
}

// Render Posts
function renderPosts() {
  const postList = document.getElementById('postList');
  postList.innerHTML = '';

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
      <h4 onclick="viewProfile('${post.username}')">${post.username}</h4>
      <p>${post.content}</p>
      ${post.image ? `<img src="${post.image}" alt="User upload">` : ''}
      <div class="post-actions">
        <button onclick="likePost(${post.id})"><i class="fas fa-thumbs-up"></i> Like</button>
        <span>Likes: ${post.likes}</span>
        <button onclick="showReplyPage(${post.id})"><i class="fas fa-reply"></i> Reply</button>
        <span>Replies: ${post.replies.length}</span>
      </div>
    `;

    postList.appendChild(postDiv);
  });
}

// Like Post
function likePost(postId) {
  const post = posts.find(p => p.id === postId);
  post.likes++;
  saveData(); // Simpan perubahan jumlah likes
  renderPosts();
}

// Reply to Post
function submitReply() {
  const replyInput = document.getElementById('replyInput').value;
  const post = posts.find(p => p.id === currentPostId);

  if (replyInput) {
    post.replies.push({ user: currentUser, message: replyInput });
    saveData(); // Simpan reply baru
    document.getElementById('replyInput').value = '';
    showReplyPage(currentPostId);
  }
}

// Logout
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.getElementById('authSection').style.display = 'block';
  document.getElementById('uploadSection').style.display = 'none';
  document.getElementById('searchUserSection').style.display = 'none';
  document.getElementById('ownProfileSection').style.display = 'none';
}

// Tampilkan data awal saat halaman dimuat
window.onload = function() {
  if (currentUser) {
    document.getElementById('userDisplay').innerText = currentUser;
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'block';
    showLoggedInSections();
    renderPosts();
  }
};

// Periksa Status Login di Home Page
if (window.location.pathname === '/home.html') {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'index.html'; // Redirect ke halaman login
  } else {
    document.querySelector('header h1').textContent = `Welcome, ${loggedInUser.username}!`;
  }
}

// Periksa Status Login di Home Page
if (window.location.pathname === '/home.html') {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'index.html'; // Redirect ke halaman login
  } else {
    document.querySelector('header h1').textContent = `Welcome, ${loggedInUser.username}!`;
  }
}


// Cek apakah user sudah login di home.html
if (window.location.pathname === '/home.html') {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser) {
    alert('Anda harus login terlebih dahulu!');
    window.location.href = 'index.html'; // Redirect ke halaman login
  } else {
    document.querySelector('header h1').textContent = `Welcome, ${loggedInUser.username}!`;
  }
}

// Logout Function
function logoutUser() {
  localStorage.removeItem('loggedInUser');
  alert('Anda telah logout.');
  window.location.href = 'index.html'; // Redirect ke halaman login
}

// Periksa apakah pengguna sudah login
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    window.location.href = '/login.html'; // Redirect ke halaman login jika belum login
}

// Fungsi untuk mengambil postingan dari server
fetch('/get_posts')
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <p><strong>${post.username}</strong></p>
                <img src="${post.image_url}" alt="Post Image" />
                <p>${post.caption}</p>
                <p>Likes: ${post.likes_count} | Comments: ${post.comments_count}</p>
            `;
            document.getElementById('posts-container').appendChild(postDiv);
        });
    })
    .catch(error => console.error('Error fetching posts:', error));};
