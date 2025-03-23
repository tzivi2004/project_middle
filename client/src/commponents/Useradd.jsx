import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import Axios from "axios"
// import { CountryService } from '../service/CountryService';
// import './flags.css';

export const Useradd = ({ visible, setUserUpdateState, setUser, user, SetMyUpdatUser, MyUpdatUser, getUser }) => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [un, setUn] = useState(false);

    // const countryservice = new CountryService();

    const defaultValues = {
        name: MyUpdatUser.name,
        email: MyUpdatUser.email,
        username: MyUpdatUser.username,
        address: MyUpdatUser.address,
        phone: MyUpdatUser.phone
        // date: null,
        // country: null,
        // accept: false
    }

    useEffect(() => {
        // countryservice.getCountries().then(data => setCountries(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addUser = async (datas) => {

        try {
            const res = await Axios.post("http://localhost:1233/api/User", datas)

            setUser([...user, res.data])
            setUserUpdateState(false)
        }
        catch (ex) {

        }
    }

    const UpdateUser = async (datas) => {
        datas._id = MyUpdatUser._id;
        console.log(datas);
        const { data } = await Axios.put("http://localhost:1233/api/User", datas)
        getUser()
        setUserUpdateState(false)
    }

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        if (MyUpdatUser.name) {
            UpdateUser(data)
        }
        else {
            addUser(data)

        }
        // MyUpdatUser.name ? UpdateUser() :addUser()
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    
const isUnique = async (username) => {
        const response = user.filter(e=>e.username==username);
       if (response){
        setUn(true)
        return true
       }
        // Ensure your API returns a boolean indicating uniqueness
   
        return false; // or handle the error as needed
    
};

    // const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    //  const passwordHeader = <h6>Pick a password</h6>;
    // const passwordFooter = (
    //     <React.Fragment>
    //         <Divider />
    //         <p className="mt-2">Suggestions</p>
    //         <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
    //             <li>At least one lowercase</li>
    //             <li>At least one uppercase</li>
    //             <li>At least one numeric</li>
    //             <li>Minimum 8 characters</li>
    //         </ul>
    //     </React.Fragment>
    // );

    return (
        <div className="form-demo">
            {/* <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog> */}

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center"></h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            {/* //name */}
                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>{MyUpdatUser.name ? MyUpdatUser.name : "Name*"}</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        {/* username */}

                        {/* <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} /> */}

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{
                                    required: 'username is required.',
                                    validate: {
                                        isUnique: async (value) => {
                                            const unique = await isUnique(value);
                                            return unique || 'Username is already taken.';
                                        }
                                    }
                                }} render={({ field, fieldState }) => (
                                    // <Password id={field.name}  toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    <InputText id={field.username} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />

                                )} />
                                <label htmlFor="username" className={classNames({ 'p-error': errors.username })}>{MyUpdatUser.username ? MyUpdatUser.username : "UserName*"}</label>
                            </span>
                            {getFormErrorMessage('username')}
                              {un&&<div style={{color:"red"}}>not valid username</div>}  
                        </div>
                        {/* //address */}
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="address" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.address} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="address" >{MyUpdatUser.address ? MyUpdatUser.address : "Address"}</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        {/* email */}
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                {/* <i className="pi pi-envelope" /> */}
                                <Controller name="email" control={control}
                                    rules={{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>{MyUpdatUser.Email ? MyUpdatUser.Email : "Email"}</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>



                        {/* //phone */}
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="phone" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.address} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="phone" >{MyUpdatUser.phone ? MyUpdatUser.phone : "phone"}</label>
                            </span>
                            {getFormErrorMessage('phone')}
                        </div>

                        <Button type="submit" label={MyUpdatUser.name ? "Update User" : "Add User"} className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Useradd