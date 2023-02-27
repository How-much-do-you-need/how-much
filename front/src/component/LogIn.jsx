import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  isValidEmail,
  isValidPassword,
  setEmailMessage,
  setPasswordMessage,
  loginEmail,
  loginPassword,
  checkLoginStatus,
} from "../modules/actions";

export default function LogIn(props) {
  const { email, password } = useSelector((state) => state.loginData);
  const { isEmail, isPassword } = useSelector((state) => state.isLoginValid);
  const { emailMessage, passwordMessage } = useSelector((state) => state.loginMsg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchEmailIsValid = (typedEmail) => {
    dispatch(loginEmail(typedEmail));
    dispatch(isValidEmail(true));
    dispatch(setEmailMessage("멋진 이메일이네요!"));
  };
  const dispatchEmailIsNotValid = () => {
    dispatch(isValidEmail(false));
    dispatch(setEmailMessage("이메일 형식에 맞춰 입력해주세요."));
  };

  const dispatchPasswordIsValid = (typedPassword) => {
    dispatch(loginPassword(typedPassword));
    dispatch(isValidPassword(true));
    dispatch(setPasswordMessage("완벽해요!"));
  };

  const dispatchPasswordIsNotValid = () => {
    dispatch(isValidPassword(false));
    dispatch(
      setPasswordMessage(
        "비밀번호는 숫자와 문자를 사용해 4~12자리를 입력해주세요."
      )
    );
  };

  // 이메일을 입력받을 때 값을 받아서 수행
  const onChangeAboutEmail = (event) => {
    const typedEmail = event.target.value;
    isEmailAvailable(typedEmail)
      ? dispatchEmailIsValid(typedEmail)
      : dispatchEmailIsNotValid();
  };

  // 이메일 유효성을 검사
  const isEmailAvailable = (typedEmail) => {
    // 정규식을 활용.
    const expText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return expText.test(typedEmail);
  };

  // 비밀번호 입력받을 때 값을 받아서 수행
  const onChagneAboutPassword = (event) => {
    const typedPassword = event.target.value;
    isPasswordAvailable(typedPassword)
      ? dispatchPasswordIsValid(typedPassword)
      : dispatchPasswordIsNotValid();
  };

  // 비밀번호 유효성 검사
  const isPasswordAvailable = (typedPassword) => {
    // 정규식 이용
    const passwordExp = /^[a-zA-z0-9]{4,12}$/;
    return passwordExp.test(typedPassword);
  };

  // 이메일과 비밀번호가 모두 유효할때 버튼을 활성화
  const btnDisabled = () => {
    return !(isEmail && isPassword);
  };

  // form이 제출되었을 때 실행
  const formSubmitHandler = (event) => {
    event.preventDefault();
    sessionStorage.setItem("loginId", email);

    const userLoginInfo = {
      id: email,
      password: password,
    }
    console.log(userLoginInfo);
    axios
    .post("/auth/login", null, {params: {id: email, password: password}})
    .then((res) => {
      console.log(res);
     
      if (res.data){
        dispatch(checkLoginStatus(true));
        navigate("/");
      }else{
        dispatch(
          setPasswordMessage(
            "비밀번호가 일치하지 않습니다."
          )
        );
      }
      
      // navigate("/login");
      })
      .catch((err) => {
        console.log("로그인 실패", err);
      });


    // navigate("/");
  };

  return (
    <LogMain>

      <h1>로그인</h1>

      <LoginForm onSubmit={formSubmitHandler}>
        <InputIp>
          <InputDiv>
            <p>아이디</p>
            <LoginInput
              type="text"
              onChange={onChangeAboutEmail}
            />
            <p style={{ color: isEmail ? "green" : "red" }}>{emailMessage}</p>
          </InputDiv>

          <InputDiv>
            <p>비밀번호</p>
            <LoginInput
              type="password"
              onChange={onChagneAboutPassword}
            />
            <p style={{ color: isPassword ? "green" : "red" }}>
              {passwordMessage}
            </p>
          </InputDiv>
        </InputIp>

        <Find>
          <FindId>아이디 찾기 / </FindId>
          <FindPw>비밀번호 찾기</FindPw>
        </Find>

        <LogInBtnBox>
          <LoginBtn isEmail={isEmail} isPassword={isPassword} disabled={btnDisabled()}>로그인</LoginBtn>
        </LogInBtnBox>

        <LogInBtnBox>
          <SignInBtn onClick={() => { navigate("/register");}}>
            회원가입
          </SignInBtn>
        </LogInBtnBox>

        <ToHomeLink to="/">
          <LoginH3Tag>홈으로</LoginH3Tag>
        </ToHomeLink>

      </LoginForm>
    </LogMain>
  );
}


const LogMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  width: 100%;
  height: 100vh;
  text-align: center;
  font-size: 12px;
`;
const InputIp = styled.div`
  margin-top: 30px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
`

const LoginInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid gray;
  font-size: 22px;
  background-color: #ececec;
  &:focus {
      outline: none;
      border-color: black;
  }
`

const Find = styled.div`
  float: right;
  display: flex;
  margin-bottom: 10px;
`;
const FindId = styled.div`
  float: left;
  align-items: flex-start;
`;
const FindPw = styled.div`
  align-items: flex-end;
`;
const LogInBtnBox = styled.div`
  height: 54px;
  font-size: 20px;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  left: 10px;
`;

const SignInBtn = styled.button`
  width: 100%;
  border: none;
  font-size: 20px;
  padding: 5px 15px;
  background-color: #343a40;
  color: white;
  font-weight: bold;
`;

const LoginBtn = styled.button`
  width: 100%;
  border: none;
  font-size: 20px;
  padding: 5px 15px;
  background-color: ${(props) =>
    props.isEmail && props.isPassword ? "#001219" : "#e5e5e5"};
  color: white;
  font-weight: bold;
`;

const LoginH3Tag = styled.h3`
  color: black;
`
const ToHomeLink = styled(Link)`
  text-decoration: none;
`