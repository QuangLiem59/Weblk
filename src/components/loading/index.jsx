import React from 'react';
import './index.scss';

function Loading() {
    return (
        <div className="Loading-container">
            <div className="Loading">
                <svg width="36px" height="32px">
                    <polyline id="back" points="1,30 10,1 20,30 20,1 30,1 35,3 35,12 30,15 35,18 35,28 30,30 20,30 20,15 30,15 20,15 20,30 15,15 17,15 3,15"></polyline>
                    <polyline id="front" points="1,30 10,1 20,30 20,1 30,1 35,3 35,12 30,15 35,18 35,28 30,30 20,30 20,15 30,15 20,15 20,30 15,15 17,15 3,15"></polyline>
                </svg>
            </div>
        </div>
    );
}

export default Loading;