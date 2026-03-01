# React PhoneDir

A React + Tailwind CSS Phone Directory app. UI-only — wired up for you to plug in your own backend.

## Project Structure

```
src/
├── App.jsx                  ← Main app with page routing (state-based)
├── index.jsx                ← Entry point
├── index.css                ← Tailwind imports
├── components/
│   ├── Navbar.jsx           ← Top navigation bar
│   └── ContactCard.jsx      ← Individual contact card (view/edit/delete buttons)
└── pages/
    ├── PhoneDirectory.jsx   ← Contact list with search
    ├── CreateContact.jsx    ← Create contact form
    ├── ViewContact.jsx      ← Contact detail view
    └── UpdateContact.jsx    ← Edit contact form (with live avatar preview)
```

## Setup

```bash
npm install
npm run dev
```

## Connecting Your Backend

All backend integration points are marked with `// TODO:` comments in `App.jsx`.

### App.jsx — Where to add your API calls:

```jsx
// READ — load contacts on mount
useEffect(() => {
  fetch("/api/contacts")
    .then(res => res.json())
    .then(data => setContacts(data));
}, []);

// CREATE
onSubmit={(formData) => {
  fetch("/api/contacts", { method: "POST", body: JSON.stringify(formData) })
    .then(() => { /* refresh contacts */ });
}}

// UPDATE
onSubmit={(formData) => {
  fetch(`/api/contacts/${formData.id}`, { method: "PUT", body: JSON.stringify(formData) })
    .then(() => { /* refresh contacts */ });
}}

// DELETE
onDelete={(id) => {
  fetch(`/api/contacts/${id}`, { method: "DELETE" })
    .then(() => { /* refresh contacts */ });
}}
```

### Form Data Shape

All forms return an object with these fields:

```js
{
  id,       // present on update only
  name,
  photo,    // URL string
  mobile,
  email,
  company,
  title,
  group,
}
```

## Pages

| Page      | Component            | Description                                   |
| --------- | -------------------- | --------------------------------------------- |
| Directory | `PhoneDirectory.jsx` | Lists all contacts, has search                |
| Create    | `CreateContact.jsx`  | Blank form, calls `onSubmit(formData)`        |
| View      | `ViewContact.jsx`    | Read-only contact detail                      |
| Update    | `UpdateContact.jsx`  | Pre-filled edit form with live avatar preview |
