import React , {useContext,useEffect,useState} from 'react'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products } = useContext(ShopContext);

  const [ShowFilter , setShowFilter] = useState(false);
  const [fileteredProducts, setFilteredProducts] = useState([])
  const [category , setCategory] = useState([])
  const [subCategory , setSubCategory ] = useState([]);


  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  useEffect(()=>{
    setFilteredProducts(products)
  })

  useEffect(()=>{
   console.log(category)
  },[category])

  return (
    <div className='flex flex-col sm:flex-row gap-1 border-1 sm:gap-10 pt-10'>
      
      {/* Filter options */}

      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!ShowFilter)} className='cursor-pointer my-2 flex items-center gap-2'>FILTERS
        <img className={`sm:hidden h-3 ${ShowFilter? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" /> </p>
        {/* Category Filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ShowFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 font-medium text-sm' >CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
            </p>
          </div>
        </div>
          {/* Sub Category  */}
          
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${ShowFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 font-medium text-sm' >TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'}/>TopWear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'BottomWear'}/>BottomWear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'WinterWear'}/>WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'ALL'} text2={'COLLECTIONS'} />

         {/* product sort */}
         <select className='border-2 border-gray-300 text-sm px-2'>
          <option value="relevant">Sort by : Relevant</option>
          <option value="low-high">Sort by: low-high</option>
          <option value="high-low">Sort by : high-low</option>
         </select>
        </div>

        {/* Map Products  */}

        <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {
            fileteredProducts.map((item,index)=><ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
