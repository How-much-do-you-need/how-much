package com.howmuch.needweb.web.auth;

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
import java.util.regex.Pattern;


@RestController
@RequestMapping("/auth/")
public class AuthController {

  @Autowired
  MemberService memberService;

  @GetMapping("register")
  public void register(@CookieValue(name = "id", defaultValue="") String id, Model model) throws Exception {
    model.addAttribute("id", id);
  }

  @ResponseBody
  @PostMapping("idCheck")
  public String idCheck(@RequestParam String id) throws Exception {
    String filter = "^[a-z0-9]*$";

    System.out.println("id = " + id);

    Member result = memberService.idCheck(id);



    return inputCheck(id, result, filter);
  }

  @ResponseBody
  @GetMapping("nickNameCheck")
  public String nickNameCheck(String nickName) throws Exception {
    String filter = "^[A-Za-z0-9가-힣]*$";
    Member result = memberService.nickNameCheck(nickName);

    return inputCheck(nickName, result, filter);
  }

  private String inputCheck(String inputString, Member result, String filter) throws Exception {
    if (
        Pattern.matches(filter, inputString) &&
            inputString.length() >= 4 &&
            inputString.length() <= 12) {
      if (result == null) {
        return "true";
      } else {
        return "duplicated";
      }
    } else {
      return "incorrect";
    }
  }

  @ResponseBody
  @GetMapping("phoneNoCheck")
  public String phoneNoCheck(String phoneNo) throws Exception {
    if (phoneNo.length() < 11) {
      return "short";
    }
    Member result = memberService.phoneNoCheck(phoneNo);
    if (result == null) {
      return "true";
    } else {
      return "false";
    }
  }

  @ResponseBody
  @PostMapping("lastCheck")
  public String lastCheck(String finalCheck) throws Exception {
    if (finalCheck.equals("1")) {
      return "true";
    } else {
      return "false";
    }

  }

  @PostMapping("join")
  public String join(@RequestBody Member member, Model model) throws Exception {
    System.out.println(12121212);
    System.out.println(member);
    //가입정보가 제대로된 정보인지 확인
    if (member.getId().length() < 5 || member.getPhoneNo().length() < 5) {
      System.out.println("email = " + member.getId());
      System.out.println("phoneNo = " + member.getPhoneNo());
      System.out.println(1);
      return "/auth/register1";
    }

    // 가입정보가 중복인지 확인하고 문제없다면 가입처리
    if(memberService.join(member.getId(), member.getPhoneNo(), member)) {
      System.out.println(2);
      return "/auth/joinResult";
    }

    System.out.println(3);
    // 이 외의 모든 올바르지 않은 가입정보에 대해 가입정보 재입력 강제하기
    model.addAttribute("checkResult", "false");
    return "/auth/register";
  }

  @GetMapping("loginfail")
  public void loginfail() {
  }

  @PostMapping("login")
  public Boolean login(
          @RequestParam("id") String id,
          @RequestParam("password")String password,
          HttpServletResponse response,
          HttpSession session) throws Exception {

    Member member = memberService.get(id, password);

    if (member != null) {
      session.setAttribute("loginMember", member); // 로그인한 멤버 정보를 세션 보관소에 저장
    }

    // 클라이언트에게 쿠키 보내기
    // - 쿠키 데이터는 문자열만 가능
    Cookie cookie = new Cookie("id", id); // 클라이언트 쪽에 저장할 쿠키 생성

    cookie.setPath("/");

//    if (saveEmail == null) {
//      cookie.setMaxAge(0); // 클라이언트에게 해당 이름의 쿠키를 지우라고 명령한다.
//    } else {
//      // 쿠키의 지속시간을 설정하지 않으면 웹브라우저가 실행되는 동안만 유효하다.
//      // 만약 웹브라우저를 종료하더라도 쿠키를 유지하고 싶다면,
//      // 지속 시간을 설정해야 한다.
//      cookie.setMaxAge(60 * 60 * 24 * 7);
//    }
    response.addCookie(cookie);

//    ModelAndView mv = new ModelAndView("/auth/loginResult");
//    mv.addObject("member", member);
    if(member != null)
      return true;
    else
      return false;
  }

  @GetMapping("logout")
  public String logout(HttpSession httpSession) throws Exception {
    httpSession.invalidate();
    return "redirect:../";
  }

  @GetMapping("checkLogin")
  public Member checkLogin(HttpSession session) throws Exception {
    Member member = (Member) session.getAttribute("loginMember");
    System.out.println("member = " + member);
    if(member == null) {
      return null;
    } else {
      return member;
    }
  }
}
