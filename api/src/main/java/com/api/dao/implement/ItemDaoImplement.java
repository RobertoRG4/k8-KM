package com.api.dao.implement;

import com.api.dao.ItemDao;
import com.api.entity.Item;
import com.api.entity.Login;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public class ItemDaoImplement implements ItemDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Item> getItems(){
        String query = "From Item";
        return entityManager.createQuery(query, Item.class).getResultList();
    }
    @Override
    public Item updateItem(Long id, Item updatedItem) {
        Item optionalItem = entityManager.find(Item.class, id);

        optionalItem.setName(updatedItem.getName());
        optionalItem.setCategory(updatedItem.getCategory());
        optionalItem.setPrice(updatedItem.getPrice());

        return entityManager.merge(optionalItem);
    }
}
