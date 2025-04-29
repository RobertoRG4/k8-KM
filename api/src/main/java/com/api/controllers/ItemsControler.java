package com.api.controllers;

import com.api.dao.ItemDao;
import com.api.entity.Item;
import com.api.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ItemsControler {
    @Autowired
    private ItemDao itemdao;

    @GetMapping("/items")
    public List<Item> getAllItems(){
        return itemdao.getItems();
    }
    @PutMapping("/item/{id}")
    public ResponseEntity<ApiResponse<String>> editItem(@PathVariable Long id, @RequestBody Item item) {
        try {
            Item updatedItem = itemdao.updateItem(id, item);

            return new ResponseEntity<>(new ApiResponse<>("Item updated successfully",LocalDateTime.now(),HttpStatus.ACCEPTED.value()),HttpStatus.ACCEPTED);

        } catch (EmptyResultDataAccessException e) {

            return new ResponseEntity<>(new ApiResponse<>(null, LocalDateTime.now(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {

            return new ResponseEntity<>(new ApiResponse<>(null, LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
