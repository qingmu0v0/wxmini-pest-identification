import React, { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 获取保存的主题设置
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    setTheme(savedTheme)
    
    // 应用主题到document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  if (!mounted) {
    return (
      <button
        className="ml-2 p-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="切换主题"
      >
        <SunIcon className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 p-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="切换主题"
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle