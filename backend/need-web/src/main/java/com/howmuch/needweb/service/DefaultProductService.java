package com.howmuch.needweb.service;

import com.howmuch.needweb.dao.ProductDao;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DefaultProductService implements ProductService{

    @Autowired
    ProductDao productDao;

    @Override
    public Product get(int prod_no) throws Exception{
        return productDao.findByProduct(prod_no);
    }

    @Override
    public boolean insert(Product product) throws Exception{
        productDao.insertProduct(product);
        return true;
    }

    @Override
    public boolean update(Product product) throws Exception{
        return productDao.update(product) > 0;
    }

    @Override
    public boolean updatePrice(Product product) throws Exception{
        System.out.println(productDao.updatePrice(product));
        return productDao.updatePrice(product) > 0;
    }

    @Transactional
    @Override
    public boolean delete(int prod_no) throws Exception{
        return productDao.delete(prod_no) > 0;
    }
    @Override
    public List<Product> list() throws Exception{
        return productDao.findAll();
    }

    @Override
    public List<Product> searchCategory(int cat_no) throws Exception{
        return productDao.findByCategory(cat_no);
    }

    @Override
    public List<Product> searchWriter(String id) throws Exception{
        return productDao.findByWriterAll(id);
    }
}
