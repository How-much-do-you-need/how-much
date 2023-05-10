package com.howmuch.needweb.service;

import com.howmuch.needweb.dao.ButtonDao;
import com.howmuch.needweb.dao.ProductDao;
import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Product;
import org.apache.ibatis.annotations.Param;
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
        return buttonDao.makeBtnColumn(id, prod_no);
    }

    @Transactional
    @Override
    public int updateBtnStatus(Button button) {
        if(checkCurrentBtn(button.getId(), button.getProd_no())) {
            button.setPush_check(false);
        } else {
            button.setPush_check(true);
        }
        return buttonDao.updateBtnStatus(button);
    }

    @Override
    public Boolean checkCurrentBtn(String id, int prod_no) {
        System.out.println("button check: " + buttonDao.checkCurrentBtn(id, prod_no));
        return buttonDao.checkCurrentBtn(id, prod_no);
    }

    @Override
    public int findButton(String id, int prod_no) {
//        System.out.println("DAO - id = " + id);
        return buttonDao.findButton(id, prod_no);
    }
}
