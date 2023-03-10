package com.howmuch.needweb.dao;

import com.howmuch.needweb.vo.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


@Mapper
public interface MemberDao {

   Member findById(String id);

   Member findByNickName(String nickName);

   Member findByIdPassword(
          @Param("id") String id,
          @Param("password") String password);

  Member findByEmail(String email);

  Member findByPhoneNo(String phoneNo);

  int join(Member member);

  int updateStatus(Member member);

  int delete(String id);

  List<Member> findAll();

  Member findByIdAll(String id);

  int update(Member member);

  Member findId(Map<String, String> map);

  Member findpwd(Map<String, String> map);

  void findpwdupdate(Map<String, String> map);

  Member checkCorrectUser(String id);

}
