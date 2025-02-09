import React ,{useState} from 'react'
import { BiSolidImageAdd } from "react-icons/bi";
import cakeIcon from '/birthday-cake-cake-food-svgrepo-com.svg'
import { GoPencil } from "react-icons/go";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { GiWrappedSweet } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { RiDiscountPercentLine } from "react-icons/ri";




{/* <BiSolidImageAdd /> add image icon
  
  
  pen:   <GoPencil />
  collections:  <HiOutlineCollection />
  filling:  <MdOutlineCoffeeMaker />
  topping: <GiWrappedSweet />
  price:  <ImPriceTag />
  discount:  <RiDiscountPercentLine />

  
  

  
  */}



const AddNewCake = () => {

  const [file, setFile] = useState([]);
  const [text, setText] = useState([]);
  const [] = useState([]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  function handleSubmit() {

  }

  


  return (
    <div className='h-auto flex flex-col align-middle gap-8 '>

     <h2 className='text-center mt-8 border-b border-[#E5C1C1]  mx-auto pb-4'><span className='text-[#E5C1C1] text-2xl flex gap-4 whitespace-nowrap'>Add New Cake <img 
     src={cakeIcon} alt="cake icon" className='w-8 h-8'/></span></h2>

    {/* add cake form start */}
          
    <div className='mx-auto'>
    
    <h3 className=' text-[#cea1a1] text-center font-bold text-xl'>Add Image</h3>
     <form onSubmit={handleSubmit} className='mx-auto px-4 lg:px-0'>
      
     <div className="w-full max-w-md p-4 border-2 border-dashed rounded-md text-center mx-auto mt-6 mb-6">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-gray-400">
            <br />
            <br />
            <div className="mt-2 mx-auto text-[#cea1a1]"><BiSolidImageAdd size={24} className='mx-auto'/></div>
            <br />
            <br />
          </div>
        </label>
        {file && (
          <div className="mt-2 text-sm text-gray-500">
           {file.name}
          </div>
        )}
      </div>


      <div className='flex gap-4 flex-wrap lg:flex-nowrap'>  
         <input
          type="text"
          maxLength="40"
          placeholder="Cake Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4" />
         <input 
          type="text"
          maxLength="40"
          placeholder="Collections"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4"
         />   
         
      </div>
      <div className='flex gap-4 flex-wrap lg:flex-nowrap'>  
         <input
          type="text"
          maxLength="40"
          placeholder="Cake Filling "
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4" />
         <input 
          type="text"
          maxLength="40"
          placeholder="Toppings"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4"
         />   
         
      </div>
      <div className='flex gap-4 flex-wrap lg:flex-nowrap'>  
         <input
          type="text"
          maxLength="40"
          placeholder="Price"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4" />
         <input 
          type="text"
          maxLength="40"
          placeholder="Discount "
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 my-4"
         />   
         
      </div>

      <input type="submit"  value={'Add'} className='text-3xl font-bold text-center text-white mx-auto cursor-pointer bg-[#E5C1C1] rounded-md w-full py-4' />

     </form>

    </div>

    {/* add cake form end */}

    </div>
  )
}

export default AddNewCake



