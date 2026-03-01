package com.example.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.entity.Contact;
import com.example.repo.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactrepository;

    public ContactService(ContactRepository contactrepository) {
        this.contactrepository = contactrepository;
    }

    public Contact addContact(Contact contact) {
        return contactrepository.save(contact);
    }

    public List<Contact> showAllContact() {
        return contactrepository.findAll();
    }

    public Contact showContactById(Long id) {
        return contactrepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    public List<Contact> showContactByName(String name) {
        List<Contact> contacts = contactrepository.findByNameContainingIgnoreCase(name);
        if (contacts.isEmpty()) {
            throw new RuntimeException("Contact not found with name: " + name);
        }
        return contacts;
    }

    public Contact updateContactById(Long id, Contact newContact) {
        Contact oldContact = contactrepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        oldContact.setName(newContact.getName());
        oldContact.setUrl(newContact.getUrl());
        oldContact.setMobileNo(newContact.getMobileNo());
        oldContact.setEmail(newContact.getEmail());
        oldContact.setCompanyName(newContact.getCompanyName());
        oldContact.setTitle(newContact.getTitle());
        oldContact.setGroup(newContact.getGroup());

        return contactrepository.save(oldContact);
    }

    public Contact deleteContactById(Long id) {
        Contact oldContact = contactrepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        contactrepository.delete(oldContact);

        return oldContact;
    }
}