import { useState, useEffect } from "react"
import Axios from "axios"


const Users=()=>{

const [user,setUser] = useState([])

const getUser = async ()=> {
    const {data} = await Axios.get("http://localhost:1233/api/User")
    setUser(data)
}

useEffect(()=>{
    getUser()
},[])

return (
    <>
<h1>User</h1>
{
  user.map((item)=>{
return <div>
    {item.name}
</div>
  })  
}
    </>
)
}

export default Users