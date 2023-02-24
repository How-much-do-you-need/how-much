package com.howmuch.needweb.service;

import com.howmuch.needweb.vo.Product;

import java.util.List;

public interface ProductService {

    Product get(String prod_no) throws Exception;

    boolean insert(Product product) throws Exception;

    boolean update(Product product) throws Exception;
    boolean delete(String prod_no) throws Exception;

    List<Product> list() throws Exception;

    List<Product> searchCategory(String cat_no) throws Exception;

    List<Product> searchWriter(String id) throws Exception;
}
