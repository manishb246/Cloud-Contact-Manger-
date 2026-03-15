## 📁 Project Structure

```
src/
├── App.jsx                  ← Main application component handling page routing and state
├── index.jsx                ← Application entry point
├── index.css                ← TailwindCSS imports and global styles
│
├── components/
│   ├── Navbar.jsx           ← Top navigation bar component
│   └── ContactCard.jsx      ← Individual contact card with view/edit/delete actions
│
└── pages/
    ├── PhoneDirectory.jsx   ← Displays contact list with search functionality
    ├── CreateContact.jsx    ← Form to create a new contact
    ├── ViewContact.jsx      ← Displays detailed contact information
    └── UpdateContact.jsx    ← Form to update contact with live avatar preview
```

---

# ⚙️ Setup & Installation

Follow these steps to run the frontend application locally.

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

# 🔌 Connecting Your Backend

All backend integration points are marked with **`// TODO:` comments** inside `App.jsx`.

This is where you will connect your **Spring Boot REST APIs**.

---

# 📡 API Integration Examples

### 🔹 Load Contacts (READ)

```jsx
useEffect(() => {
  fetch("/api/contacts")
    .then(res => res.json())
    .then(data => setContacts(data));
}, []);
```

---

### 🔹 Create Contact (CREATE)

```jsx
onSubmit={(formData) => {
  fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(() => {
    // Refresh contacts after creating
  });
}}
```

---

### 🔹 Update Contact (UPDATE)

```jsx
onSubmit={(formData) => {
  fetch(`/api/contacts/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }).then(() => {
    // Refresh contacts after updating
  });
}}
```

---

### 🔹 Delete Contact (DELETE)

```jsx
onDelete={(id) => {
  fetch(`/api/contacts/${id}`, {
    method: "DELETE"
  }).then(() => {
    // Refresh contacts after deleting
  });
}}
```

---

# 📦 Form Data Structure

All forms return a **JavaScript object** with the following structure:

```js
{
  id,       // Available only when updating a contact
  name,
  photo,    // URL string for avatar
  mobile,
  email,
  company,
  title,
  group
}
```

---

# 📄 Pages Overview

| Page | Component | Description |
|-----|-----|-----|
| Phone Directory | `PhoneDirectory.jsx` | Displays all contacts and allows searching |
| Create Contact | `CreateContact.jsx` | Blank form used to add a new contact |
| View Contact | `ViewContact.jsx` | Displays contact details in read-only mode |
| Update Contact | `UpdateContact.jsx` | Editable contact form with live avatar preview |

---

# 🎨 UI Features

- Responsive design using **TailwindCSS**
- Contact **search functionality**
- **Live avatar preview** while editing
- Clean **component-based architecture**
- Easy **Spring Boot API integration**

---

# 🔮 Future Improvements

- Authentication (JWT / Clerk / OAuth)
- Contact groups management
- Pagination
- Image upload instead of URL
- Cloud deployment (AWS / Docker)

---

# 👨‍💻 Author

**Manish Bachhav**

GitHub:  
`https://github.com/your-username`

---

⭐ If you like this project, consider **starring the repository**!
