import React, { createContext, useContext, useState, ReactNode } from 'react';


type Language = 'pl' | 'en';
type Theme = 'light' | 'dark';


interface AppContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pl');
  const [theme, setTheme] = useState<Theme>('light');

  const value = {
    language,
    theme,
    setLanguage,
    setTheme,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};