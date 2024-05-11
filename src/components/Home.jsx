import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ErrorOccur from './ErrorOccur';
import LoadingState from './LoadingState';
import UserData from './UserData';
import styled from 'styled-components';

// This is the main component 
function Home() {
    const [users, setUser] = useState([]);
    const [error, setError] = useState(false);
    const [errorValue, setErrorValue] = useState('')
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [count, setCount] = useState(1);

    useEffect(() => {

        const controller = new AbortController()       //provide a way to abort or cancel ongoing asynchronous operations, such as fetch requests, XHR requests, or other types of asynchronous tasks.
            ; (async () => {
                try {
                    setError(false)
                    { count == 1 && setLoading(true) }
                    //handling API using axios(react library)
                    const res = await axios.get('https://dummyjson.com/users/search?q=' + search, {
                        signal: controller.signal
                    })     //here we can send an object with while calling an api
                    console.log(res.data.users)
                    setUser(res.data.users)
                    setLoading(false);
                    setCount(2)
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log('Request cancled', error.message);
                        return
                    }
                    setError(true);
                    setErrorValue(`${error}`);
                    setLoading(false);
                }
            })();

        //clean up method 
        return () => {
            controller.abort()     //to remove controler
        }
    }, [search])

    //error container is renderec when there is an error while fetching the api 
    if (error) {
        return <ErrorOccur error={errorValue} />
    }

    //loading container is rendered when the data is being fetched
    if (loading) {
        return <LoadingState />
    }

    return (
        <Container>
            <div><span className='bigcontent'>Search:</span>
            {/* search bar */}
                <input
                    className='searchbar'
                    type='text'
                    placeholder='Search firstname, lastname & Email...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {/* table of all the content */}
            <table className='content'>
                <thead>
                    <tr className='headpart'>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>For More info.</th>
                    </tr>
                </thead>
                <tbody className='bodypart'>
                    {/* this component will render all the data */}
                    <UserData users={users} />
                </tbody>
            </table>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  .bigcontent{
        font-size: 1.8rem;
    }
  .searchbar{
    margin: 30px;
    width: 700px;
    height: 25px
  }
  .content{
    padding: 50px 50px;
    background: linear-gradient(135deg, rgba(229, 165, 87,0.8) ,rgba(225, 129, 12,0.9));
    backdrop-filter: blur(30px);
    border-radius: 20px;
    width: 100%;
    th,td{
        padding: 10px;
        border-bottom: 1px black solid;
    }
    .headpart{
        th{
            font-size: 1.2rem;
            gap:10px;
        }
    }
  }
`

export default Home
