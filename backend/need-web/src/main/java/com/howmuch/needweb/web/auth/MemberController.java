package com.howmuch.needweb.web.auth;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.howmuch.needweb.service.MemberService;
import com.howmuch.needweb.vo.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/member/")
public class MemberController {
  @Autowired
  MemberService memberService;
  // HttpSession 클래스 주입.
  @Autowired
  private HttpSession session;

  @GetMapping("list")
  public void list(Model model) throws Exception {
    // 프론트 컨트롤러가 건네준 Model 객체에 작업 결과를 담아 두면
    // 핸들러 호출이 끝났을 때 JSP 를 실행하기 전에
    // 먼저 Model 객체에 담아둔 값을 ServletRequest 보관소로 옮긴다.
    model.addAttribute("members", memberService.list());
  }
  @GetMapping("detail")
  public void detail(String id, Map map) throws Exception {
    Member member = memberService.get(id);

    if (member == null) {
      throw new Exception("해당 아이디의 회원이 없습니다.");
    }

    map.put("member", member);
  }


@PostMapping("update")
  public String update(Member member) throws Exception {
    if (!memberService.update(member)) {
      throw new Exception("회원 변경 오류입니다!");
    }
    return "redirect:list";
  }

  @GetMapping("delete")
  public String delete(String id) throws Exception {
    if (!memberService.delete(id)) {
      throw new Exception("회원 삭제 오류입니다!");
    }

    return "redirect:list";
  }

  @GetMapping("findid/{name}/{email}")
  @ResponseBody
  public String findId(@PathVariable("name") String name, @PathVariable("email") String email) throws Exception {
    Map<String, String> map = new HashMap();
    map.put("name", name);
    map.put("email", email);

    Member member = memberService.findId(map);

    if(member ==null){
      return "입력한 정보에 일치하는 회원이 존재하지 않습니다";
    }
    return member.getId() ;
  }

  @GetMapping("findid")
  public void findId()  throws Exception {

  }



  //  비밀번호 찾기
  @GetMapping("findpwd/{id}/{name}/{email}")
  @ResponseBody
  public String findpwd(@PathVariable("id") String id,@PathVariable("name") String name,@PathVariable("email") String email) throws Exception {
    Map<String, String> map = new HashMap();
    map.put("id", id);
    map.put("name", name);
    map.put("email", email);

    Member member = memberService.findpwd(map);

    if (member == null) {
      return "입력한 정보에 일치하는 회원이 존재하지 않습니다";
    }
    return member.getPassword();
  }

  @GetMapping("findpwd")
  public void findpwd()  throws Exception {

  }
}
