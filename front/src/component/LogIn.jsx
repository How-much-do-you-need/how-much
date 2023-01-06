import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { loginReducer, enteredLoginDataIsValidReducer, isMessageReducer } from "../loginDataHandler/actionReducer";
import { defaultLoginData, defaultEnteredLoginDataIsValid, defaultMessageData } from "../loginDataHandler/storeData";



export default function LogIn() {

  const [loginData, dispatchLoginData] = useReducer(loginReducer, defaultLoginData);
  const [enteredLoginDataIsValid, dispatchEnteredLoginDataIsValid] = useReducer(enteredLoginDataIsValidReducer, defaultEnteredLoginDataIsValid);
  const [messageData, dispatchMessageData] = useReducer(isMessageReducer, defaultMessageData);


  // 이메일을 입력받을 때 값을 받아오는 함수
  const onChangeAboutEmail = (event) => {
    const typedEmail = event.target.value;

    // 이메일에대한 유효성 검사
    if (isEmailAvailable(typedEmail)) {
      // 이메일이 유효할 때, email과 안내문자 state 변경
      dispatchLoginData({
        type: 'EMAIL',
        typedEmail: typedEmail,
      })
      dispatchMessageData({
        type: "EMAIL",
        emailMessage: "멋진 이메일이네요!"
      })
    }
    // 이메일 형식이 유효하지 않다면 
    else {
      // 유효하지 않다는 안내문자 state 변경
        dispatchMessageData({
        type: "EMAIL",
        emailMessage: "이메일 형식에 맞춰 입력해주세요."
      })
    }
  };

  // 이메일 유효성을 검사하는 함수
  const isEmailAvailable = (typedEmail) => {
    // 정규식을 활용.
    const expText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (expText.test(typedEmail)) {
      // 이메일이 유효하다는 state 변경
      dispatchEnteredLoginDataIsValid({
        type: "EMAIL",
        isEmailAvailable: true,
      })
      return true;
    }
    // 이메일이 유효하지 않다고 state 변경
    else {
      dispatchEnteredLoginDataIsValid({
        type: "EMAIL",
        isEmailAvailable: false,
      })
      return false;
    }
  }

  // 비밀번호 입력받을 때 값을 받아오는 함수.
  const onChagneAboutPassword = (event) => {
    const typedPassword = event.target.value;
    // 비밀번호가 유효할때
    if (isPasswordAvailable(typedPassword)) {
      // 안내문자와 비밀번호 state 변경
      dispatchLoginData({
        type: "PASSWORD",
        typedPassword: typedPassword,
      });
      dispatchMessageData({
        type: "PASSWORD",
        passwordMessage: "완벽해요!"
      })
    }
    // 유효하지 않다면 유효하지 않다고 안내문자 state 변경
    else {
      dispatchMessageData({
        type: "PASSWORD",
        passwordMessage: "비밀번호는 숫자와 문자를 사용해 4~12자리를 입력해주세요."
      })
    }
  };


  // 비밀번호 유효성 검사 함수
  const isPasswordAvailable = (typedPassword) => {
    // 정규식 이용
    const passwordExp = /^[a-zA-z0-9]{4,12}$/;
    // 유효할때, 비밀번호 유효 state 변경
    if (passwordExp.test(typedPassword)) {
      dispatchEnteredLoginDataIsValid({
        type: "PASSWORD",
        isPasswordAvailable: true,
      })
      return true;
    }
    // 유효하지 않을 때, 비밀번호 유효하지 않다고 state 변경
    else {
      dispatchEnteredLoginDataIsValid({
        type: "PASSWORD",
        isPasswordAvailable: false,
      })
      return false;
    }
  }

  // 이메일과 비밀번호가 둘다 유효할때 버튼을 활성화 시키는 함수
  const btnDisabled = () => {
    if (enteredLoginDataIsValid.isEmail && enteredLoginDataIsValid.isPassword) return false;
    return true;
  }

  // form이 제출되었을 때 실행되는 함수
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Login 정보");
    console.log(`입력한 아이디: ${loginData.email}`);
    console.log(`입력한 비밀번호: ${loginData.password}`);
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
            <p style={{color: enteredLoginDataIsValid.isEmail ? "green" : "red"}}>{messageData.emailMessage}</p>
          </InputDivId>
          <InputDivPw>
            <InputPPW type="password" onChange={onChagneAboutPassword} placeholder="비밀번호를 입력해주세요" />
            <p style={{color: enteredLoginDataIsValid.isPassword ? "green" : "red"}}>{messageData.passwordMessage}</p>
          </InputDivPw>
        </InputIp>

        <Find>
          <FindId>아이디 찾기</FindId>
          <FindPw>비밀번호 찾기</FindPw>
        </Find>

        <LogInB>
          <LoginBtn enteredLoginDataIsValid={enteredLoginDataIsValid} disabled= {btnDisabled()}> 로그인 </LoginBtn>
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
  background-color: ${(props) => (props.enteredLoginDataIsValid.isEmail && props.enteredLoginDataIsValid.isPassword ?  "#00b4d8" : "#e5e5e5")};
  color: white;
  font-weight: bold;
`;
