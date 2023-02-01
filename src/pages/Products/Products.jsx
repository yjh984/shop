import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import List from "../../components/List/List";
import './Products.scss';
import useFetch from '../../hooks/useFetch';

const Products = () =>{

  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState('asc');
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const {data, loading, error} = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChangeCheckBox=(e)=>{
    const value=e.target.value;
    const isChecked=e.target.checked;

    setSelectedSubCats(
      isChecked? [...selectedSubCats,value]
      : selectedSubCats.filter((item)=>item!==value)
    );
  };

  // console.log(selectedSubCats);

  return(
    <div className="products">
      {error? 'something wrong!!':(
        loading? 'loading...'
        : (<>
        <div className="left">
          <div className="filterItem">
            <h2>Product Categories</h2>
            {data?.map((item)=>(
              <div className="inputItem" key={item.id}>
                <input type="checkbox" name="" id={item.id} value={item.id}
                  onChange={handleChangeCheckBox} />
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
          </div>
          <div className="filterItem">
            <h2>Filter by price</h2>
            <span>0</span>
              <input type="range" min={0} max={1000} value={maxPrice} name="" id=""
                onChange={e=>setMaxPrice(e.target.value)} />
            <span>{maxPrice}</span>
          </div>
          <div className="filterItem">
            <h2>Sort by</h2>
            <div className="inputItem">
              <input type="radio" name="price" id="asc" value='asc'
                onChange={e=>setSort('asc')}
                checked={sort==='asc'? 'checked':''}/>
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>
            <div className="inputItem">
              <input type="radio" name="price" id="desc" value='desc'
                onChange={e=>setSort('desc')}/>
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>
        <div className="right">
          <img src='https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600'
          alt="" className="catImg" />
          <List catId={catId} maxPrice={maxPrice} sort={sort}
            subCats={selectedSubCats}/>
        </div>
        {/* <div className="images">
          <List/>
        </div> */}
      </>))}
    </div>
  )
}

export default Products;