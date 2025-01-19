"use client"; // Add this line at the top of your component file

import React, { useState } from 'react';

function ButtonComponent() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <button onClick={handleClick}>
            {clicked ? "Clicked!" : "Click me"}
        </button>
    );
}

export default ButtonComponent;