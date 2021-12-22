import React from 'react';
import Card from '../../reusable/Card';

export default function ErrorComponent({ message, description }) {
    return (
        <div className="centerpls">
            <Card>
                <h1 className="text-2xl mb-2">{message}</h1>
                <p>{description}</p>
            </Card>
        </div>
    )
}
