import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {registerId, regiserPassword, registerNickName} from "../modules/actions"
import axios from "axios";
import {
  isValidEmail,
  isValidPassword,
  setEmailMessage,
  setPasswordMessage,
  loginEmail,
  loginPassword,
} from "../modules/actions";

export default function Register() {

    const {regEmail, regPassword, regNickname} = useSelector(state => state.userRegiser);
    const { emailMessage, passwordMessage } = useSelector((state) => state.loginMsg);
    const { isEmail, isPassword } = useSelector((state) => state.isLoginValid);

    const dispatch = useDispatch();

    const onRegisterNickNameHandler = (e) => {
        dispatch(registerNickName(e.target.value));
    }

    // 회원가입 이메일
    const onRegisterEmailHandler = (e) => {
      const typedEmail = e.target.value;
      dispatch(registerId(typedEmail));
      isEmailAvailable(typedEmail)
        ? dispatchEmailIsValid(typedEmail)
        : dispatchEmailIsNotValid();
    }
    // 이메일 유효성을 검사
    const isEmailAvailable = (typedEmail) => {
      // 정규식을 활용.
      const expText = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
      return expText.test(typedEmail);
    };

    const dispatchEmailIsValid = (typedEmail) => {
      dispatch(loginEmail(typedEmail));
      dispatch(isValidEmail(true));
      dispatch(setEmailMessage("멋진 이메일이네요!"));
    };
    const dispatchEmailIsNotValid = () => {
      dispatch(isValidEmail(false));
      dispatch(setEmailMessage("이메일 형식에 맞춰 입력해주세요."));
    };
    //


    // 회원가입 비밀번호
    const onRegisterPasswordHandler = (e) => {
      const typedPassword = e.target.value;
      dispatch(regiserPassword(typedPassword));
      isPasswordAvailable(typedPassword)
        ? dispatchPasswordIsValid(typedPassword)
        : dispatchPasswordIsNotValid();
    }
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
    const isPasswordAvailable = (typedPassword) => {
      // 정규식 이용
      const passwordExp = /^[a-zA-z0-9]{4,12}$/;
      return passwordExp.test(typedPassword);
    };

    const btnDisabled = () => {
      return !(isEmail && isPassword);
    };


    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        console.log(regEmail, regPassword, regNickname);
        
        // axios.post("/auth/Join", {email: regEmail, password: regPassword, nickname:regNickname})
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }


    return (
        <RegisterMain>

          <h1>회원가입</h1>

          <RegisterForm onSubmit={onRegisterSubmitHandler}>
              <RegisterIp>
              <InputDiv>
                  <p>아이디 입력해주세요</p>
                  <InputRegisterId
                  type="text"
                  onChange={onRegisterEmailHandler}
                  required
                  />
                  <p style={{ color: isEmail ? "green" : "red" }}>{emailMessage}</p>
              </InputDiv>

              <InputDiv>
                  <p>비밀번호를 입력해주세요</p>
                  <InputRegisterId
                  type="password"
                  onChange={onRegisterPasswordHandler}
                  required
                  />
                  <p style={{ color: isPassword ? "green" : "red" }}>
                  {passwordMessage}
                  </p>
              </InputDiv>

              <InputDiv>
                  <p>닉네임을 입력해주세요</p>
                  <InputRegisterId
                  type="text"
                  onChange={onRegisterNickNameHandler}
                  required
                  />
              </InputDiv>
              </RegisterIp>

              <RegiB>
                <RegisterBtn isEmail={isEmail} isPassword={isPassword} disabled={btnDisabled()}>
                  회원가입
                </RegisterBtn>
              </RegiB>

              <FromRegisterToHomeLink to="/">
                <RegisterH3Tag>홈으로</RegisterH3Tag>
              </FromRegisterToHomeLink>

          </RegisterForm>
        </RegisterMain>
    );
}

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
`

const RegisterMain = styled.div`
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
const RegisterIp = styled.div`
  margin-top: 30px;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin: 20px 0px;
`;
const InputRegisterId = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid gray;
  font-size: 22px;
  background-color: #ececec;
  &:focus {
      outline: none;
      border-color: black;
  }
`;

const RegiB = styled.div`
  margin-top: 10px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  left: 10px;
`;

const RegisterBtn = styled.button`
  width: 100%;
  border: none;
  font-size: 20px;
  padding: 5px 15px;
  background-color: ${(props) =>
    props.isEmail && props.isPassword ? "#001219" : "#e5e5e5"};
  // background-color: #343a40;
  color: white;
  font-weight: bold;
`;

const RegisterH3Tag = styled.h3`
  color: black;
`
const FromRegisterToHomeLink = styled(Link)`
  text-decoration: none;
`