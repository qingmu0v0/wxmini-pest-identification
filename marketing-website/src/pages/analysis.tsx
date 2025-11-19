import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner, { CookieSettings } from '../components/CookieBanner'
import { uploadAndAnalyze } from '../api/analysis'

export default function Analysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [selectedModel, setSelectedModel] = useState('qwen3')
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setResult(null)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setResult(null)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('请先选择一张图片')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    
    try {
      const response = await uploadAndAnalyze(selectedFile, selectedModel)
      setResult(response)
    } catch (err) {
      console.error('分析失败:', err)
      setError('分析失败，请重试')
    } finally {
      setIsAnalyzing(false)
    }
  }



  return (
    <>
      <Head>
        <title>植物虫害AI识别 - 在线识别</title>
    <meta name="description" content="使用先进的AI技术识别植物虫害，提供专业的防治建议" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">植物虫害AI识别</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              上传植物图片，我们的AI系统将为您快速识别病虫害并提供专业防治建议
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 上传区域 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                  <span className="mr-2">📸</span> 上传植物图片
                </h2>
                
                {!previewUrl ? (
                  <div className="border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-lg p-8 text-center bg-primary-50 dark:bg-gray-700">
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="text-primary-600 dark:text-primary-400 font-medium">点击上传图片</span>
                      <span className="text-gray-500 dark:text-gray-400"> 或拖拽文件到此处</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">支持 JPG、PNG、WEBP 格式，大小不超过 10MB</p>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img src={previewUrl} alt="预览" className="w-full h-64 object-cover rounded-lg" />
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-red-500 dark:bg-red-600 text-white rounded-full p-2 hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择AI模型：</label>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="qwen3">QWEN3 (通义千问)</option>
                    <option value="gpt4">GPT-4 Vision</option>
                    <option value="claude">Claude 3</option>
                  </select>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  className="w-full mt-6 bg-primary-600 dark:bg-primary-700 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 dark:hover:bg-primary-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      分析中...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      开始分析
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* 结果展示区域 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* 识别概览 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">识别概览</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">识别类型</p>
                        <p className="font-medium dark:text-gray-200">{result.identificationType === 'pest' ? '害虫识别' : '病害识别'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">置信度</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${(result.confidence || 0) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm dark:text-gray-300">{Math.round((result.confidence || 0) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 植物信息 */}
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">植物信息</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">植物名称</p>
                        <p className="font-medium dark:text-gray-200">{result.plantName || '未识别'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">使用模型</p>
                        <p className="font-medium dark:text-gray-200">{result.modelUsed || selectedModel}</p>
                      </div>
                    </div>
                  </div>

                  {/* 虫害风险评估 */}
                  <div className={`p-6 rounded-lg border ${
                    result.wormRiskLevel >= 3 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 
                    result.wormRiskLevel >= 2 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 
                    'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  }`}>
                    <h3 className="text-lg font-semibold dark:text-gray-200 mb-3">虫害风险评估</h3>
                    <div className="flex items-center mb-3">
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        result.wormRiskLevel >= 3 ? 'bg-red-500' : 
                        result.wormRiskLevel >= 2 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}></div>
                      <span className="font-medium dark:text-gray-200">
                        {result.wormRiskLevel >= 3 ? '高风险' : 
                         result.wormRiskLevel >= 2 ? '中等风险' : 
                         '低风险'}
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">({result.wormRiskLevel}/5)</span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">虫蛀损伤</p>
                      <p className="font-medium dark:text-gray-200">{result.hasWormDamage ? '检测到虫蛀损伤' : '未检测到虫蛀损伤'}</p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {result.wormRiskLevel >= 3 ? '检测到严重虫害，建议立即采取防治措施' : 
                       result.wormRiskLevel >= 2 ? '存在一定虫害风险，建议密切观察并采取预防措施' : 
                       '虫害风险较低，继续保持良好的种植管理'}
                    </p>
                  </div>

                  {/* 害虫识别 */}
                  {result.identificationType === 'pest' && result.pestName && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300 mb-3">害虫识别</h3>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">害虫名称</p>
                        <p className="font-medium text-lg dark:text-gray-200">{result.pestName}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">置信度</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-orange-600 h-2.5 rounded-full" 
                              style={{ width: `${(result.confidence || 0) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm dark:text-gray-300">{Math.round((result.confidence || 0) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 蚜虫检测 */}
                  <div className={`p-6 rounded-lg border ${
                    result.hasAphid ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}>
                    <h3 className="text-lg font-semibold dark:text-gray-200 mb-3">蚜虫检测</h3>
                    <div className="flex items-center mb-3">
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        result.hasAphid ? 'bg-purple-500' : 'bg-gray-400 dark:bg-gray-500'
                      }`}></div>
                      <span className="font-medium dark:text-gray-200">
                        {result.hasAphid ? '检测到蚜虫' : '未检测到蚜虫'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">蚜虫数量</p>
                        <p className="font-medium dark:text-gray-200">{result.aphidCount || '无'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">蚜虫种类</p>
                        <p className="font-medium dark:text-gray-200">{result.aphidSpecies || '无'}</p>
                      </div>
                    </div>
                  </div>

                  {/* 详细分析 */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">详细分析</h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      {result.detailedAnalysis && result.detailedAnalysis.split('\n').map((line: string, index: number) => (
                        <p key={index} className="mb-2">{line}</p>
                      ))}
                    </div>
                  </div>

                  {/* 防治建议 */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">防治建议</h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      {result.suggestion && result.suggestion.split('\n').map((line: string, index: number) => (
                        <p key={index} className="mb-2">{line}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
        
        <Footer />
        
        {/* Cookie横幅和设置 */}
        <CookieBanner />
        <CookieSettings />
      </div>
    </>
  )
}