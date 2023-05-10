import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { checkLoginStatus } from "../modules/actions";

export default function Main() {
  const dummyData = [];

  const [first, setfirst] = useState("실패");
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const [dataState, setDataState] = useState(dummyData);

  useEffect(() => {
    const logId = sessionStorage.getItem("loginId");
    if (logId) {
      dispatch(checkLoginStatus(true));
    }
    // console.log("로그인 상태확인 USE EFFECT", a);
  }, []);

  useEffect(() => {
    console.log("교신중");
    // console.log("업데이트 됨. ")
    axios
      .post("/auth/idCheck", null, { params: { id: "mingu" } })
      .then(function (response) {
        console.log(response);
        setfirst(`[성공]`);
      })
      .catch(function (error) {
        console.log(error + "에러");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-37-93-48.ap-northeast-2.compute.amazonaws.com/product/all"
      )
      .then((res) => {
        console.log("8080없을때 성공");
        setDataState(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log("8080없을때 실패");
        console.log(error + "에러");
      });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickNext = () => {
    if (currentPage < Math.ceil(dataState.length / 9)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onLogout = () => {
    sessionStorage.removeItem("loginId");
    dispatch(checkLoginStatus(false));
  };

  const startIndex = (currentPage - 1) * 9;
  const endIndex = startIndex + 9;
  const data = dataState.slice(startIndex, endIndex);
  return (
    <>
      <MainNav>
        <MainLogo>얼마면 돼</MainLogo>
        {loginStatus ? (
          <MainLink to="/upload">
            <MainLogo>상품 등록하러가기</MainLogo>
          </MainLink>
        ) : (
          <></>
        )}
        {loginStatus ? (
          <LogoutH onClick={onLogout}>로그아웃</LogoutH>
        ) : (
          <MainLink to="/login">
            <MainLogo>로그인</MainLogo>
          </MainLink>
        )}
      </MainNav>
      <MainDiv>
        <HeadComment>이 가격 만족 하십니까?</HeadComment>
        <CardBox>
          {data.map((ob) => {
            const card = (
              <div>
                <Link to={`/testitem?ob-id=${ob.prod_no}`}>
                  <Card src={ob.path} alt="" />
                </Link>

                <p>{ob.prod_name}</p>
                <p>{ob.price}</p>
              </div>
            );
            return card;
          })}
        </CardBox>
        <ButtomDiv>
          <NiceBtn onClick={handleClickPrev}>이전</NiceBtn>
          <PageNumber>{currentPage}</PageNumber>
          <NiceBtn onClick={handleClickNext}>다음</NiceBtn>
        </ButtomDiv>
      </MainDiv>
    </>
  );
}
const Card = styled.img`
  width: 200px;
  height: 200px;
`;
const PageNumber = styled.h1`
  color: black;
`;

const NiceBtn = styled.button`
  background-color: #b2d260;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none; /* 밑줄 없앰 */
  display: inline-block;
  font-size: 12px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
`;

const ButtomDiv = styled.div`
  display: flex;
  margin: auto;
  gap: 10px;
  align-items: center;
  margin-top: 70px;
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;

const HeadComment = styled.h1`
  font-size: 4rem;
  line-height: 1.35;
  text-align: center;
`;
const CardBox = styled.div`
  display: flex;
  width: 1050px;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const MainNav = styled.div`
  background-color: #f49d1a;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  max-height: 7vw;

  z-index: 999;
  margin-bottom: 120px;
  display: flex;
  justify-content: space-around;
`;
const MainLogo = styled.h1`
  font-size: 2rem;
  line-height: 1.35;
  color: white;
`;
const MainLink = styled(Link)`
  text-decoration: none;
`;

const LogoutH = styled.h1`
  cursor: pointer;
  color: white;
`;
