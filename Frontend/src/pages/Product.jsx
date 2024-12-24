import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const { productId } = useParams();
  const {products , currency , addToCart } = useContext(ShopContext);
  const [productData , setProductData] = useState(false);
  const [image , setImage] = useState('')
  const [ size , setSize] = useState('')
 
  const fetchProductData = async () =>{
       
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item); 
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=>{
  fetchProductData();
  },[productId])
  return productData?(
    <div className='border-t pt-10 transition-opacity ease-in-out duration-500 opacity-100'>
      {/* ------------ Product Data ---------- */}
       <div className='flex gap-12 sm:gap-12 sm:flex-row'>
           {/* ------------ Product Images ---------- */}
           <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
             <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
               {
                productData.image.map((item,index)=>(<img onClick={()=>setImage(item)} src={item} key={index} className='w-[25%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />))
               }
             </div>
             <div className='w-full sm:w-[80%]'>
                   <img src={image} alt="prod-img" className='w-full h-auto' />
             </div>
           </div>
           {/* -------------Product Info ---------- */}
           <div className='flex-1'>
            <h1 className='font-medium mt-3 text-2xl'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon}  /><img src={assets.star_icon}  /><img src={assets.star_icon}  /><img src={assets.star_icon}  /><img src={assets.star_dull_icon}  />
              <p className='pl-2' >(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                 {productData.sizes.map((item,index)=>(<button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`} key={index}>{item}</button>))}
              </div>
            </div>
            <button onClick={()=>{addToCart(productData._id,size)}} className='bg-black text-white py-3 px-8 text-sm active:bg-gray-700 '>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5 '/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p >100% Original Product</p>
              <p >Cash on delivery is available on this product</p>
              <p >Easy return and exchange policy within 7 days</p>
            </div>
           </div>
       </div>
       {/* ------------------------Review Section------------ */}
       <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 '>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita placeat rem vitae ad quo commodi earum, aliquam rerum, quaerat deleniti fugiat ipsum reiciendis quibusdam nihil tenetur unde possimus minima consectetur at consequuntur repellendus provident repellat odio? Temporibus atque obcaecati ut natus facere placeat quasi nesciunt? Corporis amet unde iusto soluta.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, nobis cum tenetur sapiente omnis cumque provident eos quasi quaerat incidunt rerum dignissimos. Vitae, a nostrum.</p>
        </div>
       </div>

       {/* --------------------- Display related products ------------- */}
       <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
}

export default Product
