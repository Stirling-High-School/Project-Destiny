import React from 'react';
import Card from './Card';

// Message component
export default function MessageComponent({ message, description, isError }) {
    return (
        <div className="centerpls">
            <Card>
                <h1 className="text-2xl mb-2">{`${isError ? '⚠️ ' : '🥳 '} ${message}`}</h1>
                <p>{description}</p>
            </Card>
        </div>
    )
}
