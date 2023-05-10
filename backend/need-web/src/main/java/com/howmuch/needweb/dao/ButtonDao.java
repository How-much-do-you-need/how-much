package com.howmuch.needweb.dao;

import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ButtonDao {

    int makeBtnColumn(@Param("id") String id, @Param("prod_no") int prod_no);

    Boolean checkCurrentBtn(@Param("id") String id, @Param("prod_no") int prod_no);

    int updateBtnStatus(Button button);


    int findButton(@Param("id") String id, @Param("prod_no") int prod_no);
}
