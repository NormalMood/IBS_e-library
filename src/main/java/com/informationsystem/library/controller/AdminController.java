package com.informationsystem.library.controller;

import com.informationsystem.library.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/detailed_history/all")
    public ResponseEntity<?> getDetailedHistory(@RequestParam("page") Integer pageNum,
                                                @RequestParam("results") Integer elementsPerPage) {
        return ResponseEntity.ok(adminService.getDetailedHistory(pageNum, elementsPerPage));
    }

    @GetMapping("/detailed_history/certain")
    public ResponseEntity<?> getBookDetailedHistory(@RequestParam("bookId") Long bookId,
                                                    @RequestParam("page") Integer pageNum,
                                                    @RequestParam("results") Integer elementsPerPage) {
        return ResponseEntity.ok(adminService.getBookDetailedHistory(bookId, pageNum, elementsPerPage));
    }

    @GetMapping("/expired")
    public ResponseEntity<?> getBinExpiredStatuses(@RequestParam("page") Integer pageNum,
                                                   @RequestParam("results") Integer elementsPerPage){
        return ResponseEntity.ok(adminService.getBinExpiredStatuses(pageNum, elementsPerPage));
    }

}
