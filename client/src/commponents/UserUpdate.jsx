import React from 'react'; 
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import {Dialog} from "primereact/dialog"
import { useState, useEffect } from "react"
import Axios from "axios"
import User from './User';


const UserUpdate = ({visible,setUserUpdateState,setUser,user,SetMyUpdatUser,MyUpdatUser})=>{

    const updateUser = async ()=> {
        const {data} = await Axios.put("http://localhost:1233/api/User")
        setUser(data)
    }

return (  
<>

<div className="card flex justify-content-center">
<Dialog className="card flex flex-column md:flex-row gap-3" header="Update" visible={visible} modal={false} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setUserUpdateState(false); }} >
    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
        </span>
        <InputText placeholder={MyUpdatUser.name} />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
        </span>
        <InputText placeholder={MyUpdatUser.username}  />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
        <i className="pi pi-building"></i>
        </span>
        <InputText placeholder={MyUpdatUser.address} />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
            <i className="pi pi-envelope"></i>
            </span>
        <InputText placeholder={MyUpdatUser.email}  />
    </div>

    <div className="p-inputgroup flex-1">
        <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
        <InputText placeholder={MyUpdatUser.phone} />
    </div>
</Dialog>
</div>
</>
)
}

export default UserUpdate