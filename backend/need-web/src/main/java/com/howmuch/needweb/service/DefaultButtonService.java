package com.howmuch.needweb.service;

import com.howmuch.needweb.dao.ButtonDao;
import com.howmuch.needweb.dao.ProductDao;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DefaultButtonService implements ButtonService{
    @Autowired
    ButtonDao buttonDao;
    @Override
    public int makeBtnColumn(String id, int prod_no) {
        System.out.println("id = " + id);
        System.out.println("prod_no = " + prod_no);
        return buttonDao.makeBtnColumn(id, prod_no);
    }
}
