import React from 'react'
import './main.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import Dashboard from '../../components/Dashboard/Dashboard'

function Main() {
  return (
    <main id='main' className='main'>
        <PageTitle title='Dashboard'/>
        <Dashboard/>
    </main>
  )
}

export default Main