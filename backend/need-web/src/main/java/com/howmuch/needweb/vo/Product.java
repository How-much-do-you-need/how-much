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
    private int prod_no;
    private String prod_name;
    private int price;
    private String cont;
    private String id;
    private int cat_no;
    private String path;
}
