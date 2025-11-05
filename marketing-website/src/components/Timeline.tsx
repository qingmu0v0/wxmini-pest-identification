import React from 'react';
import { motion } from 'framer-motion';
import { 
  MicrophoneIcon, 
  CpuChipIcon, 
  CloudIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Timeline = () => {
  const timelineItems = [
    {
      id: 1,
      year: '2023',
      title: '项目启动',
      description: '团队开始研发AI病虫害识别系统，致力于为农业生产提供智能化解决方案。',
      icon: <LightBulbIcon className="h-8 w-8" />,
      color: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))',
    },
    {
      id: 2,
      year: '2024 Q1',
      title: '核心技术突破',
      description: '完成深度学习模型训练，识别准确率达到95%，支持超过200种常见病虫害识别。',
      icon: <CpuChipIcon className="h-8 w-8" />,
      color: 'bg-green-500'
    },
    {
      id: 3,
      year: '2024 Q2',
      title: '产品上线',
      description: '微信小程序正式发布，用户可通过拍照上传植物图片，快速获取病虫害诊断结果。',
      icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      year: '2024 Q3',
      title: '云端服务扩展',
      description: '推出云端数据分析平台，为农业企业提供大规模作物健康监测服务。',
      icon: <CloudIcon className="h-8 w-8" />,
      color: 'bg-indigo-500'
    },
    {
      id: 5,
      year: '2024 Q4',
      title: '多语言支持',
      description: '新增多语言界面支持，覆盖全球主要农业区域，为不同语言背景的农户提供本地化服务。',
      icon: <DevicePhoneMobileIcon className="h-8 w-8" />,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      year: '2025',
      title: '持续创新',
      description: '不断优化算法模型，扩大识别范围，为全球农业生产提供更全面的智能解决方案。',
      icon: <CheckCircleIcon className="h-8 w-8" />,
      color: 'bg-teal-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="timeline" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            产品发展历程
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            从概念到产品，我们不断创新，致力于为农业生产提供最先进的AI识别技术
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* 时间轴中心线 */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* 时间轴节点 */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-300 z-10 items-center justify-center">
                  <div className={`w-6 h-6 rounded-full ${item.color}`}></div>
                </div>

                {/* 内容卡片 */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center mb-4 md:justify-end">
                      <div className={`p-3 rounded-full text-white mr-4`} style={{ backgroundColor: 'rgb(2 132 199 / var(--tw-bg-opacity, 1))' }}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </div>

                {/* 移动端时间轴节点 */}
                <div className="md:hidden flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center mr-4`}>
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;