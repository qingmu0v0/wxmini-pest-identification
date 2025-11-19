import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import AiTech from '../components/AiTech'
import Testimonials from '../components/Testimonials'
import Timeline from '../components/Timeline'
import Footer from '../components/Footer'
import CookieBanner, { CookieSettings } from '../components/CookieBanner'

export default function Home() {
  const router = useRouter()
  
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
        <title>AI病虫害识别系统 - 智能农业解决方案</title>
        <meta name="description" content="基于深度学习的AI病虫害识别系统，帮助农户快速准确识别作物病虫害，提供专业防治建议" />
        <meta name="keywords" content="病虫害识别,农业AI,作物保护,智能农业,植物病害诊断" />
        <meta property="og:title" content="AI病虫害识别系统 - 智能农业解决方案" />
        <meta property="og:description" content="基于深度学习的AI病虫害识别系统，帮助农户快速准确识别作物病虫害，提供专业防治建议" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plant-pest-ai.example.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI病虫害识别系统 - 智能农业解决方案" />
        <meta name="twitter:description" content="基于深度学习的AI病虫害识别系统，帮助农户快速准确识别作物病虫害，提供专业防治建议" />
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

        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                关于我们
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
                致力于用科技赋能农业，为全球农户提供智能病虫害识别解决方案
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">我们的使命</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  通过先进的AI技术，帮助农户快速准确地识别作物病虫害，减少农业损失，提高农作物产量和质量。
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  我们致力于将最前沿的深度学习技术与农业实践相结合，为全球农业发展贡献力量。
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
                    alt="我们的团队"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        
        {/* Cookie横幅和设置 */}
        <CookieBanner />
        <CookieSettings />
      </div>
    </>
  )
}