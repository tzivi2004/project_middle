import { useState, useEffect } from "react"
import Axios from "axios"
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Tree } from 'primereact/tree';
import React from "react";
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import TodoAdd from "./TodoAdd";


const Todo = () => {

    const [Todo, setTodo] = useState([])

    const [MyUpdatTodo, SetMyUpdatTodo] = useState([])

    const [TodoUpdateState, setTodoUpdateState] = useState(false)

    // const [nodes, setNodes] = useState([]);

    // const [selectedKeys, setSelectedKeys] = useState(null);

    const [value, setValue] = useState('Complited?');


    const options = [
        { value: 'Complited?', icon: 'pi pi-times' },
        { value: 'Complited!!', icon: 'pi pi-check' }
    ];

    const getTodo = async () => {
        try {
            const { data } = await Axios.get("http://localhost:1233/api/Todo")
            setTodo(data)

        }
        catch (ex) {
            <Button label="Add Todo" onClick={() => addTodoEzer()} />
        }
    }

    const deleteTodo = async (id) => {
        const { data } = await Axios.delete(`http://localhost:1233/api/Todo/${id}`)
        getTodo();
    }

    const updateTodoEzer = (Todo) => {
        SetMyUpdatTodo(Todo)
        setTodoUpdateState(true)
    }

    const addTodoEzer = () => {
        SetMyUpdatTodo({})
        setTodoUpdateState(true)
    }

    const ChangCompleted = async (e,Todo)=>{
        console.log("todo",Todo);
        console.log(e);
        
        const { data } = await Axios.put("http://localhost:1233/api/Todo", {_id:Todo._id,title:Todo.title,tags:Todo.tags,completed:Todo.completed?false:true})  
        getTodo()
        // if(Todo.completed)
            // e.value='Complited!!'
        // setValue(e.value)
    }

    useEffect(() => {
        getTodo()
    }, [])



    const itemTemplate = (Todo) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{Todo.title}</div>
                                <br></br>
                                <div className="text-700">{Todo.tags.join(" , ")}</div>
                                <div className="text-700">{Todo.completed===true?"true":"false"}</div>
                                {/* <div className="card flex justify-content-center">
            <Tree value={Todo} selectionMode="checkbox" selectionKeys={selectedKeys} onSelectionChange={(e) => setSelectedKeys(e.value)} className="w-full md:w-30rem" />
        </div> */}

                            </div>
                        </div>
                        <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <Button icon="pi pi-user-minus" label="Delet" onClick={() => { deleteTodo(Todo._id) }} ></Button>
                            <Button icon="pi pi-user-edit" label="update" onClick={() => { updateTodoEzer(Todo) }}></Button>                
                            <div className="card flex flex-column align-items-center gap-3">
                                <MultiStateCheckbox value={Todo.completed?'Complited!!':'Complited?' } onChange={ (e) => {ChangCompleted(e,Todo)}} options={options} optionValue="value" />
                                <span>{Todo.completed?'Complited!!':'Complited?' }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="card">
                {/* <div className="card flex justify-content-center"> <Button label="Add User" onClick={()=>addUserEzer()} /></div> */}
                {
                    TodoUpdateState ? <TodoAdd setTodoUpdateState={setTodoUpdateState} visible={TodoUpdateState} setTodo={setTodo} Todo={Todo} SetMyUpdatTodo={SetMyUpdatTodo} MyUpdatTodo={MyUpdatTodo} getTodo={getTodo}></TodoAdd> :
                        <><div className="card flex justify-content-center"> <Button label="Add Todo" onClick={() => addTodoEzer()} /></div><DataScroller value={Todo} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" /> </>
                }
            </div>
        </>
    )
}
export default Todo