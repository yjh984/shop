import React from "react";
import './Cart.scss';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import {loadStripe} from '@stripe/stripe-js';
import {makeRequest} from '../../makeRequest';

const Cart = () =>{

  const products = useSelector(state=>state.cart.products);
  // console.log('products:',products);
  const dispatch = useDispatch();

  const totalPrice=()=>{
    let total=0;
    products.forEach((item)=>{
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  }

  const stripePromise = loadStripe('pk_test_51MTmafDHQYxS5moDbIq1bQO2QpqOYEgFIdbrbSW4r5paFQf5BTOVLjFUoEIn6QVGEDUD9AS0MqrMLBzBMKQX99T500DknXfaUf');
  // const stripePromise = loadStripe('pk_test_51');

  const handlePayment = async()=>{
    try{
      // console.log('handlePayment');
      // const res=await makeRequest.post('http://localhost:1337/api/orders');
      const res = await makeRequest.post('/orders',{products});
      // const res = await makeRequest.post('/orders',{stripeId:'1',products:'222'});
      // const res = await makeRequest.post('/orders',{stripeId:'1',products:'222'});
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });

    }catch(err){
      console.log('handle:',err);
    }
  };

  return(
    <div className="cart">
      {/* <hr /> */}
      <h1>Products in your cart</h1>
      {products?.map((item)=>(
        <div className="item" key={item.id}>
          <img src={process.env.REACT_APP_UPLOAD_URL+item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0,100)}</p>
            <div className="price">{item.quantity} x ${item.price}</div>
          </div>
          <DeleteOutlineIcon className="delete" 
            onClick={()=>dispatch(removeItem(item.id))} />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset"
        onClick={()=>dispatch(resetCart())}>Reset Cart</span>
    </div>
  )
}

export default Cart;


// const data = [
//   {
//     id:1,
//     img:'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     img2:'https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Long Sleeve Graphic T-shirt',
//     desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//       Exercitationem possimus ex earum deleniti ut molestiae 
//       necessitatibus sequi, dolorem dolores nam iusto provident. 
//       Facilis repudiandae repellat fugiat vitae dolorum quisquam 
//       odit.`,
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id:2,
//     img:'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Coat',
//     desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//       Exercitationem possimus ex earum deleniti ut molestiae 
//       necessitatibus sequi, dolorem dolores nam iusto provident. 
//       Facilis repudiandae repellat fugiat vitae dolorum quisquam 
//       odit.`,
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
// ]