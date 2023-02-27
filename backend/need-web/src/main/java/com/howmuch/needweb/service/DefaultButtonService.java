package com.howmuch.needweb.service;

import com.howmuch.needweb.dao.ButtonDao;
import com.howmuch.needweb.dao.ProductDao;
import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DefaultButtonService implements ButtonService{
    @Autowired
    ButtonDao buttonDao;

    @Transactional
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
        return buttonDao.checkCurrentBtn(id, prod_no);
    }
}
