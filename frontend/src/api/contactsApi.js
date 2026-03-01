const BASE_URL = "/api/contacts";

// GET /showAll
export async function getAllContacts() {
  const res = await fetch(`${BASE_URL}/showAll`);
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

// GET /showById/:id
export async function getContactById(id) {
  const res = await fetch(`${BASE_URL}/showById/${id}`);
  if (!res.ok) throw new Error("Contact not found");
  return res.json();
}

// GET /showByName/:name
export async function searchContactsByName(name) {
  const res = await fetch(`${BASE_URL}/showByName/${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

// POST /add
export async function createContact(data) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create contact");
  return res.json();
}

// PUT /update/:id
export async function updateContact(id, data) {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update contact");
  return res.json();
}

// DELETE /delete/:id
export async function deleteContact(id) {
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete contact");
  // Some DELETE endpoints return no body
  return res.status;
}
