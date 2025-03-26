import { useState, useEffect } from "react"
import Axios from "axios"
import { Button } from 'primereact/button';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Postadd from "./Postadd";


const Post=()=>{

const [Post,setPost] = useState([])

const [MyUpdatPost,SetMyUpdatPost]=useState([])

const [PostUpdateState,setPostUpdateState] = useState(false)

const getPost = async ()=> {
    try{
    const {data} = await Axios.get("http://localhost:1233/api/Post")
    setPost(data)
}
    catch(ex){
        <Button icon="pi pi-file-plus" label="Add Post" onClick={()=>addPostEzer()} />
    }
}

const deletePost = async (id)=> {
    console.log(id);
    const {data} = await Axios.delete(`http://localhost:1233/api/Post/${id}`)
    getPost();
}

const updatePostEzer = (Post)=>{
    SetMyUpdatPost(Post)
    setPostUpdateState(true)
}

const addPostEzer = ()=>{
    SetMyUpdatPost({})
    setPostUpdateState(true)
}

useEffect(()=>{
    getPost()
},[])



const itemTemplate = (Post) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                    <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                        <div className="flex flex-column gap-1">
                            <div className="text-2xl font-bold text-900">{Post.title}</div>
                        </div>
                        <div className="flex flex-column gap-2">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-file"></i>
                                <span className="font-semibold">{Post.body}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                        <Button icon="pi pi-file-excel" label="Delet" onClick={()=>{deletePost(Post._id)}} ></Button>
                        <Button icon="pi pi-file-edit" label="update"  onClick={()=>{ updatePostEzer(Post)}}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

return (
    <>
    <div className="card">
        {
         PostUpdateState?<Postadd setPostUpdateState={setPostUpdateState}  visible={PostUpdateState}  setPost={setPost} Post={Post} SetMyUpdatPost={SetMyUpdatPost} MyUpdatPost={MyUpdatPost} getPost={getPost}></Postadd>:
    <><div className="card flex justify-content-center"> <Button icon="pi pi-file-plus" label="Add Post" onClick={()=>addPostEzer()} /></div><DataScroller value={Post} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" /> </>  
        }
    </div>
    </>
    )
}
export default Post