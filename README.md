# 📱 Social Media App (Angular)

A modern **Social Media Web Application** built with **Angular 20**, designed to simulate real-world social platforms like Facebook or LinkedIn.
This project focuses on **clean architecture, reactive programming, and smooth user experience**.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* Change Password functionality
* Form validation (Reactive Forms)
* Error handling & feedback
* LocalStorage session management

---

### 📰 Posts System

* Create posts (text + image)
* Edit posts (real-time UI update)
* Delete posts
* View post details in modal
* Bookmark posts

---

### 💬 Comments

* Add comments
* View all comments
* Highlight **Top Comment**
* Dynamic comment updates

---

### ❤️ Interactions

* Like / Unlike posts
* Share posts
* Bookmark system with UI toggle

---

### 🔔 Notifications

* Notifications UI
* Mark as read
* Filter (All / Unread)

---

### 🌐 Multi-language Support

* Translation system using pipes
* Easily extendable for more languages

---

### 🎨 UI/UX

* Built with **Tailwind CSS**
* Icons using **Font Awesome**
* Fully responsive design
* Modern card-based layout
* Modal-based post preview
* Smooth transitions and hover states

---

## 🧠 Technical Highlights

* ⚡ Angular 20 (Standalone Components)
* 🔁 Reactive Forms + Custom Validators
* 📡 REST API Integration
* 🧩 Component-based architecture
* 🔄 Optimistic UI Updates (instant UI changes)
* 📦 Scalable folder structure
* ❌ No Signals (pure RxJS approach)

---

## 🏗️ Project Structure

```
src/
│
├── core/
│   ├── constants/
│   ├── services/
│
├── features/
│   ├── auth/
│   ├── posts/
│   ├── notifications/
│
├── shared/
│   ├── components/
│   ├── models/
│
└── assets/
```

---

## 🔧 Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/social-media-app.git

# Navigate to project
cd social-media-app

# Install dependencies
npm install

# Run the app
ng serve
```

Then open:

```
http://localhost:4200
```

---

## ⚙️ Environment Configuration

Update API endpoints inside:

```
src/app/core/constants/app-apis.ts
```

Example:

```ts
export const App_Apis = {
  auth: {
    register: '/auth/register',
    login: '/auth/login'
  },
  posts: {
    getAll: '/posts',
    create: '/posts',
    update: '/posts/:id'
  }
};
```

---

## 🧪 Validation Features

* Required fields validation
* Email format validation
* Strong password regex:

  * At least 1 uppercase letter
  * At least 1 number
  * At least 1 special character
* Confirm password matching
* Dynamic error messages

---

## 🔥 Advanced Features

* Modal system for post details
* Dynamic class binding (Tailwind + Angular)
* Optimistic updates (no reload needed)
* Reusable components (inputs, comments, posts)
* Clean separation of concerns

---

## 📌 Future Improvements

* 🔄 Real-time updates with WebSockets
* 🖼️ Multiple images per post
* 🧵 Nested comments (replies)
* 🔍 Search & filtering
* 🧠 Global state management (NgRx)

---

## 👨‍💻 Author

**Youssef Shaban**

---

## ⭐ Notes

This project was built as a **practice + portfolio project** to demonstrate:

* Advanced Angular skills
* Clean UI implementation
* Real-world app structure
* Scalable frontend architecture

---

## 📄 License

This project is open-source and available for learning and personal use.
