import React from 'react';
import { useGetMeQuery } from '../redux/features/auth/authApi';

const Home = () => {
    const a = useGetMeQuery()
    console.log({a});
    return (
        <div>
            <p>This is home page</p>
        </div>
    );
};

export default Home;