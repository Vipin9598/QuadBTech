import React from 'react'
import {useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react';
import { setData } from '../slices/movieSlice';
import { useDispatch } from 'react-redux';
import {animate,easeInOut,motion} from "framer-motion"
const animationCard = (index)=>({
  initial:{
    opacity:0,
    x:-100
  },
  animate:{
    opacity:1,
    x:0,
    transition:{
      delay:0.1*index,
      duration:1,
    }
  }
})
const Home = () => {
    const [cardData,setCardData] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
      const fetchData = async()=>{
       const response = await fetch("https://api.tvmaze.com/search/shows?q=all")
       const data =await response.json();
       setCardData(data);
       console.log("data",data[0].show?.genres)
      }
      fetchData();
    },[])

    const clickHandler = async(data) => {
        console.log("data",data)
        dispatch(setData(data))
        navigate("/details")
    }
  return (
    <div className='flex flex-wrap gap-x-5 gap-y-10'>
      {
        cardData.length>0 && cardData.map((data,index)=>{
            return(
                <motion.div viewport={{once:true}} variants={animationCard(index)}  whileHover={{scale:1.1}} initial="initial" animate="animate"  key={data.show.id} className='h-[350px] w-[250px] mx-auto p-5 flex flex-col gap-5 border hover:scale-150 transition-all duration-300 shadow-md hover:shadow-2xl rounded-md '>
                    <div className='h-[250px] w-[200px] rounded-md overflow-hidden'>
                        <img src={data.show.image?.medium} className='h-full w-full'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Movie Name : {data.show.name}</p>
                        <p>Genres : <span>{data.show.genres[0]}</span> , <span>{data.show.genres[1]}</span>
                            </p>
                    </div>
                    <button onClick={()=>clickHandler(data)} className='px-5 py-1 rounded-md bg-blue-200 hover:bg-blue-500 hover:origin-left transition-all duration-500'>
                        More Details
                    </button>
                </motion.div>
            )
        })
      }
    </div>
  )
}

export default Home
