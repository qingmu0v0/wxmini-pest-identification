import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner, { CookieSettings } from '../components/CookieBanner'

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>服务条款 | 植物病虫害AI识别系统</title>
        <meta name="description" content="植物病虫害AI识别系统服务条款" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">服务条款</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">最后更新日期：2023年11月15日</p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. 服务概述</h2>
              <p className="mb-4">
                植物病虫害AI识别系统（以下简称"本系统"）是一个基于人工智能技术的植物病虫害识别平台，
                旨在帮助农民、园艺爱好者和植物健康专业人士快速准确地识别植物病虫害问题。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. 接受条款</h2>
              <p className="mb-4">
                通过访问、浏览或使用本系统，您确认您已阅读、理解并同意受本服务条款的约束。
                如果您不同意这些条款，请不要使用本系统。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. 用户账户</h2>
              <p className="mb-4">
                3.1 要使用本系统的某些功能，您可能需要创建一个账户。<br/>
                3.2 您同意提供准确、完整和最新的注册信息。<br/>
                3.3 您有责任维护您账户的机密性，并对您账户下的所有活动负责。<br/>
                3.4 如发现任何未经授权使用您账户的情况，请立即通知我们。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. 服务使用</h2>
              <p className="mb-4">
                4.1 您同意仅将本系统用于合法目的。<br/>
                4.2 您不得使用本系统：<br/>
                &nbsp;&nbsp;a) 违反任何适用的法律或法规；<br/>
                &nbsp;&nbsp;b) 侵犯他人的知识产权或其他权利；<br/>
                &nbsp;&nbsp;c) 传输或分发任何恶意软件、病毒或其他有害代码；<br/>
                &nbsp;&nbsp;d) 干扰或破坏本系统的运行或服务器。<br/>
                4.3 本系统提供的信息仅供参考，不构成专业建议。对于植物病虫害问题，
                请咨询合格的农业专家或植物病理学家。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. 知识产权</h2>
              <p className="mb-4">
                5.1 本系统及其所有内容，包括但不限于文本、图形、图像、软件和标识，
                均受版权、商标和其他知识产权法律的保护。<br/>
                5.2 您不得复制、修改、分发、展示、执行、发布、许可或创建基于本系统或其内容的衍生作品。<br/>
                5.3 您上传到本系统的任何内容仍归您所有，但您授予我们使用、修改和分发该内容的权利，
                以便提供和改进我们的服务。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. 隐私保护</h2>
              <p className="mb-4">
                我们重视您的隐私。请查阅我们的
                <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
                  隐私政策
                </Link>
                ，了解我们如何收集、使用和保护您的信息。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. 免责声明</h2>
              <p className="mb-4">
                7.1 本系统按"现状"提供，不提供任何明示或暗示的保证。<br/>
                7.2 我们不保证本系统将不间断、及时、安全或无错误地运行。<br/>
                7.3 我们不对因使用或无法使用本系统而造成的任何直接、间接、偶然、特殊或后果性损害承担责任。<br/>
                7.4 本系统提供的识别结果仅供参考，不应作为专业诊断或治疗决策的唯一依据。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. 服务变更和终止</h2>
              <p className="mb-4">
                8.1 我们保留随时修改或终止本系统（或其任何部分）的权利，恕不另行通知。<br/>
                8.2 我们不对您或任何第三方因本系统的修改、暂停或终止而承担责任。<br/>
                8.3 您可以随时停止使用本系统，并可以按照我们的隐私政策删除您的账户。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. 赔偿</h2>
              <p className="mb-4">
                您同意赔偿并使本公司及其董事、员工、代理人免受因您违反本服务条款或侵犯任何第三方权利而产生的任何索赔、责任、损失和费用。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. 争议解决</h2>
              <p className="mb-4">
                10.1 本服务条款受中华人民共和国法律管辖。<br/>
                10.2 任何因本服务条款引起的争议应首先通过友好协商解决。<br/>
                10.3 如果协商不成，任何一方均可向本公司所在地有管辖权的人民法院提起诉讼。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. 条款修改</h2>
              <p className="mb-4">
                我们保留随时修改本服务条款的权利。修改后的条款将在本系统上发布，并立即生效。
                您继续使用本系统即表示您接受修改后的条款。
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. 联系我们</h2>
              <p className="mb-4">
                如果您对本服务条款有任何疑问，请通过以下方式联系我们：<br/>
                电子邮件：contact@plant-pest-ai.com<br/>
                电话：+86 123-4567-8900<br/>
                地址：中国北京市海淀区科技园区88号
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

export default TermsOfService