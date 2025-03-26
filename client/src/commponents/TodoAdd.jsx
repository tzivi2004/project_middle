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


const TodoAdd = ({ visible, setTodoUpdateState, setTodo, Todo, SetMyUpdatTodo, MyUpdatTodo, getTodo }) => {
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [un, setUn] = useState(false);


    const defaultValues = {
        title: MyUpdatTodo.title,
        tags: MyUpdatTodo.tags

    }

    useEffect(() => {
       
    }, []); 

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const addTodo = async (datas) => {

        try {
            const res = await Axios.post("http://localhost:1233/api/Todo", datas)

            setTodo([...Todo, res.data])
            setTodoUpdateState(false)
        }
        catch (ex) {

        }
    }

    const UpdateTodo = async (datas) => {
        datas._id = MyUpdatTodo._id;
        console.log(datas);
        try {
            const { data } = await Axios.put("http://localhost:1233/api/Todo", datas)
            getTodo()
            setTodoUpdateState(false)
        }
        catch (ex) {

        }
    }

    const onSubmit = (data) => {
        debugger
        setFormData(data);
        reset();
        if (MyUpdatTodo.title) {
            UpdateTodo(data)
        }
        else {
            addTodo(data)

        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };



    return (
        <div className="form-demo">


            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center"></h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">

                            <span className="p-float-label">
                                <Controller name="title" control={control} rules={{ required: 'title is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.title} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="title" className={classNames({ 'p-error': errors.title })}>{MyUpdatTodo.title ? MyUpdatTodo.title : "Title*"}</label>
                            </span>
                            {getFormErrorMessage('title')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="tags" control={control} render={({ field, fieldState }) => (
                                    <InputText id={field.tags} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="tags" >{MyUpdatTodo.tags ? MyUpdatTodo.tags : "Tags"}</label>
                            </span>
                            {getFormErrorMessage('tags')}
                        </div>

                        <Button type="submit" label={MyUpdatTodo.name ? "Update Todo" : "Add Todo"} className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );

}

export default TodoAdd