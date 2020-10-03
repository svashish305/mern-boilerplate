import {useState, useEffect} from 'react'
import {API} from '../api-service';
import {useCookies} from 'react-cookie';

function useFetch() {
    const [data, setData] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError();
            const data = await API.getTodos(token['mr-token'])
            .catch(err => setError(err))
            setData(data)
            const loggedInUser = await API.currentLoggedInUser(token['mr-token'])
            .catch(err => setError(err))
            setLoggedInUser(loggedInUser)
            setLoading(false);
        }
        fetchData();    
    }, []);
    return [data, loggedInUser, loading, error] 
}

export {useFetch}