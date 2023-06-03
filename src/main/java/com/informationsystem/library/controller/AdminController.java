package com.informationsystem.library.controller;

import com.informationsystem.library.service.AdminService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/detailed_history/all")
    public ResponseEntity<?> getDetailedHistory(Pageable pageable) {
        return ResponseEntity.ok(adminService.getDetailedHistory(pageable));
    }

    @GetMapping("/detailed_history/certain")
    public ResponseEntity<?> getBookDetailedHistory(@RequestParam("bookId") Long bookId,
                                                    Pageable pageable) {
        return ResponseEntity.ok(adminService.getBookDetailedHistory(bookId, pageable));
    }

    @GetMapping("/expired")
    public ResponseEntity<?> getBinExpiredStatuses(Pageable pageable) {
        return ResponseEntity.ok(adminService.getBinExpiredStatuses(pageable));
    }
    
    @GetMapping("/expired_only")
    public ResponseEntity<?> getBinExpiredStatusesOnly(Pageable pageable) {
    	return ResponseEntity.ok(adminService.getBinExpiredStatusesOnly(pageable));
    }

}
