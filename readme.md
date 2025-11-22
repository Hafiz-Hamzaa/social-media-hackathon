# 🖥️ Social Dashboard / Mini Social App

> A **modern, interactive social dashboard** where users can create, like, comment, and manage posts with **dark/light theme support**. Built purely with **HTML, CSS, and JavaScript**.

---

## 🚀 Project Overview
This is a **mini social media dashboard** for learning and demonstration purposes. Users can:

- 📝 Create **text and image posts**  
- ✏️ **Edit or delete** their own posts  
- ❤️ **Like posts** and see live like counts  
- 💬 **Comment** on posts  
- 🔍 **Search and sort** posts  
- 🌙☀️ **Toggle between dark and light modes**  
- 🔑 **Login/Signup flow** with `localStorage` for user persistence  

This project runs fully in the browser — **no backend needed**.

---

## 🔑 Features

### **1. User Authentication**
- **Login / Signup:** Register new users or login existing ones  
- **Auto-login:** Redirects logged-in users directly to the dashboard  
- **Validation:** Checks empty fields, password length, and unique usernames  

### **2. Post Management**
- 🆕 **Create Post:** Add text and optional image  
- ✏️ **Edit Post:** Update text or image using a modal popup  
- 🗑️ **Delete Post:** Remove posts with a confirmation dialog  

### **3. Likes & Comments**
- ❤️ **Like Posts:** Toggle like/unlike and update counts  
- 💬 **Comments:** Add comments under each post, supports **Enter key**  

### **4. Search & Sort**
- 🔍 **Search Posts:** Filter posts by username or content dynamically  
- 📊 **Sort Posts:**  
  - Latest  
  - Oldest  
  - Most liked  

### **5. Theme Toggle**
- 🌙 **Dark Mode / Light Mode** toggle  
- 💾 **Persistent:** Saves preference in `localStorage`  

### **6. Logout**
- 🔓 Logout and return to login page

---

## 🛠️ Tech Stack
- **Languages:** HTML, CSS, JavaScript  
- **Data Storage:** `localStorage`  
- **UI Design:** Custom CSS with responsive layout  
- **Extras:** Emojis for likes/comments, modal for edit  

---

## 📂 Project Structure

/project-folder
│
├─ index.html # Login / Signup page
├─ dashboard.html # Main social dashboard
├─ style.css # Styles & theme variables
├─ script.js # JavaScript functionality
├─ assets/ # Images & icons
└─ README.md # Project documentation


---

## 🎨 Screenshots

### **Login / Signup**
![Login Screenshot](path-to-screenshot)

### **Dashboard**
![Dashboard Screenshot](path-to-screenshot)

### **Dark / Light Mode**
![Dark Mode](path-to-screenshot)  
![Light Mode](path-to-screenshot)

---

## ⚙️ How It Works

### **Login Flow**
1. User opens **login page**  
2. If registered → enters credentials → redirected to dashboard  
3. If new → signup → credentials stored in `localStorage`  

### **Post Flow**
1. Add post text + image → appears instantly  
2. Edit/Delete post → changes reflected in feed and `localStorage`  
3. Like button → updates count  
4. Comment input → supports **Enter key**  

### **Theme Flow**
1. Click **theme toggle button** → switch between dark/light  
2. Preference stored in `localStorage` → persists after refresh  

---

## ✅ How to Use / Demo
1. Open `index.html` in the browser  
2. Sign up or login  
3. Start creating, liking, commenting, editing posts  
4. Use search/sort for easy navigation  
5. Toggle dark/light theme  
6. Logout when done  

---

## 💡 Future Enhancements
- Add **user profile pictures**  
- Implement **real backend** with database  
- Notifications for likes/comments  
- Share posts to social platforms  
- Add **hashtags & trending posts**  

---

## 👨‍💻 Author
**Muhammad Hamza**  
- Passionate Front-End Developer  
- Focused on **clean, interactive UI/UX projects**  

---

## 📜 License
MIT License © 2025

---

## ✨ Badges / Highlights
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![LocalStorage](https://img.shields.io/badge/LocalStorage-FF6F61?style=flat-square)
