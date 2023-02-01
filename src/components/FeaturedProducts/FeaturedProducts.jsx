import React from "react";
import useFetch from "../../hooks/useFetch";
import Card from "../Card/Card";
import './FeaturedProducts.scss';

const FeaturedProducts=({type})=>{

  const {data, loading, error} = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`);

  return(
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          deleniti, earum laborum quam cupiditate architecto, labore
          molestiae, commodi quod nesciunt officiis expedita et. Delectus 
          iusto nihil, hic mollitia deserunt praesentium?
        </p>
      </div>
      <div className="bottom">
        {error? "something wrong!!":
          (loading? "loading...":
            data?.map(item=>(<Card item={item} key={item.id}/>)))
        }
      </div>
    </div>
  )
}

export default FeaturedProducts;

// const data = [
//   {
//     id:1,
//     img:'https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     img2:'https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Long Sleeve Graphic T-shirt',
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id:2,
//     img:'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Coat',
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id:3,
//     img:'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Skirt',
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id:4,
//     img:'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1600',
//     title: 'Hat',
//     oldPrice: 19,
//     price: 12,
//   },
// ];