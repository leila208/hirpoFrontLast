import React from 'react'
import SidebarItem from './SidebarItem';
import "./sidebar.css"
import items from "../../data/sidebar.json";

function Sidebar() {
    return (
      <>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </>
    );
}

export default Sidebar