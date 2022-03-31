import React, {useState, useEffect} from "react"; 
import AuthService from "../../services/auth.service";
import { Routes, Route, Link} from 'react-router-dom';

const ListChannel = () => {
    const [channels, setChannel] = useState([]);
    useEffect(() => {
      const channel = AuthService.viewChannel();
      if (channel) {
        setChannel(channel);
      }
    }, []);
    return(
        <div>
            <nav>
                {channels.map(({_id, name}) =>(
                    <li> <Link to={'/'+_id}>{name}</Link></li>
                ))}
            </nav>
        </div>             
    )
};
export default ListChannel;