import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { 
  PhotoIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CloudArrowUpIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  BellIcon
} from '@heroicons/react/24/outline'

export default function Features() {
  const router = useRouter()

  const features = [
    {
      name: "AI图像识别",
      description: "采用深度学习技术，准确识别多种农作物病虫害，识别准确率高达95%以上",
      icon: PhotoIcon,
      color: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))',
    },
    {
      name: "实时诊断",
      description: "上传图片后几秒内即可获得诊断结果，快速响应农业生产需求",
      icon: ShieldCheckIcon,
      color: 'bg-green-500',
    },
    {
      name: "防治建议",
      description: "提供针对性的防治方案和用药建议，帮助农户科学防治病虫害",
      icon: ChartBarIcon,
      color: 'bg-purple-500',
    },
    {
      name: "云端存储",
      description: "历史诊断记录自动保存，随时查看作物健康档案，便于长期跟踪",
      icon: CloudArrowUpIcon,
      color: 'bg-indigo-500',
    },
    {
      name: "智能分析",
      description: "基于大数据分析，提供病虫害趋势预测和预警信息",
      icon: CogIcon,
      color: 'bg-yellow-500',
    },
    {
      name: "移动适配",
      description: "完美适配各种移动设备，田间地头随时随地进行病虫害检测",
      icon: DevicePhoneMobileIcon,
      color: 'bg-red-500',
    },
    {
      name: "详细报告",
      description: "生成详细的诊断报告，包含病虫害信息、防治措施和用药指导",
      icon: DocumentTextIcon,
      color: 'bg-teal-500',
    },
    {
      name: "专家支持",
      description: "疑难病例可推送至农业专家，获取专业的人工诊断支持",
      icon: BellIcon,
      color: 'bg-orange-500',
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            功能特点
            <span className="text-gradient">强大功能</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            我们的AI病虫害识别系统集成了多项先进技术，为农业生产提供全方位的智能解决方案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">立即体验AI识别技术</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              上传作物图片，几秒钟内获得专业诊断结果，让病虫害识别变得简单高效
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/analysis')}
                className="px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity min-w-[120px]"
                style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
              >
                立即体验
              </button>
              <button
                onClick={() => document.getElementById('ai-tech')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity min-w-[120px]"
                style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
              >
                了解更多
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}