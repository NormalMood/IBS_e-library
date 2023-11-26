package com.informationsystem.library.controller;

import com.informationsystem.library.model.StatusName;
import com.informationsystem.library.service.AdminService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin-panel")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(@RequestParam(required = false) String bookId) {
        return ResponseEntity.ok(adminService.getHistory(bookId));
    }

    @GetMapping("/checkouted-books")
    public ResponseEntity<?> getCheckoutedBooks(@RequestParam(required = false) StatusName status) {
        return ResponseEntity.ok(adminService.getCheckoutedBooks(status));
    }

}
