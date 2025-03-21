import { useState, useEffect } from "react"
import Axios from "axios"
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import UserUpdate from "./UserUpdate";


const Users=()=>{

const [user,setUser] = useState([])

const [MyUpdatUser,SetMyUpdatUser]=useState([])

const [UserUpdateState,setUserUpdateState] = useState(false)

const getUser = async ()=> {
    const {data} = await Axios.get("http://localhost:1233/api/User")
    setUser(data)
}

const deleteUser = async (id)=> {
    const {data} = await Axios.delete(`http://localhost:1233/api/User/${id}`)
    getUser();
}

const updateUserEzer = (user)=>{
    SetMyUpdatUser(user)
    setUserUpdateState(true)
}

useEffect(()=>{
    getUser()
},[])



const itemTemplate = (user) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                    <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                        <div className="flex flex-column gap-1">
                            <div className="text-2xl font-bold text-900">{user.name}</div>
                            <div className="text-700">{user._id}</div>
                        </div>
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-building"></i>
                                <span className="font-semibold">{user.address}</span>
                            </span>
                        </div>
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-envelope"></i>
                                <span className="font-semibold">{user.email}</span>
                            </span>
                        </div>
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-phone"></i>
                                <span className="font-semibold">{user.phone}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                        <Button icon="pi pi-user-minus" label="Delet" onClick={()=>{deleteUser(user._id)}} ></Button>
                        <Button icon="pi pi-user-edit" label="update"  onClick={()=>{ updateUserEzer(user)}}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

return (
    
    <div className="card">
          <div className="card flex justify-content-center">
                    <Button label="Add User" onClick={()=>setUserUpdateState(true)} />
                </div>
        {
         UserUpdateState?<UserUpdate setUserUpdateState={setUserUpdateState}  visible={UserUpdateState}  setUser={setUser} user={user} SetMyUpdatUser={SetMyUpdatUser} MyUpdatUser={MyUpdatUser}></UserUpdate>:
    user.length>0?<DataScroller value={user} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />:  <><h1>No Users!</h1></>
        }
    </div>
)
}

export default Users