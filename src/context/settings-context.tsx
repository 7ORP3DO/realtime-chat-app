import { createContext, ReactNode, useContext } from 'react';
import { Settings } from '../types';
import useSettings from '../hooks/useSettings';

interface SettingsContextType {
    settings: Settings;
    updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
    resetSettings: () => void;
}

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
