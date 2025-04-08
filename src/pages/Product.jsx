import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/newspapers/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        const response2 = await fetch(
          `http://localhost:3000/api/newspapers/category/${data.category}`
        );
        const data2 = await response2.json();
        const filtered = data2.filter((item) => item.id !== data.id);
        setSimilarProducts(filtered);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProduct();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 col-sm-12 py-3">
          <img
            className="img-fluid"
            src={product.image}
            alt={product.title}
            width="400px"
            height="400px"
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <h3 className="display-6 my-4">₹{product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <Link to="/cart" className="btn btn-dark mx-3">
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );

  const Loading2 = () => (
    <div className="my-4 py-4 d-flex">
      {[1, 2, 3, 4].map((_, idx) => (
        <div className="mx-4" key={idx}>
          <Skeleton height={400} width={250} />
        </div>
      ))}
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4 d-flex">
      {similarProducts.map((item) => (
        <div key={item.id} className="card mx-4 text-center">
          <img
            className="card-img-top p-3"
            src={item.image}
            alt="Card"
            height={300}
            width={300}
          />
          <div className="card-body">
            <h5 className="card-title">
              {item.title.length > 20 ? `${item.title.substring(0, 17)}...` : item.title}
            </h5>
            <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
              Buy Now
            </Link>
            <button
              className="btn btn-dark m-1"
              onClick={() => addProduct(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also Like</h2>
            <Marquee pauseOnHover pauseOnClick speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
