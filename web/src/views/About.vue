<template>
  <div class="about-page">
    <!-- 导航栏 -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <span class="logo-icon">🌱</span>
          <span class="logo-text">植物病虫害AI识别</span>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/analysis" class="nav-link">在线识别</router-link>
          <router-link to="/about" class="nav-link active">关于我们</router-link>
        </nav>
      </div>
    </header>

    <div class="main-content">
      <div class="container">
        <h1 class="page-title">关于我们</h1>
        
        <!-- 项目介绍 -->
        <el-card class="intro-card" shadow="hover">
          <template #header>
            <h2 class="card-title">🌱 项目介绍</h2>
          </template>
          <div class="intro-content">
            <p>
              植物病虫害AI识别系统是一个基于先进人工智能技术的植物健康检测平台。
              我们致力于为农业工作者、园艺爱好者和植物养护人员提供便捷、准确的病虫害识别服务。
            </p>
            <p>
              通过上传植物照片，系统能够快速识别虫蛀痕迹、蚜虫等常见病虫害，
              并提供详细的分析报告和专业的防治建议，帮助用户及时发现问题、采取措施。
            </p>
          </div>
        </el-card>

        <!-- 技术栈 -->
        <el-card class="tech-card" shadow="hover">
          <template #header>
            <h2 class="card-title">🔧 技术栈</h2>
          </template>
          <div class="tech-grid">
            <div class="tech-item">
              <div class="tech-icon">🎨</div>
              <h3>前端技术</h3>
              <ul>
                <li>Vue 3 - 渐进式JavaScript框架</li>
                <li>Element Plus - 优雅的UI组件库</li>
                <li>Vite - 新一代前端构建工具</li>
                <li>Axios - HTTP请求库</li>
              </ul>
            </div>
            
            <div class="tech-item">
              <div class="tech-icon">⚙️</div>
              <h3>后端技术</h3>
              <ul>
                <li>Spring Boot 3 - Java企业级框架</li>
                <li>MyBatis Plus - 持久层框架</li>
                <li>MySQL - 关系型数据库</li>
                <li>OkHttp - HTTP客户端</li>
              </ul>
            </div>
            
            <div class="tech-item">
              <div class="tech-icon">📱</div>
              <h3>小程序</h3>
              <ul>
                <li>uni-app - 跨平台开发框架</li>
                <li>微信小程序 - 原生小程序支持</li>
                <li>Vue 3 - 统一的开发体验</li>
              </ul>
            </div>
            
            <div class="tech-item">
              <div class="tech-icon">🤖</div>
              <h3>AI模型</h3>
              <ul>
                <li>QWEN3 (通义千问) - 阿里云大模型</li>
                <li>GPT-4 Vision - OpenAI视觉模型</li>
                <li>Claude 3 - Anthropic AI模型</li>
              </ul>
            </div>
          </div>
        </el-card>

        <!-- 功能特性 -->
        <el-card class="features-card" shadow="hover">
          <template #header>
            <h2 class="card-title">✨ 功能特性</h2>
          </template>
          <el-timeline>
            <el-timeline-item 
              v-for="(feature, index) in features" 
              :key="index"
              :icon="feature.icon"
              :color="feature.color"
            >
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>

        <!-- 联系方式 -->
        <el-card class="contact-card" shadow="hover">
          <template #header>
            <h2 class="card-title">📬 联系我们</h2>
          </template>
          <div class="contact-grid">
            <div class="contact-item">
              <el-icon class="contact-icon" color="#4CAF50"><Message /></el-icon>
              <h3>电子邮件</h3>
              <p>qingmu0v0@outlook.com</p>
            </div>
            
            <div class="contact-item">
              <el-icon class="contact-icon" color="#4CAF50"><Iphone /></el-icon>
              <h3>微信小程序</h3>
              <p>植物病虫害识别</p>
            </div>
            
            <div class="contact-item">
              <el-icon class="contact-icon" color="#4CAF50"><Position /></el-icon>
              <h3>技术支持</h3>
              <p>工作日 9:00 - 18:00</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 植物病虫害识别系统. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { Message, Iphone, Position } from '@element-plus/icons-vue'

