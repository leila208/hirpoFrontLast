import { useState } from "react";
import "./sidebar.css"
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
function SidebarItem({ item }) {
  const location = useLocation();
  const isActive = location.pathname === item.path ;
  let isParent = false
   isParent = item.childrens?.some(item => item.path === location.pathname);
const linkClass = `sidebarHeader sidebar-item ${isActive ? "active" : ""} `;
  const [open, setOpen] = useState(false);
   if (item.childrens) {
      return (
        <div className={open ? "sidebarHeader sidebar-item open" : "sidebarHeader sidebar-item"}>
          <button className={isParent ? "sidebar-title parent open": "sidebar-title"} onClick={() => setOpen(!open)}>
            <span>{item.title}</span>
            <i className="fa-solid fa-chevron-right toggle-btn"></i>
          </button>

          <div className="sidebar-content">
            {item.childrens.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </div>
        </div>
      );
   } else {
     return (
       <a href={item.path || "#"} className={linkClass} id='atag'>
         <div className="sidebar-title">
           <span>{item.title}</span>
         </div>
       </a>
     );
    }
  
}

export default SidebarItem