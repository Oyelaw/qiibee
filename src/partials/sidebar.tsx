import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Book, Box, List } from 'react-feather';

function SidebarItem({ name, to, Icon }) {
  const route = useRouter();

  return (
    <li className={route.pathname == to ? 'nav-item active' : 'nav-item'}>
      <Link href={to}>
        <a href={to}>
          <span className="nav-link">
            <Icon className="link-icon" />
            <span className="link-title">{name}</span>
          </span>
        </a>
      </Link>
    </li>
  );
}

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          Qii<span>bee</span>
        </a>
        <div className="sidebar-toggler not-active">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          <li className="nav-item nav-category">Main</li>
          <SidebarItem name="Dashboard" to="/" Icon={Box} />

          <li className="nav-item nav-category">Sections</li>

          <SidebarItem name="Brands" to="/" Icon={List} />

          <SidebarItem name="Loyalty Points" to="/" Icon={Book} />
        </ul>
      </div>
    </nav>
  );
}
