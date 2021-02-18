import React, {useEffect, useState} from 'react';
import './App.css';

function User(props) {
    const [isActive, set_isActive] = useState(false)
    const [time, set_time] = useState(props.totalTime)
    let activeUSer = undefined

    useEffect(() => {
        let timerFunc
        if (isActive) {
            timerFunc = setInterval(() => {
                set_time(time - 1)
            }, 1000)
        }
        return () => clearInterval(timerFunc);
    }, [isActive, time])

    return (
        <a href='#' className={`circle-user${isActive ? ' circle-user-clicked' : ''}`}
           style={{zIndex: props.zIndex, transform: props.transform}}
           onClick={(e) => set_isActive(isActive => !isActive)}>
            <p className={"circle-p"}>{props.name}</p>
            <label className={"circle-label"}>{time}</label>
        </a>
    );
}

function App() {
    const [totalTime, set_totalTime] = useState(120)
    const [radius, set_radius] = useState(18.5)
    const [users, set_users] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"])

    useEffect(() => {
    }, [])

    const setUsers = (users) => {
        const totalDeg = 360
        let currDeg = 0
        const eachDeg = totalDeg / (users.length - 1);
        const arr = [{name: users[0], transform: "", zIndex: 100}]
        for (let i = 1; i < users.length; i++) {
            arr.push({
                name: users[i], zIndex: 1,
                transform: `rotate(${currDeg}deg) translate(${radius}em) rotate(-${currDeg}deg)`
            })
            currDeg += eachDeg
        }

        return arr
    }


    return (
        <div className="App">
            <div className='circle-container'>
                {setUsers(users).map((user, index, array) => {
                    return (
                        <User
                            key={"key-" + index}
                            zIndex={user.zIndex}
                            transform={user.transform}
                            index={index}
                            name={user.name}
                            totalTime={totalTime}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;