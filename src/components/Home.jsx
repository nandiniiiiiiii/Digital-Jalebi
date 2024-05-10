import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ErrorOccur from './ErrorOccur';
import LoadingState from './LoadingState';
import UserData from './UserData';
import styled from 'styled-components';

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
            <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* table of all the content */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>For More info.</th>
                    </tr>
                </thead>
                <tbody>
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
`

export default Home