const features = [
  {
    icon: 'Picture',
    color: '#4CAF50',
    title: '智能图像识别',
    description: '基于深度学习的图像识别技术，准确识别植物病虫害特征'
  },
  {
    icon: 'TrendCharts',
    color: '#2196F3',
    title: '风险等级评估',
    description: '科学评估虫蛀风险等级，提供量化的健康指标'
  },
  {
    icon: 'DataAnalysis',
    color: '#FF9800',
    title: '详细分析报告',
    description: '生成专业的分析报告，包含病虫害类型、严重程度等信息'
  },
  {
    icon: 'MessageBox',
    color: '#9C27B0',
    title: '防治方案建议',
    description: '提供针对性的防治建议和处理方案，助力植物健康管理'
  },
  {
    icon: 'Connection',
    color: '#00BCD4',
    title: '多模型支持',
    description: '集成多个主流AI大模型，可根据需求灵活选择'
  },
  {
    icon: 'Monitor',
    color: '#F44336',
    title: '跨平台使用',
    description: '支持Web网页版和微信小程序，随时随地使用'
  }
]
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%);
}

/* 复用header样式 */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.logo-icon {
  font-size: 32px;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  background: rgba(76, 175, 80, 0.1);
}

/* 主内容 */
.main-content {
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 40px;
  color: var(--text-primary);
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease-out;
}

.intro-card,
.tech-card,
.features-card,
.contact-card {
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease-out forwards;
}

.intro-card {
  animation-delay: 0.2s;
}

.tech-card {
  animation-delay: 0.4s;
}

.features-card {
  animation-delay: 0.6s;
}

.contact-card {
  animation-delay: 0.8s;
}

.intro-card:hover,
.tech-card:hover,
.features-card:hover,
.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card-title {
  font-size: 24px;
  color: var(--text-primary);
}

/* 项目介绍 */
.intro-content p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 15px;
}

/* 技术栈 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.tech-item {
  text-align: center;
}

.tech-icon {
  font-size: 50px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.tech-item:hover .tech-icon {
  transform: scale(1.2) rotate(10deg);
}

.tech-item h3 {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.tech-item ul {
  list-style: none;
  padding: 0;
}

.tech-item li {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.tech-item li:last-child {
  border-bottom: none;
}

/* 联系方式 */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.contact-item {
  text-align: center;
}

.contact-icon {
  font-size: 50px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
  transform: scale(1.2);
  color: var(--primary-color) !important;
}

.contact-item h3 {
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.contact-item p {
  font-size: 16px;
  color: var(--text-secondary);
}

/* 页脚 */
.footer {
  background: #2E7D32;
  color: white;
  padding: 30px 20px;
  text-align: center;
  margin-top: 40px;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 时间线动画 */
:deep(.el-timeline-item) {
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLeft 0.8s ease-out forwards;
}

:deep(.el-timeline-item:nth-child(1)) {
  animation-delay: 0.2s;
}

:deep(.el-timeline-item:nth-child(2)) {
  animation-delay: 0.4s;
}

:deep(.el-timeline-item:nth-child(3)) {
  animation-delay: 0.6s;
}

:deep(.el-timeline-item:nth-child(4)) {
  animation-delay: 0.8s;
}

:deep(.el-timeline-item:nth-child(5)) {
  animation-delay: 1s;
}

:deep(.el-timeline-item:nth-child(6)) {
  animation-delay: 1.2s;
}

:deep(.el-timeline-item:hover) {
  transform: translateX(5px);
  transition: all 0.3s ease;
}

/* 动画关键帧 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tech-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 32px;
  }
}
</style>
