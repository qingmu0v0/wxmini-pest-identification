import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 主题上下文类型
interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  toggleTheme: () => void
}

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 主题提供者组件
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // 从localStorage获取保存的主题设置，默认为'system'
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // 在客户端挂载后初始化主题
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    setThemeState(savedTheme)
  }, [])

  // 当主题设置改变时，更新localStorage和实际应用的主题
  useEffect(() => {
    if (!mounted) return
    
    localStorage.setItem('theme', theme)
    
    // 根据主题设置确定实际应用的主题
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setResolvedTheme(systemTheme)
    } else {
      setResolvedTheme(theme)
    }
  }, [theme, mounted])

  // 监听系统主题变化
  useEffect(() => {
    if (!mounted) return
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        setResolvedTheme(mediaQuery.matches ? 'dark' : 'light')
      }
      
      // 添加事件监听器
      mediaQuery.addEventListener('change', handleChange)
      
      // 清理函数
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
  }, [theme, mounted])

  // 应用主题到document
  useEffect(() => {
    if (!mounted) return
    
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [resolvedTheme, mounted])

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  // 切换主题（在light和dark之间切换）
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      // 如果当前是system，则根据当前解析的主题切换
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
    }
  }

  // 避免服务端渲染时的主题不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ 
        theme: 'system', 
        setTheme: () => {}, 
        resolvedTheme: 'light', 
        toggleTheme: () => {} 
      }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 使用主题的Hook
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext