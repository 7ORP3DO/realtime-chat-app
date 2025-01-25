import { useEffect, useState } from 'react';
import { Settings } from '../types';

const DEFAULT_SETTINGS: Settings = {
    autoScroll: true,
    soundEnabled: true,
    scrollIndicator: false,
    profanityFilter: true,
};

const useSettings = () => {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

    useEffect(() => {
        const loadSettings = () => {
            try {
                const savedSettings = localStorage.getItem('appSettings');
                if (savedSettings) setSettings(JSON.parse(savedSettings));
            } catch (error) {
                console.error('Error loading settings:', error);
                setSettings(DEFAULT_SETTINGS);
            }
        };

        loadSettings();
    }, []);

    const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);

        try {
            localStorage.setItem('appSettings', JSON.stringify(newSettings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        try {
            localStorage.setItem('appSettings', JSON.stringify(DEFAULT_SETTINGS));
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    };

    return {
        settings,
        updateSetting,
        resetSettings,
    };
};

export default useSettings;
