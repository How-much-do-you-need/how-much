import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function LogIn() {
  return (
    <LogMain>
      <Link to="/">
        <h1>to home</h1>
      </Link>
      <h1>LogIn</h1>
      <form>
        <LogMent>로그인</LogMent>
        <InputIp>
          <InputDivId>
            <InputPId type="text" placeholder="아이디를 입력해주세요" />
          </InputDivId>
          <InputDivPw>
            <InputPPW type="password" placeholder="비밀번호를 입력해주세요" />
          </InputDivPw>
        </InputIp>

        <Find>
          <FindId>아이디 찾기</FindId>
          <FindPw>비밀번호 찾기</FindPw>
        </Find>
        <LogInB>로그인</LogInB>
        <SignIn>회원 가입</SignIn>
      </form>
    </LogMain>
  );
}
const LogMent = styled.div`
  font-size: 12px;
  font-weight: 800;
  line-height: 20px;
`;
const LogMain = styled.div`
  width: 1050px;
  margin-top: 90px;
  margin-bottom: 60px;
  position: relative;
  text-align: center;
  width: 100%;
  align-items: center;
  font-size: 12px;
`;
const InputIp = styled.div`
  margin-top: 30px;
`;
const InputDivId = styled.div`
  position: relative;
`;
const InputPId = styled.input`
  padding: 0 11px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
`;
const InputDivPw = styled.div`
  position: relative;
  margin: 10px;
`;
const InputPPW = styled.input`
  padding: 0 11px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
`;
const Find = styled.div`
  float: right;
  display: flex;
`;
const FindId = styled.div`
  float: left;
  align-items: flex-start;
`;
const FindPw = styled.div`
  align-items: flex-end;
`;
const LogInB = styled.div`
  padding: 11px 12px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  left: 10px;
`;
const SignIn = styled.div`
  padding: 0 11px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
`;
