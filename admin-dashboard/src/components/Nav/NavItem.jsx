import React from "react";

function NavItem({ item }) {
  return (
    <li className="nav-item">
      <a href="#" className="nav-link collapsed">
        <i className={item.icon}></i>
        <span>{item.name}</span>
      </a>
    </li>
  );
}

export default NavItem;
