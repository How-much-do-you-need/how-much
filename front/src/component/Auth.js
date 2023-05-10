import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LOGIN_STATUS } from "../modules/typeMessage/typeMessage";
import { useNavigate } from "react-router-dom";

export function auth() {
  const request = axios.get("/checkLogin").then((response) => response.data);
  return {
    type: LOGIN_STATUS,
    status: request,
  };
}
export default function Auth(SpecificComponent, option) {
  //null    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지
  const dispatch = useDispatch();
  function AuthenticationCheck(props) {
    console.log(props);
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        if (!response.status) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (!response.status) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
