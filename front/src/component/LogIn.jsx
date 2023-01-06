import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isValidEmail, isValidPassword, setEmailMessage, setPasswordMessage, loginEmail, loginPassword} from "../modules/actions";


export default function LogIn() {
  const { email, password } = useSelector(state => state.loginData);
  const { isEmail, isPassword } = useSelector(state => state.isLoginValid);
  const { emailMessage, passwordMessage } = useSelector(state => state.loginMsg);

  
  const dispatch = useDispatch();
  
  const dispatchEmailIsValid = (typedEmail) => {
    dispatch(loginEmail(typedEmail));
    dispatch(isValidEmail(true));
    dispatch(setEmailMessage("멋진 이메일이네요!"));
  }
  const dispatchEmailIsNotValid = () => {
    dispatch(isValidEmail(false));
    dispatch(setEmailMessage("이메일 형식에 맞춰 입력해주세요."));
  }

  const dispatchPasswordIsValid = (typedPassword) => {
    dispatch(loginPassword(typedPassword))
    dispatch(isValidPassword(true));
    dispatch(setPasswordMessage("완벽해요!"));
  }

  const dispatchPasswordIsNotValid = () => {
    dispatch(isValidPassword(false));
    dispatch(setPasswordMessage("비밀번호는 숫자와 문자를 사용해 4~12자리를 입력해주세요."));
  }

  // 이메일을 입력받을 때 값을 받아서 수행
  const onChangeAboutEmail = (event) => {
    const typedEmail = event.target.value;
    isEmailAvailable(typedEmail) ? dispatchEmailIsValid(typedEmail) : dispatchEmailIsNotValid();
  };

  // 이메일 유효성을 검사
  const isEmailAvailable = (typedEmail) => {
    // 정규식을 활용.
    const expText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return expText.test(typedEmail)
  }

  // 비밀번호 입력받을 때 값을 받아서 수행
  const onChagneAboutPassword = (event) => {
    const typedPassword = event.target.value;
    isPasswordAvailable(typedPassword) ? dispatchPasswordIsValid(typedPassword) : dispatchPasswordIsNotValid();
  };

  // 비밀번호 유효성 검사
  const isPasswordAvailable = (typedPassword) => {
    // 정규식 이용
    const passwordExp = /^[a-zA-z0-9]{4,12}$/;
    return passwordExp.test(typedPassword)
  }

  // 이메일과 비밀번호가 모두 유효할때 버튼을 활성화
  const btnDisabled = () => {
    return !(isEmail && isPassword);
  }

  // form이 제출되었을 때 실행
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Login 정보");

    console.log(`입력한 아이디: ${email}`);
    console.log(`입력한 비밀번호: ${password}`);
  }

  return (
    <LogMain>
      <Link to="/">
        <h1>to home</h1>
      </Link>
      <h1>LogIn</h1>
      <form onSubmit={formSubmitHandler}>
        <LogMent>로그인</LogMent>
        <InputIp>
          <InputDivId>
            <InputPId type="text" onChange={onChangeAboutEmail} placeholder="아이디를 입력해주세요" />
            <p style={{color: isEmail ? "green" : "red"}}>{emailMessage}</p>
          </InputDivId>
          <InputDivPw>
            <InputPPW type="password" onChange={onChagneAboutPassword} placeholder="비밀번호를 입력해주세요" />
            <p style={{color: isPassword ? "green" : "red"}}>{passwordMessage}</p>
          </InputDivPw>
        </InputIp>

        <Find>
          <FindId>아이디 찾기</FindId>
          <FindPw>비밀번호 찾기</FindPw>
        </Find>

        <LogInB>
          <LoginBtn isEmail={isEmail} isPassword={isPassword} disabled= {btnDisabled()}> 로그인 </LoginBtn>
        </LogInB>

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

const LoginBtn = styled.button`
  width: 13%;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  padding: 5px 15px;
  background-color: ${(props) => (props.isEmail && props.isPassword) ?  "#00b4d8" : "#e5e5e5"};
  color: white;
  font-weight: bold;
`;
