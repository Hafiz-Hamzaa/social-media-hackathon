// Check if user is logged in
const loggedUser = localStorage.getItem("loggedInUser");
if (!loggedUser) {
  window.location.href = "login.html";
}

// Show greeting
document.getElementById("welcome-user").innerText = `Welcome, ${loggedUser}`;

const createPostBtn = document.getElementById("create-post-btn");
const postsFeed = document.getElementById("posts-feed");

// Load posts from localStorage
let allPosts = JSON.parse(localStorage.getItem("posts")) || [];

// Render all saved posts on page load
allPosts.forEach((post) => renderPost(post));

// Save posts array to localStorage
function savePostsToStorage() {
  localStorage.setItem("posts", JSON.stringify(allPosts));
}

// Render a post
function renderPost(postData) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post-item");

  postDiv.innerHTML = `
        <h4>${postData.username}</h4>
        <p>${postData.text}</p>
        ${
          postData.imgURL
            ? `<img src="${postData.imgURL}" alt="Post image">`
            : ""
        }
        <small>${new Date(postData.date).toLocaleString()}</small>
        <div class="post-actions">
            <button class="like-btn">${postData.liked ? "❤️" : "🤍"}</button>
            <span class="like-count">${postData.likes || 0}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn" style="background-color: 'red';" >Delete</button>
        </div>
         <div class="comments-section">
        <h5>Comments</h5>
        <div class="comments-list"></div>
        <input type="text" class="comment-input" placeholder="Write a comment...">
        <button class="add-comment-btn">Add</button>
    </div>
    `;

  postsFeed.prepend(postDiv);

  // Comments functionality
  const commentsList = postDiv.querySelector(".comments-list");
  const commentInput = postDiv.querySelector(".comment-input");
  const addCommentBtn = postDiv.querySelector(".add-comment-btn");

  addCommentBtn.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const commentEl = document.createElement("p");
    commentEl.textContent = commentText;
    commentsList.appendChild(commentEl);

    commentInput.value = "";
  });

  // Optional: Enter key se bhi comment add karna
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addCommentBtn.click();
    }
  });

  // Like button
  const likeBtn = postDiv.querySelector(".like-btn");
  const likeCount = postDiv.querySelector(".like-count");
  likeBtn.addEventListener("click", () => {
    postData.liked = !postData.liked;
    postData.likes = postData.liked
      ? (postData.likes || 0) + 1
      : (postData.likes || 1) - 1;
    likeBtn.textContent = postData.liked ? "❤️" : "🤍";
    likeCount.textContent = postData.likes;
    savePostsToStorage();
  });

  // Delete button
  const deleteBtn = postDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this post?")) {
      postDiv.remove();
      const index = allPosts.indexOf(postData);
      if (index > -1) {
        allPosts.splice(index, 1);
        savePostsToStorage();
      }
    }
  });
}

// Create post button
createPostBtn.addEventListener("click", () => {
  const text = document.getElementById("post-text").value.trim();
  const imgURL = document.getElementById("post-image").value.trim();
  const username = localStorage.getItem("loggedInUser");

  if (!text) {
    alert("Post text cannot be empty!");
    return;
  }

  const newPost = {
    username: username,
    text: text,
    imgURL: imgURL,
    date: new Date().toISOString(),
    liked: false,
    likes: 0,
  };

  allPosts.push(newPost);
  savePostsToStorage();
  renderPost(newPost);

  // Clear inputs
  document.getElementById("post-text").value = "";
  document.getElementById("post-image").value = "";
});

// Search
const searchInput = document.getElementById("search-post");
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll(".post-item").forEach((post) => {
    const username = post.querySelector("h4").textContent.toLowerCase();
    const text = post.querySelector("p").textContent.toLowerCase();
    post.style.display =
      username.includes(query) || text.includes(query) ? "flex" : "none";
  });
});

// Sort
const sortSelect = document.getElementById("sort-posts");
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;
  const postsArray = Array.from(document.querySelectorAll(".post-item"));

  let sortedPosts = postsArray.sort((a, b) => {
    const dateA = new Date(a.querySelector("small").textContent);
    const dateB = new Date(b.querySelector("small").textContent);

    const likesA = parseInt(a.querySelector(".like-count").textContent) || 0;
    const likesB = parseInt(b.querySelector(".like-count").textContent) || 0;

    if (value === "latest") return dateB - dateA;
    if (value === "oldest") return dateA - dateB;
    if (value === "most-liked") return likesB - likesA;
    return 0;
  });

  const feed = document.getElementById("posts-feed");
  sortedPosts.forEach((post) => feed.appendChild(post));
});

// Image upload
const uploadBtn = document.getElementById("upload-btn");
const imageUpload = document.getElementById("post-image-upload");
const postImageInput = document.getElementById("post-image");

uploadBtn.addEventListener("click", () => imageUpload.click());
imageUpload.addEventListener("change", () => {
  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      postImageInput.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Edit Post
const editModal = document.getElementById("edit-modal");
const editText = document.getElementById("edit-post-text");
const editImage = document.getElementById("edit-post-image");
const saveEditBtn = document.getElementById("save-edit-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");

let currentEditingPost = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    currentEditingPost = e.target.closest(".post-item");
    editText.value = currentEditingPost.querySelector("p").textContent;
    const imgEl = currentEditingPost.querySelector("img");
    editImage.value = imgEl ? imgEl.src : "";
    editModal.style.display = "flex";
  }
});

saveEditBtn.addEventListener("click", () => {
  if (!currentEditingPost) return;
  const postIndex = Array.from(postsFeed.children).indexOf(currentEditingPost);
  currentEditingPost.querySelector("p").textContent = editText.value;
  const imgEl = currentEditingPost.querySelector("img");
  if (editImage.value.trim() !== "") {
    if (imgEl) {
      imgEl.src = editImage.value;
    } else {
      const newImg = document.createElement("img");
      newImg.src = editImage.value;
      newImg.alt = "Post image";
      currentEditingPost.insertBefore(
        newImg,
        currentEditingPost.querySelector("small")
      );
    }
  } else if (imgEl) {
    imgEl.remove();
  }

  allPosts[postIndex].text = editText.value;
  allPosts[postIndex].imgURL = editImage.value.trim();
  savePostsToStorage();

  editModal.style.display = "none";
  currentEditingPost = null;
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
  currentEditingPost = null;
});

// Theme toggle
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeIcon.textContent = "☀";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    themeIcon.textContent = "☀";
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
