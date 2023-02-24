package com.howmuch.needweb.dao;

import com.howmuch.needweb.vo.Member;
import com.howmuch.needweb.vo.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductDao {

    Product findByProduct(String prod_no);

    List<Product> findByCategory(String cat_no);

    int insertProduct(Product product);

    int update(Product product);

    int delete(String prod_no);

    List<Product> findAll();

    List<Product> findByWriterAll(String id);

}
