import React from 'react'

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getDay = (timestamp) => {
    let date = new Date(timestamp);
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dateNum = date.getDate();
    let year = date.getFullYear();

    //return `${day}, ${month} ${dateNum}, ${year}`; // Sunday, Jun 25, 2026
    return `${dateNum} ${month}`
}

export default getDay