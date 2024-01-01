import React, { useEffect, useState } from 'react';
import { TERipple } from 'tw-elements-react';
import SectionTitle from '../SectionTitle/SectionTitle';
import './products.css'
import { Rating } from '@mui/material';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        fetchProducts();
      }, []);

      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

      useEffect(() => {
        return () => {
          localStorage.setItem('cart', JSON.stringify(cart));
        };
      }, [cart]);
    
      const fetchProducts = async () => {
        try {
          const response = await fetch('https://dummyjson.com/products');
          const data = await response.json();
          setProducts(data.products);
          setFilteredProducts(data.products);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
    
      const handleSearch = () => {
        const filtered = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      };

      const handlePriceFilter = (minPrice, maxPrice) => {
        let filtered = products;
    
        if (minPrice !== null) {
          filtered = filtered.filter((product) => product.price >= minPrice);
        }
    
        if (maxPrice !== null) {
          filtered = filtered.filter((product) => product.price <= maxPrice);
        }
    
        setFilteredProducts(filtered);
      };

      const addToCart = (productId) => {
    const selectedProduct = products.find(product => product.id === productId);

    // Check if the product is already in the cart
    const isProductInCart = cart.some(item => item.id === productId);

    if (isProductInCart) {
        // If the product is in the cart, update the quantity
        const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    } else {
        // If the product is not in the cart, add it with quantity 1
        setCart([...cart, { ...selectedProduct, quantity: 1 }]);
    }
    };
    
      const removeCartItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
      };
    
      const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price, 0);
      };

    return (
        <>
        <SectionTitle heading={'Products'}/>
        <div className="mb-3 md:w-96 mx-auto my-4">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search products by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search"
                        aria-describedby="button-addon1" />

                    {/* <!--Search button--> */}
                    <TERipple color='light'>
                    <button
                        className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="submit"
                        onClick={handleSearch}
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                    </TERipple>
                </div>
            </div>
           <div className='flex justify-normal my-2'>
           <SectionTitle heading={'Price Filter'}/>
           </div>
         <div className="grid grid-cols-5 gap-2 my-3 justify-center">
       
        <button className='btn btn-sm btn-secondary' onClick={() => handlePriceFilter(null, 50)}>Below $50</button>
        <button className='btn btn-sm btn-secondary' onClick={() => handlePriceFilter(50, 100)}>$50 - $100</button>
        <button className='btn btn-sm btn-secondary' onClick={() => handlePriceFilter(100, 200)}>$100 - $200</button>
        <button className='btn btn-sm btn-secondary' onClick={() => handlePriceFilter(200, null)}>Above $200</button>
        <button className='btn btn-sm btn-secondary' onClick={() => handlePriceFilter(null, null)}>Show All</button>
      </div>

      <div className="cart-container">
      <div><strong>Cart</strong>: {cart.length}</div>
        <div>
          {cart?.map((item) => (
            <>

            <div key={item.id} className="cart-item">
              {item.title} - ${item.price}
              <button className='btn btn-sm bg-red-500 text-white hover:bg-red-900' onClick={() => removeCartItem(item.id)}>Remove</button>
            </div>
            </>
          ))
        }
        </div>
        <div><strong>Total Amount</strong>: ${calculateTotalAmount()}</div>
      </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full mx-auto p-2 ">
	{
        filteredProducts?.map(product =>
            <div
        className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <TERipple>
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              className="rounded-t-lg w-4/5"
              src={product?.images[1] }
              alt="" />
            <a href="#!">
              <div
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            </a>
          </div>
        </TERipple>
        <div className="p-6 relative">
          <h5
            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {product?.title}
          </h5>
          <h2><strong>Price:</strong> ${product?.price} </h2>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {product?.description}
          </p>
          <p className='flex items-center gap-2 my-4'>
          <Rating className='rating' name="rating " defaultValue={product?.rating} precision={0.5} readOnly /> 
          {product?.rating}
          </p>
          <TERipple>
            <button
            onClick={() => addToCart(product.id)}
              type="submit"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Add to Cart
            </button>
          </TERipple>
        </div>
      </div>
            )
    }
</div>
</>
    );
};

export default Products;