import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import spin from "../assets/spinner.gif";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Edit() {
    const {email, paddword} = useSelector(state => state.loginData);
    const [imgUploadStatus, setImgUploadStatus] = useState(true);
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [productPrice, setUploadPrice] = useState("");
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const inputImgRef = useRef();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const navigate = useNavigate();
    
    const editParam = searchParams.get("ob-id");
    const editInfo = editParam.split("?");

    const editId = editInfo[0];
    const curPrice = editInfo[1].split("=")[1];
    const editName = editInfo[2].split("=")[1];
    const editDesc = editInfo[3].split("=")[1];
    const editImg = editInfo[4].split("=")[1];
    
    // console.log(editInfo, editName.split("=")[1]);
    // console.log(email + "Edit 로그인 정보");

    useEffect(() => {
        setProductName(editName);
        setImgUrl(editImg);
        setProductDesc(editDesc);
    }, [])

    const onImgFormSubmit = async (e) => {
        e.preventDefault();
        // const price = Number(productPrice.replace(",", ""))

        const uploadData = {
            id: email,
            prod_name: productName,
            price: curPrice,
            cont: productDesc,
            path: imgUrl,
            cat_no: 1,
            prod_no: editId,
        }
        
        console.log(productName, curPrice, productDesc, imgUrl, editId);

    axios
        .put("/product/update", {...uploadData})
        .then((res) => {
            navigate(`/testitem?ob-id=${editId}`);
        })
        .catch((err) => {
            console.log("로그인 실패", err);
        });
        }

    const onPriceHandler = (e) => {
        const value= e.target.value;
        const removedCommaValue = Number(value.replaceAll(",", ""));
        setUploadPrice(removedCommaValue.toLocaleString());
    }

    const onProductNameHandler = (e) => {
        const name = e.target.value;
        setProductName(productName => name);
    }

    const onImgHandler = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const uploadImg = await uploadOnCloudinary(file);
        setLoading(false);
        setImgUploadStatus(true);
        setImgUrl(imgUrl => uploadImg.secure_url);
    }

    const onDescHandler = (e) => {
        setProductDesc(e.target.value);
    }

    const uploadOnCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "jyhiy65n");

        const result = await fetch(
            "https://api.cloudinary.com/v1_1/codycloud/upload",
            {
                method: "POST",
                body: data,
            }
        )

        return await result.json();
    }


    return (
        <UploadContainer>
            <UploadForm onSubmit={onImgFormSubmit}>
                <div>
                    <UploadDiv>
                        <label htmlFor="price">상품 이름</label>
                        <UploadInput name="price" id="price" type="string" onChange={onProductNameHandler} value={productName}/>
                    </UploadDiv>
                    <UploadDiv>
                        <label htmlFor="price">상품 설명</label>
                        <UploadTextArea name="price" id="price" type="textarea" onChange={onDescHandler} value={productDesc}/>
                    </UploadDiv>
                    <UploadDiv>
                        <ImgLabel htmlFor="img">상품의 이미지를 올려주세요</ImgLabel>
                        <ImgInput name="img" id="img" type="file" onChange={onImgHandler}/>
                    </UploadDiv>
                    <UploadBtn>상품 등록하기</UploadBtn>
                </div>
                <div>
                    {loading ? <SpinnerImg src={spin} alt="" /> : <></>}
                    {imgUploadStatus ? <Img src={imgUrl} alt="" /> : <></>}
                </div>
            </UploadForm>
        </UploadContainer>

    );
}

const UploadContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ececec;
`

const UploadForm = styled.form`
    display:flex;
    width:100%;
    height: 80vh;
    justify-content: center;
    align-items: center;
`

const UploadDiv = styled.div`
    justify-content: space-between;
    width: 80%;
    margin: 30px 0px;
`

const UploadInput = styled.input`
    border: none;
    border-bottom: 2px solid gray;
    font-size: 25px;
    background-color: #ececec;
    &:focus {
        outline: none;
        border-color: black;
    }
`

const UploadTextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    background-color: transparent;
    font-size: 20px;
`
const UploadPriceInput = styled.input`
    border: none;
    border-bottom: 2px solid gray;
    font-size: 25px;
    background-color: #ececec;
    text-align: right;
    &:focus {
        outline: none;
        border-color: black;
    }
`

const ImgInput = styled.input`
    display: none;
`
const ImgLabel = styled.label`
    color: #0096c7;
    font-weight: bold;
    border: 1px solid #0096c7;
    padding: 5px;
    &:hover {
        color: #ececec;
        background-color: #0096c7
    }
`
const UploadBtn = styled.button`
    color: black;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
    padding: 5px;
`

const Img = styled.img`
    width: 300px;
    height: 300px;
`

const SpinnerImg = styled.img`
    width:50px;
    height:50px;
`