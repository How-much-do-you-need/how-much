import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const itemDummyData = {
  id: "딩근나무",
  prod_name: "[미개봉] 애플워치 7세대",
  path:
    "https://images.unsplash.com/photo-1602174528367-7ed9fc0737e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  price: 369000,
  cont: "사용감 별로 없는 애플워치SE 얼마면 될까요?. 작년 11월경에 잠실에 위치한 애플스토어에서 구입한 정품입니다. 구매당시 479,000원에 구입했고 중고로 30만원정도 받으면 괜찮을까요?",
};

export default function Item() {
  const [item, setItem] = useState(itemDummyData);
  const [priceColor, setPriceColor] = useState("white");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [btnClick, setBtnClick] = useState(false);
  const objectId = searchParams.get("ob-id");
  const { email, password } = useSelector(state => state.loginData);

  // console.log(email + "로그인된 유저 정보");
  useEffect(() => {
    axios
    .get("/product/all")
    .then((res) => {
      // console.log(22,res.data)
      res.data.map((object) => {
        if (object.prod_no == Number(objectId)){
          setItem(object);
              // console.log(21,item, object);
            }
          });
        })
        .catch(function (error) {
          console.log(error + "에러");
        });
      }, []);

      useEffect(()=>{
        console.log(email, objectId, item, "상품 클릭시!!!!!!!!!!!!!!!!!!!!!!!!!1");
        axios.post("/product/button", null, {params: {id: email, prod_no: objectId}})
          .then((res) => {
            setBtnClick(res.data);
            console.log(res.data + "버튼 클릭 확인");
          })
          .catch((err) => {
            console.log(err, "버튼 클릭 확인 실패");
          })
      }, []);


      const onPriceUpHandler = async () => {
        setItem((el) => {
          return {
            ...el,
            price: el.price * 1.1,
          };
        });
        setPriceColor("#9bf6ff");
        await priceUpColorChange("");
        setBtnClick(true);
        changePrice(item.price * 1.1);
        onBtnClickAxios();
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
        setBtnClick(true)
        changePrice(item.price * 0.9);
        onBtnClickAxios();
  };

  const onBtnClickAxios = () => {

    const button = {
      push_check: true,
      id: email,
      prod_no: objectId,
    }
    axios.post("/product/pushButton", {...button})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const changePrice = (chagnePrice) => {
    axios
    .post("/product/updatePrice", {...item, price: chagnePrice}, {params: {id: email}})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err + "가 발생");
    })
  }


  const priceUpColorChange = async (color) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setPriceColor(color);
        resolve();
      }, 300);
    });
  };

  return (
    <ItemContainer>
      <ItemInnerContainer>
        <ImgContainer>
          <ItemImg src={item.path} alt="" />
        </ImgContainer>
        <ItemIinfoContainer>
          <Link to="/"><PriceDown>뒤로가기</PriceDown></Link>
          <h1>{item.prod_name}</h1>
          <div>
            <h4>작성자: {item.id}</h4>
          </div>
          <div>
            <h2>{item.cont}</h2>
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
              {
                btnClick || (<><PriceUp onClick={onPriceUpHandler}>
                  올려요
                  <FontAwesomeIcon icon={faSmile} />
                </PriceUp>
                <PriceDown onClick={onPriceDownHandler}>
                  비싸요
                  <FontAwesomeIcon icon={faAngry} />
                </PriceDown></>)
              }
            </PriceBtnDiv>
            <Link to={`/edit?ob-id=${objectId}?prod-price=${item.price}?prod-name=${item.prod_name}?prod-desc=${item.cont}?prod-img=${item.path}`}><PriceUp>Edit</PriceUp></Link>
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
  width: 400px;
  height: 400px;
  // height: auto;
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
