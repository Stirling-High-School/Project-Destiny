import React from 'react';
import Form from './Form';
import Header from './Header';

function Page() {

    // TEMP - get from API
    const title = "SHS Course Choice Form - 2021/22";
    const welcomeMessage = "For more information, see: https://www.stirlinghigh.co.uk/young-people/course-choice";
    const imageBlob = ""

    return (
        <div className="py-8 px-1 md:py-12 md:px-12 lg:py-14 lg:px-48 h-full">
            <Header title={title} welcomeMessage={welcomeMessage} imageBlob={imageBlob} />
            <Form />
        </div>
    );
}

export default Page;
