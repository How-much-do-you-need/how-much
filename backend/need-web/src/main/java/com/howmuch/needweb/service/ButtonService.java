package com.howmuch.needweb.service;

import com.howmuch.needweb.vo.Button;
import com.howmuch.needweb.vo.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ButtonService {
    int makeBtnColumn(String id, int prod_no);

    int updateBtnStatus(Button button);

    Boolean checkCurrentBtn(String id, int prod_no);
}
