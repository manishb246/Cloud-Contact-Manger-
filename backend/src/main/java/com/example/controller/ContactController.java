package com.example.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.entity.Contact;
import com.example.service.ContactService;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactservice;

    public ContactController(ContactService contactservice) {
        this.contactservice = contactservice;
    }

    @PostMapping("/add")
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactservice.addContact(contact));
    }

    @GetMapping("/showAll")
    public ResponseEntity<List<Contact>> showAllContact() {
        return ResponseEntity.ok(contactservice.showAllContact());
    }

    @GetMapping("/showById/{id}")
    public ResponseEntity<Contact> showContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactservice.showContactById(id));
    }

    @GetMapping("/showByName/{name}")
    public ResponseEntity<List<Contact>> showContactByName(@PathVariable String name) {
        return ResponseEntity.ok(contactservice.showContactByName(name));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Contact> updateContactById(@PathVariable Long id, @RequestBody Contact newContact) {
        return ResponseEntity.ok(contactservice.updateContactById(id, newContact));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Contact> deleteContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactservice.deleteContactById(id));
    }

}