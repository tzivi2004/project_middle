import React, { useRef } from 'react'; 
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import {Dialog} from "primereact/dialog"
import { useState, useEffect } from "react"
import Axios from "axios"
import User from './User';


const UserUpdate = ({visible,setUserUpdateState,setUser,user,SetMyUpdatUser,MyUpdatUser})=>{

    const newUser=useRef({_id:MyUpdatUser._id,name:MyUpdatUser.name,username:MyUpdatUser.username,address:MyUpdatUser.address,email:MyUpdatUser.email,phone:MyUpdatUser.phone})
    // const newName = useRef()
    // const newUserName = useRef()
    // const newaddress = useRef()
    // const newName = useRef()
    // const newName = useRef()
    // const [name, setName] = useState(MyUpdatUser.name || "");
    // const [userName, setUserName] = useState(MyUpdatUser.name || "");

    const updateUser = async ()=> {
        // newUser.name=name
        // console.log(newUser.current.value);
        //  SetMyUpdatUser(newUser.current.value)
        console.log(MyUpdatUser);
        newUser.current.name="tzivi1"
        console.log(newUser);
        SetMyUpdatUser(user[1])
        console.log(MyUpdatUser);
        debugger
        const {data} = await Axios.put("http://localhost:1233/api/User", MyUpdatUser)

        setUserUpdateState(false);
    }

    const addeUser = async ()=> {
        // const {data} = await Axios.post("http://localhost:1233/api/User")
        setUserUpdateState(false);
    }
return (  
<>

<div className="card flex justify-content-center">
<Dialog className="card flex flex-column md:flex-row gap-3" header={MyUpdatUser.name?"Update" :"Add"} visible={visible} modal={false} style={{ width: '50vw' }}
 onHide={() => {if (!visible) return; MyUpdatUser.name?updateUser() :addeUser()  }} >
    {newUser.current.id}
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
        </span>
        <InputText placeholder={MyUpdatUser.name?MyUpdatUser.name :"Name"} />
        
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
        </span>
        <InputText placeholder={MyUpdatUser.username?MyUpdatUser.username :"Username"}  />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
        <i className="pi pi-building"></i>
        </span>
        <InputText placeholder={MyUpdatUser.address?MyUpdatUser.address :"Address"} />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-envelope"></i>
            </span>
        <InputText placeholder={MyUpdatUser.email?MyUpdatUser.email :"Email"}  />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
        <InputText placeholder={MyUpdatUser.phone?MyUpdatUser.phone :"Phone"} />
    </div>
</Dialog>
</div>
</>
)
}

export default UserUpdate