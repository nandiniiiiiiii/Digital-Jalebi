import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './style.css';

function UserData({users}) {
  return (
    <>
      {
        users.map((curuser)=>{
            const {id,firstName,lastName,email,address} = curuser;
            //here all the content is mapped to the table rows or columns
            return(
                <tr key={id} className='rowtext'>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{address.address+", "+address.city}</td>
                    <td><button className='btn'> <Link className='btnlink' to={`/knowmore/${id}`}>Click Me</Link></button></td>
                </tr>
            )
          })
      }
    </>
  )
}

export default UserData