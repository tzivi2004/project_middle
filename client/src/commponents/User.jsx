import React, { useState, useEffect } from 'react';
 import { DataTable } from 'primereact/datatable';
 import { Column } from 'primereact/column';
 import { MultiSelect } from 'primereact/multiselect';
// import { ProductService } from './service/ProductService';

const allUsers=()=>{
    const columns = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' },
        { field: 'phone', header: 'Phone' }
    ];
return (
    <>

<h1>User</h1>



    </>
)
}

export default allUsers