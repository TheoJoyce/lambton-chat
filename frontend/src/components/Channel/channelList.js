import React, {useState, useEffect} from "react"; 
import AuthService from "../../services/auth.service";
import { Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { ProSidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const ListChannel = () => {
    const [channels, setChannel] = useState([]);
    useEffect(() => {
      const fetchChannelList = async () => {
        const channels = await AuthService.viewChannel();
        if (channels) {
          setChannel(channels);
        }
      }
      fetchChannelList();
    }, []);
    return(
        <ProSidebar>
             <SidebarHeader> Channel List </SidebarHeader>
            <Menu iconShape="round">
                {channels.map(({_id, name}) =>(<MenuItem className="nav-item" key={_id}> <Link to={'/channel/'+_id} className="nav-link">{name}</Link></MenuItem>))} 
            </Menu>   
        </ProSidebar>
    )
};
export default ListChannel;