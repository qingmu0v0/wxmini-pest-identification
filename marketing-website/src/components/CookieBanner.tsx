import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

// Cookie类型定义
export interface CookiePreferences {
  necessary: boolean // 必要Cookie - 始终为true
  analytics: boolean // 分析Cookie
  marketing: boolean // 营销Cookie
  preferences: boolean // 偏好设置Cookie
}

// 默认Cookie设置
const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

// Cookie名称
const COOKIE_PREFERENCES_NAME = 'plant-pest-ai-cookie-preferences'
const COOKIE_CONSENT_NAME = 'plant-pest-ai-cookie-consent'

// 获取Cookie值
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  
  return null
}

// 设置Cookie
const setCookie = (name: string, value: string, days: number = 365): void => {
  if (typeof document === 'undefined') return
  
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  
  document.cookie = `${name}=${value};${expires};path=/`
}

// 删除Cookie
const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// Cookie管理Hook
export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [showSettings, setShowSettings] = useState(false)

  // 初始化Cookie设置
  useEffect(() => {
    const consent = getCookie(COOKIE_CONSENT_NAME)
    const savedPrefs = getCookie(COOKIE_PREFERENCES_NAME)
    
    if (consent === 'true' && savedPrefs) {
      try {
        const parsedPrefs = JSON.parse(savedPrefs) as CookiePreferences
        setHasConsent(true)
        setPreferences(parsedPrefs)
      } catch (error) {
        console.error('Error parsing cookie preferences:', error)
        setHasConsent(false)
      }
    } else if (consent === 'false') {
      setHasConsent(false)
    } else {
      // 用户尚未做出选择
      setHasConsent(null)
    }
  }, [])

  // 保存Cookie偏好设置
  const savePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences)
    setCookie(COOKIE_PREFERENCES_NAME, JSON.stringify(newPreferences))
    
    // 根据用户选择应用Cookie
    applyCookieSettings(newPreferences)
  }

  // 接受所有Cookie
  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    
    setHasConsent(true)
    setCookie(COOKIE_CONSENT_NAME, 'true')
    savePreferences(allAccepted)
    setShowSettings(false)
  }

  // 拒绝所有非必要Cookie
  const rejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    
    setHasConsent(true)
    setCookie(COOKIE_CONSENT_NAME, 'true')
    savePreferences(allRejected)
    setShowSettings(false)
  }

  // 保存自定义设置
  const saveCustomSettings = () => {
    setHasConsent(true)
    setCookie(COOKIE_CONSENT_NAME, 'true')
    setShowSettings(false)
  }

  // 应用Cookie设置
  const applyCookieSettings = (prefs: CookiePreferences) => {
    // 这里可以根据实际需要实现不同类型Cookie的处理逻辑
    // 例如：加载或卸载Google Analytics、营销脚本等
    
    // 示例：处理分析Cookie
    if (prefs.analytics) {
      // 启用分析脚本
      console.log('Analytics cookies enabled')
    } else {
      // 禁用分析脚本
      console.log('Analytics cookies disabled')
    }
    
    // 示例：处理营销Cookie
    if (prefs.marketing) {
      // 启用营销脚本
      console.log('Marketing cookies enabled')
    } else {
      // 禁用营销脚本
      console.log('Marketing cookies disabled')
    }
  }

  return {
    hasConsent,
    preferences,
    showSettings,
    setShowSettings,
    acceptAll,
    rejectAll,
    saveCustomSettings,
    savePreferences,
  }
}

// Cookie横幅组件
export const CookieBanner = () => {
  const { hasConsent, acceptAll, rejectAll, setShowSettings } = useCookieConsent()

  // 如果用户已经做出选择，不显示横幅
  if (hasConsent !== null) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 dark:bg-gray-800 text-white p-4 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-4">
              <p className="text-sm text-gray-100 dark:text-gray-100">
                我们使用Cookie来改善您的浏览体验，分析网站流量并个性化内容。
                继续使用我们的网站即表示您同意我们的{" "}
                <a href="/privacy" className="underline hover:text-blue-400 transition-colors">
                  隐私政策
                </a>{" "}
                和{" "}
                <a href="/terms" className="underline hover:text-blue-400 transition-colors">
                  Cookie政策
                </a>
                。
              </p>
            </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                Cookie设置
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                拒绝所有
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                接受所有
              </button>
            </div>
        </div>
      </div>
    </motion.div>
  )
}

// Cookie设置弹窗组件
export const CookieSettings = () => {
  const {
    preferences,
    showSettings,
    setShowSettings,
    acceptAll,
    rejectAll,
    saveCustomSettings,
    savePreferences,
  } = useCookieConsent()

  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences)

  // 当显示设置时，同步当前偏好设置
  useEffect(() => {
    if (showSettings) {
      setLocalPreferences(preferences)
    }
  }, [showSettings, preferences])

  const handleToggle = (category: keyof CookiePreferences) => {
    // 必要Cookie不能被禁用
    if (category === 'necessary') return
    
    setLocalPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleSave = () => {
    savePreferences(localPreferences)
    saveCustomSettings()
  }

  if (!showSettings) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setShowSettings(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Cookie偏好设置</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              当您访问我们的网站时，我们可能会在您的浏览器上存储或检索信息，主要以Cookie的形式。
              请在此处管理您的Cookie偏好设置。
            </p>
          </div>

          <div className="space-y-4">
            {/* 必要Cookie */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">必要Cookie</h3>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="necessary"
                    checked={localPreferences.necessary}
                    onChange={() => handleToggle('necessary')}
                    className="sr-only"
                    disabled
                  />
                  <div className="block bg-gray-300 dark:bg-gray-600 w-12 h-6 rounded-full"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-6"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这些Cookie对于网站正常运行是必不可少的，无法在我们的系统中关闭。
                它们通常仅在响应您采取的操作时设置，例如设置您的隐私偏好、登录或填写表单。
              </p>
            </div>

            {/* 分析Cookie */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">分析Cookie</h3>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="analytics"
                    checked={localPreferences.analytics}
                    onChange={() => handleToggle('analytics')}
                    className="sr-only"
                  />
                  <div className={`block w-12 h-6 rounded-full ${localPreferences.analytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${localPreferences.analytics ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这些Cookie允许我们识别和统计访问者数量，并了解他们如何在我们网站上导航和使用。
                这有助于我们改进网站的工作方式，例如通过确保用户轻松找到他们正在寻找的内容。
              </p>
            </div>

            {/* 营销Cookie */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">营销Cookie</h3>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={localPreferences.marketing}
                    onChange={() => handleToggle('marketing')}
                    className="sr-only"
                  />
                  <div className={`block w-12 h-6 rounded-full ${localPreferences.marketing ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${localPreferences.marketing ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这些Cookie可能由我们的广告合作伙伴设置，以建立您的兴趣档案并在其他网站上显示相关广告。
                它们不直接存储个人信息，而是基于唯一标识您的浏览器和互联网设备。
              </p>
            </div>

            {/* 偏好设置Cookie */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">偏好设置Cookie</h3>
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    id="preferences"
                    checked={localPreferences.preferences}
                    onChange={() => handleToggle('preferences')}
                    className="sr-only"
                  />
                  <div className={`block w-12 h-6 rounded-full ${localPreferences.preferences ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${localPreferences.preferences ? 'translate-x-6' : ''}`}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这些Cookie使网站能够记住您所做的选择（例如您的用户名、语言或您所在的地区），
                并提供增强的、更个性化的功能。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="flex space-x-2">
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                接受所有
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                拒绝所有
              </button>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              保存我的设置
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CookieBanner