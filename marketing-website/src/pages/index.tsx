import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import AiTech from '../components/AiTech'
import Testimonials from '../components/Testimonials'
import Timeline from '../components/Timeline'
import Footer from '../components/Footer'

export default function Home() {
  useEffect(() => {
    // 添加平滑滚动行为
    document.documentElement.style.scrollBehavior = 'smooth'
    
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <>
      <Head>
        <title>植物虫害AI识别系统 - 智能农业解决方案</title>
    <meta name="description" content="基于深度学习的植物虫害智能识别系统，帮助农户快速诊断作物问题，提供科学防治建议，准确率达到99.2%" />
    <meta name="keywords" content="植物虫害,农业AI,智能识别,深度学习,农业科技,作物保护" />
    <meta property="og:title" content="植物虫害AI识别系统 - 智能农业解决方案" />
    <meta property="og:description" content="基于深度学习的植物虫害智能识别系统，帮助农户快速诊断作物问题，提供科学防治建议，准确率达到99.2%" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plant-pest-ai.example.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="植物虫害AI识别系统 - 智能农业解决方案" />
        <meta name="twitter:description" content="基于深度学习的植物虫害智能识别系统，帮助农户快速诊断作物问题，提供科学防治建议，准确率达到99.2%" />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://plant-pest-ai.example.com" />
      </Head>

      <div className="min-h-screen">
        <Navbar />
        <Hero />
        
        <Features />

        <AiTech />

        <Testimonials />

        <Timeline />

        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                关于我们
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                了解我们的团队和使命
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h3>
                <p className="text-gray-600 mb-6">
                  我们致力于利用最先进的人工智能技术，为全球农业提供高效、准确的病虫害识别解决方案。通过我们的技术，农户可以快速识别作物问题，采取针对性措施，从而提高产量，减少经济损失。
                </p>
                <p className="text-gray-600 mb-6">
                  我们的团队由来自农业科学、计算机视觉和机器学习领域的专家组成，共同致力于将尖端技术带到田间地头。
                </p>
                <button 
                  className="px-6 py-3 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
                >
                  了解更多
                </button>
              </div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/images/team-scene.png"
                    alt="团队工作场景"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}