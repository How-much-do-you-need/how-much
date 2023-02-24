package com.howmuch.needweb.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.sql.Date;

@Getter
@Setter
@ToString
public class Product implements Serializable {
    private String prod_no;
    private String title;
    private String price;
    private String content;
    private String id;
    private String cat_no;
    private Date writeDate;
}
