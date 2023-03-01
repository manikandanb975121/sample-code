import React, { useEffect, useState } from 'react'

const OrganizationDetails = () => {

    const [organization, setOrganizations] = useState({})
    useEffect(() => {
        console.log('hello')
        setOrganizations(JSON.parse(localStorage.getItem('org')))
    }, [])
  return (
    <p style={{ marginLeft: '5px'}}> { organization.name }</p>
  )
}

export default OrganizationDetails