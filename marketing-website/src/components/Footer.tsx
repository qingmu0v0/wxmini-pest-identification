import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  LinkIcon,
  AcademicCapIcon,
  BeakerIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { submitContactForm, subscribeToNewsletter } from '../api/contact'
import { useCookieConsent } from './CookieBanner'

const Footer = () => {
  const { setShowSettings } = useCookieConsent();
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // 联系表单状态
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    setSubscriptionError('')
    
    try {
      const result = await subscribeToNewsletter(email)
      if (result.success) {
        setIsSubscribed(true)
        setEmail('')
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        setSubscriptionError(result.error || '订阅失败，请稍后再试')
      }
    } catch (error) {
      setSubscriptionError('订阅失败，请稍后再试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证表单
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setMessageError('请填写所有必填字段')
      return
    }
    
    setIsSubmitting(true)
    setMessageError('')
    
    try {
      const result = await submitContactForm(contactForm)
      if (result.success) {
        setIsMessageSent(true)
        setContactForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setTimeout(() => setIsMessageSent(false), 5000)
      } else {
        setMessageError(result.error || '发送失败，请稍后再试')
      }
    } catch (error) {
      setMessageError('发送失败，请稍后再试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* 主要页脚内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 公司信息 */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2 text-blue-400" />
                植物虫害AI识别
              </h3>
              <p className="text-gray-300 mb-4">
                致力于利用人工智能技术为农业提供高效、准确的病虫害识别解决方案，帮助农户提高产量，减少损失。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* 快速链接 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    产品功能
                  </a>
                </li>
                <li>
                  <a href="#ai-tech" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <BeakerIcon className="h-4 w-4 mr-2" />
                    AI技术
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    用户案例
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <BeakerIcon className="h-4 w-4 mr-2" />
                    产品发展历程
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <AcademicCapIcon className="h-4 w-4 mr-2" />
                    关于我们
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors flex items-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                    联系我们
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* 联系信息 */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">联系方式</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">qingmu0v0@outlook.com</span>
                </li>
                <li className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">QQ: 798314491</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>



      {/* 版权信息 */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 植物虫害AI识别. 保留所有权利. 鄂ICP备2025089336号
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                服务条款
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowSettings(true); }} className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie设置
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 z-10"
        style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
        aria-label="返回顶部"
      >
        <ChevronUpIcon className="h-6 w-6" />
      </motion.button>
    </footer>
  )
}

export default Footer