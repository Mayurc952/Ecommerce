
import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaDeta";


const product = {
  name:"shirts",
  images:[{url:"https://assets.ajio.com/medias/sys_master/root/20210403/OjjF/6068dc44aeb269a9e33a52e1/-473Wx593H-462103975-pink-MODEL.jpg"}],
  price: 25000,
  _id:"mayur"
}


const Home = () => {


  return (
    <Fragment>
    <MetaData title="ECOMMERCE" />

    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse />
        </button>
      </a>
    </div>

    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>
      <Product product={product}/>

      {/* {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
    </div>
  </Fragment>
   
  )
}

export default Home
