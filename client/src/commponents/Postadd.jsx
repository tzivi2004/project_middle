import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import Axios from "axios"


const Postadd=({ visible, setPostUpdateState, setPost, Post, SetMyUpdatPost, MyUpdatPost, getPost }) => {

    const [formData, setFormData] = useState({});



    const defaultValues = {
        title: MyUpdatPost.title,
        body: MyUpdatPost.body

    }

    useEffect(() => {
       
    }, []); 

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addPost = async (datas) => {

        try {
            const res = await Axios.post("http://localhost:1233/api/Post", datas)

            setPost([...Post, res.data])
            setPostUpdateState(false)
        }
        catch (ex) {

        }
    }

    const UpdatePost = async (datas) => {
        datas._id = MyUpdatPost._id;
        console.log(datas);
        try {
            const { data } = await Axios.put("http://localhost:1233/api/Post", datas)
            getPost()
            setPostUpdateState(false)
        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        if (MyUpdatPost.title) {
            UpdatePost(data)
        }
        else {
            addPost(data)
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    // const isUnique = async (username) => {
    //     const response = user.filter(e => e.username == username);
    //     if (response) {
    //         setUn(true)
    //         return true
    //     }
        // Ensure your API returns a boolean indicating uniqueness

        //return false; // or handle the error as needed

    // };

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
                                <Controller name="title" control={control} rules={{ required: 'title is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.title} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>{MyUpdatPost.title ? MyUpdatPost.title : "Title*"}</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="body" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.body} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="body" >{MyUpdatPost.body ? MyUpdatPost.body : "Body"}</label>
                            </span>
                            {getFormErrorMessage('body')}
                        </div>

                        <Button type="submit" label={MyUpdatPost.title ? "Update Post" : "Add Post"} className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Postadd