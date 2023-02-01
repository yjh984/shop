import React, { useState } from "react";
import './Product.scss';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () =>{

  const id=useParams().id;
  const [selectedImg, setSelectedImg] = useState('img');
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  const {data, loading, error} = useFetch(
    `/products/${id}?populate=*`
  );

  // console.log({process.env.REACT_APP_UPLOAD_URL+data?.attributes[isNew]})
  // console.log(data?.attributes['isNew']);

  return(
    <div className="product">
      {error? 'something wrong!!': (
        loading? "loading..."
        :(<>
        <div className="left">
          <div className="images">
            <img src={process.env.REACT_APP_UPLOAD_URL+data?.attributes?.img?.data?.attributes?.url}
             onClick={e=>setSelectedImg('img')} alt="" />
            <img src={process.env.REACT_APP_UPLOAD_URL+data?.attributes?.img2?.data?.attributes?.url}
             onClick={e=>setSelectedImg('img2')} alt="" />
          </div>
          <div className="mainImg">
            {/* main image */}
            <img src={process.env.REACT_APP_UPLOAD_URL+data?.attributes[selectedImg]?.data?.attributes?.url} alt="" />
            {/* <img src={process.env.REACT_APP_UPLOAD_URL+data?.attributes?.[selectedImg]?.img?.data?.attributes?.url} alt="" /> */}
          </div>
        </div>
        <div className="right">
          <h2>{data?.attributes?.title}</h2>
          <span className="price">${data?.attributes?.price}</span>
          <p>{data?.attributes?.desc}</p>
          <div className="quantity">
            <button onClick={e=>setQuantity(prev=>prev===0? 0 : prev-1)}>-</button>
            {quantity}
            <button onClick={e=>setQuantity(prev=>prev+1)}>+</button>
          </div>
          <button className="add" onClick={()=>dispatch(
            addToCart({
              id: data.id,
              title: data.attributes.title,
              desc: data.attributes.desc,
              price: data.attributes.price,
              img: data.attributes.img.data.attributes.url,
              quantity,
            })
          )}>
            <AddShoppingCartIcon/> ADD TO CART
          </button>
          <div className="links">
            <div className="item">
              <FavoriteBorderIcon/> ADD TO WISH LIST
            </div>
            <div className="item">
              <BalanceIcon/> ADD TO COMPARE
            </div>
          </div>
          <div className="info">
            <span>Vendor: Polo</span>
            <span>Product Type: T-shirt</span>
            <span>Tag: T-shirt, Women, Top</span>
            {/* <hr/> */}
          </div>
          <hr />
          {/* <hr /> */}
          <div className="info">
            <span>DESCRIPTION</span>
            <div className="line">
            ---------------------------------
            </div>
            {/* <hr /> */}
            {/* <hr /> */}
            <span>ADDITIONAL INFORMATION</span>
            {/* <hr /> */}
            <div className="line">
            ---------------------------------
            </div>
            <span>FAQ</span>
          </div>
          {/* <hr /> */}
        </div>
      </>))}
    </div>
  )
}

export default Product;



// const images=[
//   'https://images.pexels.com/photos/10026491/pexels-photo-10026491.png?auto=compress&cs=tinysrgb&w=1600',
//   'https://images.pexels.com/photos/12179283/pexels-photo-12179283.jpeg?auto=compress&cs=tinysrgb&w=1600',
// ];
