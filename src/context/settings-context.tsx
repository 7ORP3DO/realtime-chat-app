import { createContext, ReactNode, useContext } from 'react';
import useSettings from '../hooks/useSettings';

type SettingsContextType = ReturnType<typeof useSettings>;
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const settingsData = useSettings();
    return <SettingsContext.Provider value={settingsData}>{children}</SettingsContext.Provider>;
};

const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) throw new Error('useSettingsContext must be used within a SettingsProvider');

    return context;
};

export { SettingsProvider, useSettingsContext };
