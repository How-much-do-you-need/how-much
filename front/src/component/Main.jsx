import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Main() {
  const dummyData = [
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
    {
      img: "https://dnvefa72aowie.cloudfront.net/origin/article/202301/3e98aba5763845724126688c4050d365e7d07944de5844d4e346f8a38e6670ac.webp?q=82&s=300x300&t=crop",
      name: "스팸",
      currentPrice: "1000",
      stack: 1,
    },
  ];

  // fetch("http://localhost:8080/auth")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  const [first, setfirst] = useState("실패");

  useEffect(() => {
    console.log("교신중");
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
  return (
    <>
      <MainNav>
        <MainLogo>얼마면 돼</MainLogo>
        <Link to="/login">
          <h1>to log in</h1>
        </Link>
        <Link to="/register">
          <h1>to register</h1>
        </Link>
      </MainNav>
      <MainDiv>
        <HeadComment>이 가격 만족 하십니까?</HeadComment>
        <h1>백엔드와의 교신에 {first}했습니다</h1>
        <CardBox>
          {dummyData.map((ob) => {
            const card = (
              <div>
                <img src={ob.img} alt="" />
                <p>{ob.name}</p>
                <p>{ob.currentPrice}</p>
              </div>
            );
            return card;
          })}
        </CardBox>
      </MainDiv>
    </>
  );
}
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
  max-height: 5vw;

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
