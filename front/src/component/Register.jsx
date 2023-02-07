import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {registerId, regiserPassword, registerNickName} from "../modules/actions"
import axios from "axios";

export default function Register() {

    const {regEmail, regPassword, regNickname} = useSelector(state => state.userRegiser);
    const dispatch = useDispatch();

    const onRegisterEmailHandler = (e) => {
        dispatch(registerId(e.target.value));
    }
    const onRegisterPasswordHandler = (e) => {
        dispatch(regiserPassword(e.target.value));
    }
    const onRegisterNickNameHandler = (e) => {
        dispatch(registerNickName(e.target.value));
    }

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();
        console.log(regEmail, regPassword, regNickname);
        
        axios.post("/auth/Join", {email: regEmail, password: regPassword, nickname:regNickname})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <RegisterMain>
        <Link to="/">
            <h1>to home</h1>
        </Link>
        <h1>회원가입</h1>
        <form onSubmit={onRegisterSubmitHandler}>
            <RegisterMent>Register</RegisterMent>

            <RegisterIp>
            <InputDiv>
                <InputRegisterId
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={onRegisterEmailHandler}
                required
                />
            </InputDiv>

            <InputDiv>
                <InputRegisterId
                type="text"
                placeholder="비밀번호를 입력해주세요"
                onChange={onRegisterPasswordHandler}
                required
                />
            </InputDiv>

            <InputDiv>
                <InputRegisterId
                type="text"
                placeholder="닉네임을 입력해주세요"
                onChange={onRegisterNickNameHandler}
                required
                />
            </InputDiv>
            </RegisterIp>

            <RegiB>
            <RegisterBtn>
                회원가입
            </RegisterBtn>
            </RegiB>

        </form>
        </RegisterMain>
    );
}


const RegisterMent = styled.div`
  font-size: 12px;
  font-weight: 800;
  line-height: 20px;
`;
const RegisterMain = styled.div`
  width: 1050px;
  margin-top: 90px;
  margin-bottom: 60px;
  position: relative;
  text-align: center;
  width: 100%;
  align-items: center;
  font-size: 12px;
`;
const RegisterIp = styled.div`
  margin-top: 30px;
`;
const InputDiv = styled.div`
  position: relative;
`;
const InputRegisterId = styled.input`
  padding: 0 11px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
`;
const RegiB = styled.div`
  padding: 11px 12px 1px 15px;
  height: 54px;
  font-size: 20px;
  font-weight: 400;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  left: 10px;
`;

const RegisterBtn = styled.button`
  width: 13%;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  padding: 5px 15px;
  background-color: #00b4d8;
  color: white;
  font-weight: bold;
`;
