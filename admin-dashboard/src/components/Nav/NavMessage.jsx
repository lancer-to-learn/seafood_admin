import React from 'react'

function NavMessage() {
  return (
    <li className='nav-item dropdown'>
        <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
            <i className='bi bi-chat-left-text'></i>
            <span className='badge bg-success badge-number'>3</span>
        </a>

        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow messages'>
            <li className='dropdown-header'>
                You have 3 messages
                <a href='#'> 
                    <span className='badge rounded-pill bg-primary p-2 ms-2'>View all</span>
                </a>
            </li>
            <li>
                <hr className='dropdown-divider' />
            </li>

            <li className='message-item'>
                <a href='#'>
                    <img 
                        src='https://th.bing.com/th/id/OIP.qaWW_rLN5sYw0-evVCMcyQHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7' 
                        alt=''
                        className='rounded-circle'
                    />
                    <div>
                        <h4>John Doe</h4>
                        <p>Message 1</p>
                        <p>20 min ago</p>
                    </div>
                </a>
            </li>

            <li>
                <hr className='dropdown-divider' />
            </li>

            <li className='message-item'>
                <a href='#'>
                    <img 
                        src='https://th.bing.com/th/id/OIP.qaWW_rLN5sYw0-evVCMcyQHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7' 
                        alt=''
                        className='rounded-circle'
                    />
                    <div>
                        <h4>Jane Doe</h4>
                        <p>Message 2</p>
                        <p>20 min ago</p>
                    </div>
                </a>
            </li>
        </ul>
    </li>
  )
}

export default NavMessage