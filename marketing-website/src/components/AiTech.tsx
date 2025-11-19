import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CpuChipIcon,
  SparklesIcon,
  CloudIcon,
  ChartBarIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline'

const techFeatures = [
  {
    name: '深度学习模型',
    description: '基于卷积神经网络(CNN)和视觉Transformer技术，训练了超过100万张病虫害图像',
    icon: CpuChipIcon,
    details: [
      '采用ResNet-50和Vision Transformer混合架构',
      '支持200+种常见植物虫害识别',
      '准确率高达99.2%，远超行业平均水平'
    ]
  },
  {
    name: '智能图像处理',
    description: '先进的图像预处理和增强技术，提高识别精度和鲁棒性',
    icon: SparklesIcon,
    details: [
      '自适应图像增强算法，应对复杂光照条件',
      '多尺度特征提取，捕捉细微病征',
      '背景噪声过滤，聚焦关键病理特征'
    ]
  },
  {
    name: '云端计算架构',
    description: '高可用、高并发的云端服务架构，确保毫秒级响应',
    icon: CloudIcon,
    details: [
      '分布式计算集群，支持每秒万次识别请求',
      '自动扩缩容，应对高峰流量',
      '多区域部署，全球低延迟访问'
    ]
  },
  {
    name: '数据分析引擎',
    description: '强大的数据分析和可视化系统，提供深度洞察',
    icon: ChartBarIcon,
    details: [
      '病虫害趋势预测模型',
      '区域性疾病风险评估',
      '个性化防治方案推荐算法'
    ]
  }
]

export default function AiTech() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="ai-tech" className="py-20 bg-white dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            领先的
            <span className="text-gradient">AI技术</span>
            驱动精准识别
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            我们采用业界最前沿的人工智能技术，结合农业专业知识，打造出高精度、高效率的植物虫害识别系统
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                <img 
                  src="/images/ai-tech-illustration.png" 
                  alt="AI病虫害识别技术图示" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">99.2%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">识别准确率</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">15s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">识别速度</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">200+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">病害种类</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {techFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    activeTab === index
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{feature.description}</p>
                      
                      {activeTab === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 space-y-2"
                        >
                          {feature.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">{detail}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">100万+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">训练图像数据</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">农业专家参与</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">工作日 9:00-18:00</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">技术支持时间</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}