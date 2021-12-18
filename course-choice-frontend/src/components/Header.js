import React from 'react';
import logo from '../images/shs-logo.png';

function Header() {

    const title = "Course Choice Form 2021/22";
    const moreInfo = "https://www.stirlinghigh.co.uk/young-people/course-choice";

    return (
        <div className="m-5">
            <img 
                style={{ width: "125px", height:"125px" }}
                src={logo}
                alt="SHS badge"
            />
            <h1>{title}</h1>
            <p>For more information, see: <a href={moreInfo} target="_blank" rel="noreferrer">{moreInfo}</a></p>
        </div>
    )
}

export default Header
