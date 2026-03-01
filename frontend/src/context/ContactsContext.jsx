import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllContacts,
  createContact,
  updateContact as apiUpdateContact,
  deleteContact as apiDeleteContact,
} from "../api/contactsApi";

const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all contacts on mount
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllContacts();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (formData) => {
    await createContact(formData);
    await fetchContacts();
  };

  const editContact = async (id, formData) => {
    await apiUpdateContact(id, formData);
    await fetchContacts();
  };

  const removeContact = async (id) => {
    await apiDeleteContact(id);
    await fetchContacts();
  };

  return (
    <ContactsContext.Provider
      value={{ contacts, loading, error, addContact, editContact, removeContact, refetch: fetchContacts }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}
