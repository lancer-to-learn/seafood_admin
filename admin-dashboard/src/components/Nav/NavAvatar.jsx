import React from 'react'
import { useAuth } from "../../context/authContext";

function NavAvatar() {
    const { user } = useAuth();

  return (
    <li className='nav-item dropdown pe-3'>
        <a className='nav-link nav-profile d-flex align-items-center pe-0' href='#' data-bs-toggle='dropdown'>
            <img src="https://th.bing.com/th/id/OIP.qaWW_rLN5sYw0-evVCMcyQHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7"
                 className='rounded-circle' />
            <span className='d-none d-md-block dropdown-toggle ps-2'>{user.username}</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
            <li className='dropdown-header'>
                <h6>David</h6>
                <span>Web Developer</span>
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>

            <li>
                <a className='dropdown-item d-flex align-items-center' href='user-profile.html'>
                    <i className='bi bi-person'></i>
                    <span>Profile</span>
                </a>
            </li>

            <li>
                <hr className='dropdown-divider' />
            </li>

            <li>
              <a className='dropdown-item d-flex align-items-center' href='user-profile.html'>
                    <i className='bi bi-gear'></i>
                    <span>Account Settings</span>
              </a>
            </li>

            <li>
                <hr className='dropdown-divider' />
            </li>

            <li>
              <a className='dropdown-item d-flex align-items-center' href='pages-faq.html'>
                    <i className='bi bi-question-circle'></i>
                    <span>Need Helps?</span>
              </a>
            </li>
        </ul>
    </li>
  )
}

export default NavAvatar