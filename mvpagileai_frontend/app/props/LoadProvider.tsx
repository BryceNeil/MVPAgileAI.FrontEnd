

import React, { createContext, useState, useContext, ReactNode } from 'react';

const LoadContext = createContext<any>({});

export const useLoader = () => useContext(LoadContext);

type LoadProviderProps = {
    children: ReactNode;
};

export const LoadProvider = ({ children }: LoadProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);

    
    return (
        <LoadContext.Provider value={{ isLoading, setIsLoading}}>
            {children}
        </LoadContext.Provider>
    );
};