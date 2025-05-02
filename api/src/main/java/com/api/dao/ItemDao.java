package com.api.dao;

import com.api.entity.Item;

import java.util.List;

public interface ItemDao {
    List<Item> getItems();

    Item updateItem(Long id, Item item);
    Item getItem(Long id);
    void deleteItem(Long id);
}
