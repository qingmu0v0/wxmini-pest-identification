import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const testimonials = [
  {
    id: 1,
    name: '王建国',
    role: '现代农业合作社理事长',
    location: '江苏省南京市',
    avatar: UserCircleIcon,
    content: '我们合作社引入这个AI识别系统后，病虫害防治效率显著提升。系统不仅识别准确率高，还能提供针对性的防治方案，大大减少了我们的农药使用量，提高了作物品质和产量。',
    rating: 5,
    category: 'individual',
    crop: '水稻、小麦',
    result: '减少农药使用35%，增产20%'
  },
  {
    id: 2,
    name: '李华',
    role: '大型农场技术主管',
    location: '新疆生产建设兵团',
    avatar: BuildingOfficeIcon,
    content: '我们农场有5000亩棉花，以前病虫害防治主要靠经验，现在有了这个AI系统，可以提前预警，精准防治。去年棉花产量提高了20%，农药成本降低了25%。',
    rating: 5,
    category: 'enterprise',
    crop: '棉花',
    result: '增产20%，成本降低25%'
  },
  {
    id: 3,
    name: '王教授',
    role: '农业大学植物病理学教授',
    location: '南京农业大学',
    avatar: AcademicCapIcon,
    content: '作为农业科研工作者，我对这个AI识别系统的技术原理很感兴趣。它的识别准确率确实很高，而且知识库内容也很专业，可以作为农业教学和科研的辅助工具。',
    rating: 5,
    category: 'academic',
    crop: '多种作物',
    result: '教学科研效率提升'
  },
  {
    id: 4,
    name: '陈小芳',
    role: '家庭农场主',
    location: '云南省昆明市',
    avatar: UserCircleIcon,
    content: '我种植的是高原特色蔬菜，病虫害种类多，识别难度大。这个系统帮我识别了好几种以前没见过的病害，防治建议也很实用，现在我的蔬菜品质和产量都提高了。',
    rating: 5,
    category: 'individual',
    crop: '高原特色蔬菜',
    result: '品质提升，产量增加'
  },
  {
    id: 5,
    name: '赵经理',
    role: '农业科技公司CEO',
    location: '北京市',
    avatar: BuildingOfficeIcon,
    content: '我们将这个AI识别系统集成到我们的智慧农业平台中，为我们的客户提供增值服务。系统API接口稳定，识别速度快，客户反馈非常好。',
    rating: 5,
    category: 'enterprise',
    crop: '多种作物',
    result: '客户满意度95%'
  },
  {
    id: 6,
    name: '刘博士',
    role: '农业技术推广站站长',
    location: '河南省郑州市',
    avatar: AcademicCapIcon,
    content: '我们在推广农业技术时，这个AI识别系统是一个很好的工具。农户们通过手机就能识别病虫害，大大提高了我们的技术推广效率。',
    rating: 5,
    category: 'academic',
    crop: '小麦、玉米',
    result: '技术推广效率提升40%'
  }
]

const categories = [
  { id: 'all', name: '全部用户' },
  { id: 'individual', name: '个人农户' },
  { id: 'enterprise', name: '企业用户' },
  { id: 'academic', name: '科研机构' }
]

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory)

  const visibleTestimonials = filteredTestimonials.slice(currentIndex, currentIndex + 3)

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(filteredTestimonials.length - 3, prev + 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            用户真实
            <span className="text-gradient">评价与案例</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            超过3000农户和农业企业的选择，听听他们如何使用我们的AI识别系统提高农业生产效率
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setCurrentIndex(0)
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* 评价卡片 */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                    <testimonial.avatar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">{testimonial.content}</p>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-auto">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">种植作物:</span>
                      <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">{testimonial.crop}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">效果:</span>
                      <span className="ml-1 font-medium text-green-600 dark:text-green-400">{testimonial.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 左右导航按钮 */}
          {filteredTestimonials.length > 3 && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-200 ${
                  currentIndex === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= filteredTestimonials.length - 3}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all duration-200 ${
                  currentIndex >= filteredTestimonials.length - 3 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </>
          )}
        </div>

        {/* 统计数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-700 dark:to-accent-700 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">3000+</div>
              <p className="text-primary-100">活跃用户</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1万+</div>
              <p className="text-primary-100">识别次数</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9/5</div>
              <p className="text-primary-100">用户评分</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <p className="text-primary-100">满意度</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}