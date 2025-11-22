const formTitle = document.getElementById("form-title");
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

// AUTO LOGIN → agar user pehle login tha to dashboard.html par bhej do
const autoUser = localStorage.getItem("loggedInUser");
if (autoUser) {
  window.location.href = "dashboard.html";
}

let isLogin = true; // toggle state

toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    document.querySelector(".toggle").innerHTML =
      "Don't have an account? <span id='toggle-form'>Signup</span>";
  } else {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Signup";
    document.querySelector(".toggle").innerHTML =
      "Already have an account? <span id='toggle-form'>Login</span>";
  }

  message.textContent = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document
    .getElementById("toggle-form")
    .addEventListener("click", toggleFormHandler);
});

function toggleFormHandler() {
  toggleForm.click();
}

document
  .getElementById("toggle-form")
  .addEventListener("click", toggleFormHandler);

submitBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    message.textContent = "Please fill all fields!";
    message.classList.remove("success");
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters!";
    message.classList.remove("success");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    // LOGIN
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", username);
      message.textContent = "Login successful!";
      message.classList.add("success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    } else {
      message.textContent = "Invalid username or password!";
      message.classList.remove("success");
    }
  } else {
    // SIGNUP
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
      message.textContent = "Username already taken!";
      message.classList.remove("success");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Signup successful! Please login.";
    message.classList.add("success");

    // DO NOT auto-login → show login form
    setTimeout(() => {
      isLogin = true;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      document.querySelector(".toggle").innerHTML =
        "Don't have an account? <span id='toggle-form'>Signup</span>";
      message.textContent = "";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }, 800);
  }
});
