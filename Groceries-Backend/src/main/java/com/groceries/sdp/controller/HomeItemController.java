package com.groceries.sdp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.groceries.sdp.modal.HomeItem;
import com.groceries.sdp.service.HomeItemService;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class HomeItemController {

    private final HomeItemService homeItemService;

    public HomeItemController(HomeItemService homeItemService) {
        this.homeItemService = homeItemService;
    }

    @PostMapping("/add")
    public ResponseEntity<HomeItem> addItem(@RequestBody HomeItem item) {
        HomeItem savedItem = homeItemService.addItem(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @PutMapping("/edit")
    public ResponseEntity<HomeItem> updateItem(@RequestBody HomeItem item) {
        HomeItem updatedItem = homeItemService.updateItem(item);
        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<HomeItem> getItemById(@PathVariable Long id) {
        HomeItem item = homeItemService.getItemById(id);
        if (item == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<HomeItem>> getAllItems() {
        List<HomeItem> items = homeItemService.getAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        try {
            homeItemService.deleteHomeItem(id);
            return new ResponseEntity<>("Deleted successfully", HttpStatus.OK);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
