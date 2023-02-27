package com.howmuch.needweb.dao;

import com.howmuch.needweb.vo.Member;
import com.howmuch.needweb.vo.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductDao {

    Product findByProduct(int prod_no);

    List<Product> findByCategory(int cat_no);

    int insertProduct(Product product);

    int update(Product product);

    int updatePrice(Product product);

    int productDelete(int prod_no);

    List<Product> findAll();

    List<Product> findByWriterAll(String id);


    int findProdNo(String id);
}
