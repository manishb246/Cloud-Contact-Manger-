package com.example.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.Data;

@Entity
@Table(name = "contacts")
@Data
@CrossOrigin(origins = "http://localhost:5173")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "url", length = 500)
    private String url;

    @Column(name = "mobile_no", length = 15)
    private String mobileNo;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "contact_group", length = 100)
    private String group;

}