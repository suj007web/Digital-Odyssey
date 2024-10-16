import useGetAllJobs from "@/hooks/useGetAllJobs"
import CategoryCarousel from "./CategoryCarousel"
import Hero from "./Hero"
import LatestJobs from "./LatestJobs"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {
  const {user} = useSelector(store=>store.auth); 
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate("/admin/companies")
    }
  }) 
  useGetAllJobs()
  return (
    <>
    <Hero/>
    <CategoryCarousel/>
    <LatestJobs/>
    </>
  )
}

export default Home