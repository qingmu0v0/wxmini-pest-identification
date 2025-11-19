import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner, { CookieSettings } from '../components/CookieBanner'

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>隐私政策 | 植物病虫害AI识别系统</title>
        <meta name="description" content="植物病虫害AI识别系统隐私政策" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">隐私政策</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">最后更新日期：2023年11月15日</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. 引言</h2>
              <p className="mb-4">
                植物病虫害AI识别系统（以下简称"我们"或"本系统"）重视您的隐私。
                本隐私政策解释了我们如何收集、使用、存储和保护您的个人信息。
                使用本系统即表示您同意本政策中描述的做法。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. 我们收集的信息</h2>
              <p className="mb-4">
                我们可能收集以下类型的信息：
              </p>
              <p className="mb-4">
                2.1 <strong>账户信息</strong>：当您创建账户时，我们收集您的姓名、电子邮件地址和联系方式。<br/>
                2.2 <strong>植物图像</strong>：当您使用我们的识别服务时，我们收集您上传的植物图像。<br/>
                2.3 <strong>设备信息</strong>：我们自动收集关于您设备的信息，包括设备类型、操作系统、浏览器类型和IP地址。<br/>
                2.4 <strong>使用数据</strong>：我们收集关于您如何使用本系统的信息，包括访问的页面、点击的链接和使用时间。<br/>
                2.5 <strong>Cookie和类似技术</strong>：我们使用Cookie和类似技术来收集和存储信息。
                有关Cookie的更多信息，请参阅我们的
                <Link href="/terms" className="text-blue-600 hover:underline ml-1">
                  Cookie政策
                </Link>
                。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. 信息使用</h2>
              <p className="mb-4">
                我们使用收集的信息用于以下目的：
              </p>
              <p className="mb-4">
                3.1 提供和维护我们的识别服务<br/>
                3.2 改进我们的服务和用户体验<br/>
                3.3 与您沟通，包括客户支持和通知<br/>
                3.4 分析服务使用情况，以了解我们的用户群体<br/>
                3.5 检测和防止欺诈、滥用和安全问题<br/>
                3.6 遵守法律义务
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. 信息共享</h2>
              <p className="mb-4">
                我们不会出售、交易或转让您的个人信息给第三方，除非：
              </p>
              <p className="mb-4">
                4.1 获得您的明确同意<br/>
                4.2 法律要求或为了保护我们的权利、财产或安全<br/>
                4.3 与可信的服务提供商共享，他们需要访问这些信息以代表我们提供服务（如云存储提供商）<br/>
                4.4 在合并、收购或资产转让的情况下
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. 数据安全</h2>
              <p className="mb-4">
                我们采取适当的技术和组织措施来保护您的个人信息免受未经授权的访问、
                更改、披露或销毁。这些措施包括：
              </p>
              <p className="mb-4">
                5.1 使用安全的服务器和加密技术<br/>
                5.2 限制员工对个人信息的访问<br/>
                5.3 定期审查我们的安全措施<br/>
                5.4 要求服务提供商遵守适当的安全标准
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. 数据保留</h2>
              <p className="mb-4">
                我们仅在必要的时间内保留您的个人信息，以实现收集信息的目的，
                除非法律要求或允许更长的保留期限。当不再需要时，
                我们将安全地删除或匿名化您的信息。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. 您的权利</h2>
              <p className="mb-4">
                根据适用的数据保护法律，您有权：
              </p>
              <p className="mb-4">
                7.1 访问我们持有的关于您的个人信息<br/>
                7.2 更正不准确或不完整的信息<br/>
                7.3 删除您的个人信息（在特定情况下）<br/>
                7.4 限制或反对处理您的个人信息<br/>
                7.5 数据可携带性（在特定情况下）<br/>
                7.6 向数据保护机构投诉
              </p>
              <p className="mb-4">
                如需行使这些权利，请通过下文"联系我们"部分提供的方式与我们联系。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. 儿童隐私</h2>
              <p className="mb-4">
                本系统不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
                如果我们发现收集了儿童的个人信息，我们将采取步骤删除这些信息。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. 国际数据传输</h2>
              <p className="mb-4">
                您的个人信息可能会在我们运营所在的不同国家之间传输和处理。
                这些国家可能具有与您所在国家不同的数据保护法律。
                当我们传输您的信息时，我们将确保采取适当措施保护您的隐私和权利。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. 隐私政策的更改</h2>
              <p className="mb-4">
                我们可能会不时更新本隐私政策。当我们进行更改时，我们将：
              </p>
              <p className="mb-4">
                10.1 在本系统上发布更新后的政策<br/>
                10.2 更新政策顶部的"最后更新日期"<br/>
                10.3 在适用情况下，通过电子邮件或其他方式通知您
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. 联系我们</h2>
              <p className="mb-4">
                如果您对本隐私政策有任何疑问或担忧，或希望行使您的权利，请通过以下方式联系我们：<br/>
                电子邮件：privacy@plant-pest-ai.com<br/>
                电话：+86 123-4567-8900<br/>
                地址：中国北京市海淀区科技园区88号<br/>
                邮政编码：100000
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. 特殊条款</h2>
              <p className="mb-4">
                12.1 <strong>植物图像处理</strong>：您上传的植物图像将用于AI识别服务。
                我们可能使用这些图像来改进我们的算法，但不会在未经您同意的情况下公开分享这些图像。<br/>
                12.2 <strong>研究用途</strong>：匿名化的数据可能用于农业研究和改进我们的服务。
                这些数据不会包含任何可识别个人身份的信息。
              </p>
            </div>
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

export default PrivacyPolicy