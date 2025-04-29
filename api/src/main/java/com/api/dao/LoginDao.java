package com.api.dao;

import com.api.entity.Login;

import java.util.List;

public interface LoginDao {
    List<Login> getCredentials();
}
