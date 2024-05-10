import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
// import FullContent from './FullContent';
import styled from 'styled-components';

function UserData({users}) {
  return (
    <>
      {
        users.map((curuser)=>{
            const {id,firstName,lastName,email,address} = curuser;
            // const handleClick = (e) => {
            //   e.preventDefault();
            //   console.log('Button clicked for user ID:', id);
            //   se
            // };
            return(
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{address.address+", "+address.city}</td>
                    <td><button> <Link to={`/knowmore/${id}`}>Click Me</Link></button></td>
                </tr>
            )
          })
      }
    </>
  )
}

const TableContainer = styled.div`
  Link{
    text-decoration: none;
  }
`

export default UserData