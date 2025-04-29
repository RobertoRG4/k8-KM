package com.api.dao.implement;

import com.api.dao.LoginDao;
import com.api.entity.Login;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public class LoginDaoImplement implements LoginDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Login> getCredentials(){
        String query = "From Login";
        return entityManager.createQuery(query,Login.class).getResultList();
    }
}
