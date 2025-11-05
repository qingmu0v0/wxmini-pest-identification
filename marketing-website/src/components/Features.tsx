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

const features = [
  {
    name: '智能图像识别',
    description: '基于深度学习技术，准确识别200+种植物虫害，准确率高达99.2%',
    icon: PhotoIcon,
    color: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))',
  },
  {
    name: '快速诊断分析',
    description: '只需3秒即可完成病虫害识别，提供详细的病情分析和防治建议',
    icon: ShieldCheckIcon,
    color: 'bg-green-500',
  },
  {
    name: '数据可视化报告',
    description: '生成专业的病虫害分析报告，包含病情严重程度和防治方案',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
  },
  {
    name: '云端数据同步',
    description: '识别记录自动同步到云端，随时随地查看历史诊断数据',
    icon: CloudArrowUpIcon,
    color: 'bg-indigo-500',
  },
  {
    name: '个性化防治方案',
    description: '根据不同作物和病虫害类型，提供定制化的防治建议',
    icon: CogIcon,
    color: 'bg-yellow-500',
  },
  {
    name: '多平台支持',
    description: '支持Web端、微信小程序和移动APP，随时随地使用',
    icon: DevicePhoneMobileIcon,
    color: 'bg-red-500',
  },
  {
    name: '专业知识库',
    description: '内置丰富的农业知识库，提供详细的病虫害信息和防治方法',
    icon: DocumentTextIcon,
    color: 'bg-teal-500',
  },
  {
    name: '实时预警提醒',
    description: '根据地理位置和季节特点，提供病虫害预警信息',
    icon: BellIcon,
    color: 'bg-orange-500',
  },
]

export default function Features() {
  const router = useRouter()

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大功能，助力农业
            <span className="text-gradient">智能化升级</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我们的AI识别系统集成了多项先进技术，为农户提供全方位的植物虫害解决方案
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
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
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
              加入超过50万农户的选择，让AI技术为您的农业生产保驾护航
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/analysis')}
                className="px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity min-w-[120px]"
                style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}
              >
                免费试用
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