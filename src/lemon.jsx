import './App.css'

import { useEffect, useState } from 'react';

const DataFetcher = ({ render, url }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (url.includes("desserts")) {
            setData(["cake", "ice cream", "pie", "brownie"]);
        } else {
            setData(["water", "soda", "juice"]);
        }
    }, []);

    return render(data);
};

const DessertCount = () => {
    return (
        <DataFetcher
            url="https://littlelemon.com/desserts"
            render={(data) => <p>{data.length} desserts</p>}
        />
    );
};

const DrinksCount = () => {
    return (
        <DataFetcher
            url="https://littlelemon.com/drinks"
            render={(data) => <p>{data.length} drinks</p>}
        />
    );
};

export function LemonApp() {
    return (
        <div className='container'>
            <header className='Header' >Little Mau! lists 🌯</header>
            <DessertCount />
            <DrinksCount />
        </div>
    )
}