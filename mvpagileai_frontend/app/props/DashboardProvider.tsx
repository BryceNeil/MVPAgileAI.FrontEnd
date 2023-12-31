


import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const DashboardContext = createContext<any>({});

export const useDashboard = () => useContext(DashboardContext);

type DashboardProviderProps = {
    children: ReactNode;
};

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
    const [dashboardVisible, setDashboardVisible] = useState(false)

    
    return (
        <DashboardContext.Provider value={{ dashboardVisible, setDashboardVisible }}>
            {children}
        </DashboardContext.Provider>
    );
};