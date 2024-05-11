import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOccur from './ErrorOccur';
import LoadingState from './LoadingState';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// this will render wheh the more content button is clicked(contains more personal details of the person)
function FullContent() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errorValue, setErrorValue] = useState('')
    const [error, setError] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(() => {
        ; (async () => {
            try {
                // https://dummyjson.com/users/1
                setError(false)
                setLoading(true)
                const res = await axios.get('https://dummyjson.com/users/' + id)   //help fetch data of the user that has been clicked
                // console.log(res.data)
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                setError(true);
                setErrorValue(`${error}`);
                setLoading(false);
            }
        })();
    }, [])

    //error handling
    if (error) {
        return <ErrorOccur error={errorValue} />
    }
    
    //loading state
    if (loading) {
        return <LoadingState />
    }

    return (
        <Container>
            <div className='container'>
                <div className='avatar'>
                    <img src={user.image} alt='Avtar here' />
                </div>
                <div className='name'>
                    <h1>Name: {user.firstName}</h1>
                    <h1>{user.lastName}</h1>
                </div>
                <div className='age'>
                    <p>Age: {user.age}</p>
                    <p>Gender: {user.gender}</p>
                </div>
                <div className='twopart'>
                    <div className='left'>
                        <div>BloodGroup: {user.bloodGroup}</div>
                        <div>DOB: {user.birthDate}</div>
                        <div>Email: {user.email}</div>
                        <div>Phone No.: {user.phone}</div>
                        {/* more content that can be added */}
                        {/* <div>Address: {user.address['address'] + ", " + user.address['city']}</div>
                        <div>State: {user.address['state']}</div> */}
                    </div>
                    <div className='right'>
                        <div>University: {user.university}</div>
                        <div>Height & Weight: {user.height + ', ' + user.weight}</div>
                        <div>Domain: {user.domain}</div>
                        <div>MackAddress: {user.macAddress}</div>
                        {/* more content that can be added */}
                        {/* <div>Company: {user.company['name']}</div>
                        <div>Department: {user.company['department']}</div>
                        <div>Title: {user.company['title']}</div>
                        <div>Address: {user.company['address']['address'] + ', ' + user.company['address']['city']}</div> */}
                    </div>
                </div>
            </div>
            <div className='btncollection'>
                <button className='leftbtn'><Link className='btnlink' to='/'>Back</Link></button>
                <div className='rightbtn'>
                    <button className='btn' onClick={()=>{window.location.reload()}}><Link className='btnlink' to={`/knowmore/${parseInt(id)-1}`}>Prev_Record</Link></button>
                    <button className='btn' onClick={()=>{window.location.reload()}}><Link className='btnlink' to={`/knowmore/${parseInt(id)+1}`}>Next_Record</Link></button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 32px;
  height: 86vh;
  border-radius: 20px;
  width: 88vw;
  background: linear-gradient(135deg, rgba(229, 165, 87,0.8) ,rgba(225, 129, 12,0.8));
  backdrop-filter: blur(30px);
  box-shadow: 0 8px 30px 0 rgba(225, 129, 12,0.4);
  .container{
    height: 86vh;
    border-radius: 20px;
    width: 88vw;
    .avatar{
        transform: translate(30%, 30%);
        background-color: antiquewhite;
        border-radius: 50%;
        height: 100px;
        width: 100px;
        margin: 0 0 30px 0;
        img{
            height: 80px;
            width:80px;
            transform: translate(7%, 18%);
        }
    }
    .name{
        display: flex;
        margin: 10px 0 10px 20px;
        gap: 5px;
    }
    .age{
        display: flex;
        margin: 0 0 10px 20px;
        gap: 5px;
        transform: translate(0%, -90%);
    }
    .twopart{
        display: flex;
        justify-content: center;
        align-items: left;
        gap:100px;
        transform: translate(0%, -30%);
        .left{
            display: flex;
            align-items: left;
            flex-direction: column;
            margin-right: 200px;
        }
        .right{
            display: flex;
            justify-content: center;
            align-items: left;
            flex-direction: column;
        }
    }
  }
  .btncollection{
    display: flex;
    justify-content: center;
    align-items: left;
    margin: 20px;
    .leftbtn{
        width: 100px;
        transform: translate(-330%, 0%);
    }
    .rightbtn{
        transform: translate(150%, 0%);

    }
}
`

export default FullContent
