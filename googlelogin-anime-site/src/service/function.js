import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useQuery} from 'react-query'


    const postUser = async () => {
        const {data} = await axios.post('http://localhost:3002/api/user/post')    
        return data
    }

    function Articles(){
        const {data, error, isError, isLoading } = useQuery('articles', postUser)}


export default Articles