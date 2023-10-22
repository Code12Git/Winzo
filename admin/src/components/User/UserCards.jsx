'use client'
import { privateRequest } from '@/helpers/axios'
import UserCard from './UserCard'
import { useEffect } from 'react'
const UserCards = (req,res) => {
 
  useEffect(()=>{
    const fetchUsers=async()=>{
      const data=await privateRequest.get('/superadmin')
      // console.log(data)
    }
    fetchUsers()
  },[])
  
  return (
   <div className="flex flex-col gap-8">
  <UserCard />
   </div>
  )
}

export default UserCards