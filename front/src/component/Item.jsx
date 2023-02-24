import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const itemDummyData = {
  userName: "딩근나무",
  itemName: "[미개봉] 애플워치 7세대",
  imgUrl:
    "https://images.unsplash.com/photo-1602174528367-7ed9fc0737e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  price: 369000,
  desc: "사용감 별로 없는 애플워치SE 얼마면 될까요?. 작년 11월경에 잠실에 위치한 애플스토어에서 구입한 정품입니다. 구매당시 479,000원에 구입했고 중고로 30만원정도 받으면 괜찮을까요?",
};

export default function Item() {
  const [item, setItem] = useState(itemDummyData);
  const [priceColor, setPriceColor] = useState("white");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objectId = searchParams.get("ob-id");

  //   useEffect(() => {
  //     console.log("hi");
  //     axios
  //       .get("/list")
  //       .then((res) => {
  //         res.map((object) => {
  //           object.id === objectId && setItem(object);
  //           return object;
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error + "에러");
  //       });
  //   }, []);
  const onPriceUpHandler = async () => {
    setItem((el) => {
      return {
        ...el,
        price: el.price * 1.1,
      };
    });
    setPriceColor("#9bf6ff");
    await priceUpColorChange("");
  };
  const onPriceDownHandler = async () => {
    setItem((el) => {
      return {
        ...el,
        price: el.price * 0.9,
      };
    });
    setPriceColor("#ffadad");
    await priceUpColorChange("");
  };

  const priceUpColorChange = async (color) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setPriceColor(color);
        resolve();
      }, 200);
    });
  };

  return (
    <ItemContainer>
      <ItemInnerContainer>
        <ImgContainer>
          <ItemImg src={item.imgUrl} alt="" />
        </ImgContainer>
        <ItemIinfoContainer>
          <h1>{objectId}</h1>
          <div>
            <h4>작성자: {item.userName}</h4>
          </div>
          <div>
            <h2>{item.itemName}</h2>
          </div>
          <ItemPrice>
            <CurrentPrice>
              희망 가격:{" "}
              <CurrentPriceSpan color={priceColor}>
                {" "}
                {parseInt(item.price).toLocaleString()}원
              </CurrentPriceSpan>
            </CurrentPrice>
            <PriceBtnDiv>
              <PriceUp onClick={onPriceUpHandler}>
                올려요
                <FontAwesomeIcon icon={faSmile} />
              </PriceUp>
              <PriceDown onClick={onPriceDownHandler}>
                비싸요
                <FontAwesomeIcon icon={faAngry} />
              </PriceDown>
            </PriceBtnDiv>
          </ItemPrice>
          <ItemDesc>
            <div>{itemDummyData.desc}</div>
          </ItemDesc>
        </ItemIinfoContainer>
      </ItemInnerContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  background-color: #ececec;
  padding: 20px;
  // background-image: url("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
`;

const ItemInnerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 100%;
  max-height: 800px;
  border-radius: 10px;
  background-color: #343a40;
  color: #e9ecef;
  box-shadow: 3px 5px 10px black;
  min-width: 500px;
  max-width: 1200px;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ItemImg = styled.img`
  min-width: 500px;
  max-width: 700px;
  height: auto;
  max-height: 500px;
  border-radius: 10px;
`;

const ItemIinfoContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  padding: 30px;
`;

const ItemPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #ffffff;
  margin-bottom: 20px;
`;
const CurrentPrice = styled.h3``;

const CurrentPriceSpan = styled.span`
  color: ${(props) => props.color || "white"};
`;

const PriceBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 150px;
`;

const PriceUp = styled.div`
  font-weight: bold;
  color: #9bf6ff;
  background-color: #343a40;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 3px 3px 2px black;
`;

const PriceDown = styled.div`
  font-weight: bold;
  color: #ffadad;
  background-color: #343a40;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: 3px 3px 2px black;
`;

const ItemDesc = styled.div`
  font-weight: bold;
`;
