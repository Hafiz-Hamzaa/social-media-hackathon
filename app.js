const formTitle = document.getElementById("form-title");
const toggleForm = document.getElementById("toggle-form");
const submitBtn = document.getElementById("submit-btn");
const message = document.getElementById("message");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// AUTO LOGIN
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
    emailInput.style.display = "none";
    usernameInput.placeholder = "Username or Email";
    document.querySelector(".toggle").innerHTML =
      "Don't have an account? <span id='toggle-form'>Signup</span>";
  } else {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Signup";
    emailInput.style.display = "block";
    usernameInput.placeholder = "Username";
    document.querySelector(".toggle").innerHTML =
      "Already have an account? <span id='toggle-form'>Login</span>";
  }

  message.textContent = "";
  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  document.getElementById("toggle-form").addEventListener("click", toggleFormHandler);
});

function toggleFormHandler() {
  toggleForm.click();
}

document.getElementById("toggle-form").addEventListener("click", toggleFormHandler);

submitBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!username || !password || (!isLogin && !email)) {
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
    // LOGIN → username or email allowed
    const user = users.find(
      (u) =>
        (u.username === username || u.email === username.toLowerCase()) &&
        u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", user.username);
      message.textContent = "Login successful!";
      message.classList.add("success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 800);
    } else {
      message.textContent = "Invalid username/email or password!";
      message.classList.remove("success");
    }
  } else {
    // SIGNUP → check unique username & email
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser) {
      message.textContent = existingUser.username === username
        ? "Username already taken!"
        : "Email already registered!";
      message.classList.remove("success");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Signup successful! Please login.";
    message.classList.add("success");

    setTimeout(() => {
      isLogin = true;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      emailInput.style.display = "none";
      usernameInput.placeholder = "Username or Email";
      message.textContent = "";
      usernameInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
      document.querySelector(".toggle").innerHTML =
        "Don't have an account? <span id='toggle-form'>Signup</span>";
    }, 800);
  }
});
