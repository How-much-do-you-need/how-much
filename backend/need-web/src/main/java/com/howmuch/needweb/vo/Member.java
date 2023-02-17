package com.howmuch.needweb.vo;

import java.io.Serializable;
import java.sql.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member implements Serializable {

  private String id;
  private String password;
  private String nickName;
  private Date createdDate;
  private String name;
  private String phoneNo;
  private Date birthDay;
  private String gender;


}

