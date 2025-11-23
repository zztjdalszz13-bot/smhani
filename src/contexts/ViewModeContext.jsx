import React, { createContext, useState, useContext, useEffect } from 'react';

const ViewModeContext = createContext();

export const ViewModeProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('default'); // 'default' or 'simple'

    useEffect(() => {
        const storedMode = localStorage.getItem('viewMode');
        if (storedMode) {
            setViewMode(storedMode);
        }
    }, []);

    const toggleViewMode = () => {
        const newMode = viewMode === 'default' ? 'simple' : 'default';
        setViewMode(newMode);
        localStorage.setItem('viewMode', newMode);
    };

    return (
        <ViewModeContext.Provider value={{ viewMode, toggleViewMode }}>
            {children}
        </ViewModeContext.Provider>
    );
};

export const useViewMode = () => useContext(ViewModeContext);
