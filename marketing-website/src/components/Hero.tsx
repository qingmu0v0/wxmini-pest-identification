import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon, ArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const subtitles = [
  '智能识别病虫害，科学种田保丰收',
  '早发现早防治，农业增产有保障',
  'AI技术助农兴，绿色种植更高效'
]

export default function Hero() {
  const [currentSubtitle, setCurrentSubtitle] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
            <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">基于深度学习的智能识别技术</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight"
        >
          <span className="block">植物虫害</span>
          <span className="text-gradient">AI智能识别系统</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-8 mb-8"
        >
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            {subtitles[currentSubtitle]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button
            onClick={() => router.push('/analysis')}
            className="px-8 py-4 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center"
            style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            立即体验
          </button>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-primary-200"
          >
            了解更多
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">99.2%</div>
            <div className="text-sm text-gray-600">识别准确率</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">200+</div>
            <div className="text-sm text-gray-600">病虫害种类</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">15s</div>
            <div className="text-sm text-gray-600">识别速度</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">1万+</div>
            <div className="text-sm text-gray-600">用户信赖</div>
          </div>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center text-gray-500 hover:text-primary-600 transition-colors duration-200"
        >
          <span className="text-sm mb-2">向下滚动</span>
          <ArrowDownIcon className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>

      {/* 样式定义 */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}