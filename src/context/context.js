import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import { useContext } from 'react';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext();
const GithubProivder = ({children}) =>{
    const [githubUser,setGithubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,setFollowers] = useState(mockFollowers);
    const [error,setError] = useState({show:false,msg:''})
    //request ,loading

    const [request,setRequest] = useState(0);
    const [loading,setLoading] = useState(false);
    //check rate
    const checkRequests = () =>{
        axios(`${rootUrl}/rate_limit`).then(({data})=>{
                let {rate:{remaining}} =data;
                setRequest(remaining)
                if(remaining === 0){
                    toggleError(true,'sorry, you have exceded your hourly rate limit!')
                }
        }).catch((error)=>console.log(error))
    }
    function toggleError(show = false,msg = 'false'){
        setError({show,msg})
    }
    const searchGithubUser = async (user) =>{
        toggleError();
        setLoading(true);
        
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err))
        if(response){
            setGithubUser(response.data)
            const {login, followers_url} = response.data;
             //repos   
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).
            then(response => setRepos(response.data))
            //followers
            axios(`${followers_url}?per_page=100`).
            then(response => setFollowers(response.data))
            
        }
        else
        {
            toggleError(true,'there is no user with that username')
        }
        checkRequests();
        setLoading(false);
    }
    useEffect(
        checkRequests,[])
    return <GithubContext.Provider value={{githubUser,repos,followers,request,error,searchGithubUser,loading}}>
        {children}  
    </GithubContext.Provider>
}

export const useGlobalContext = () => {
    
    return useContext(GithubContext)
}

export {GithubProivder,GithubContext};