import React, {useState, useEffect} from "react"; 
import AuthService from "../../services/auth.service";
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const ListChannel = () => {
    const [channels, setChannel] = useState([]);
    useEffect(() => {
      const channel = AuthService.viewChannel();
      if (channel) {
        setChannel(channel);
      }
    }, []);
    return(
        <ProSidebar>
             <SidebarHeader> Channel List </SidebarHeader>
            <Menu iconShape="round">
                {channels.map(({_id, name}) =>(<MenuItem className="nav-item" key={_id}> <Link to={'/'+_id} className="nav-link">{name}</Link></MenuItem>))} 
            </Menu>   
        </ProSidebar>
    )
};
export default ListChannel;