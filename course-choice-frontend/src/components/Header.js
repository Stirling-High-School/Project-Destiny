import React from 'react';
import logo from '../images/shs-logo.png';

export default function Header() {

    const title = "SHS Course Choice Form - 2021/22";
    const moreInfo = "https://www.stirlinghigh.co.uk/young-people/course-choice";

    return (
        <div className="flex flex-col items-center">
            <img 
                style={{ width: "125px", height:"125px" }}
                src={logo}
                alt="SHS badge"
            />
            <h1 className="text-xl sm:text-3xl md:text-4xl m-4">{title}</h1>
            <p className="mx-8">For more information, see: <a className="text-blue-800 hover:underline" href={moreInfo} target="_blank" rel="noreferrer">{moreInfo}</a></p>
        </div>
    )
}