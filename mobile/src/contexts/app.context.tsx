import React from 'react'
import { appThemes } from '@constants/appTheme'
import { createContext, useState } from 'react'

interface AppContextInterface {
  themeTest: string
  setThemeTest: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: AppContextInterface = {
  themeTest: appThemes.light,
  setThemeTest: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeTest, setThemeTest] = useState<string>(initialAppContext.themeTest)

  return <AppContext.Provider value={{ themeTest, setThemeTest }}>{children}</AppContext.Provider>
}
