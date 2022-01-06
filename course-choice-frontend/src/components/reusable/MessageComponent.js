import React from 'react';
import Card from './Card';

// Message component
export default function MessageComponent({ message, description, isError }) {
    return (
        <div className="centerpls max-w-max">
            <Card>
                <h1 className="text-2xl mb-2 max-w-max">{`${isError ? '⚠️ ' : '🥳 '} ${message}`}</h1>
                <p className="max-w-max">{description}</p>
            </Card>
        </div>
    )
}
