
  

import { Menubar } from 'primereact/menubar';
import  {useNavigate}  from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const items = [
     {
    label: 'Home',
    icon: 'pi pi-warehouse',
    command: () => {
      navigate('./')
    }
},
    {
        label: 'User',
        icon: 'pi pi-user',
        command: () => {
          navigate('./user')
        }
    },
    {
        label: 'Post',
        icon: 'pi pi-file',
        command: () => {
          navigate('./post')
        }
    },
    {
        label: 'Todo',
        icon: 'pi pi-check',
        command: () => {
          navigate('./todo')
        }
    }]
    return (
      <>

<Menubar model={items} />

      </>
        
      );
}
export default Home



