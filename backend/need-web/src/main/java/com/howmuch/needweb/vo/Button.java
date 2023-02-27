package com.howmuch.needweb.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class Button implements Serializable {
    boolean push_check;
    String id;
    int prod_no;
}
