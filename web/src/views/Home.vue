<template>
  <div class="home">
    <!-- 导航栏 -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <span class="logo-icon">🌱</span>
          <span class="logo-text">植物病虫害AI识别</span>
        </div>
        <nav class="nav">
          <router-link to="/" class="nav-link active">首页</router-link>
          <router-link to="/analysis" class="nav-link">在线识别</router-link>
          <router-link to="/about" class="nav-link">关于我们</router-link>
        </nav>
      </div>
    </header>

    <!-- 英雄区 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">AI驱动的植物健康守护者</span>
          </h1>
          <p class="hero-subtitle">
            上传植物照片，立即获得专业的病虫害分析和防治建议
          </p>
          <div class="hero-buttons">
            <router-link to="/analysis" class="btn btn-primary btn-large">
              <el-icon><CameraFilled /></el-icon>
              <span>立即识别</span>
            </router-link>
            <a href="#features" class="btn btn-outline btn-large">
              <el-icon><InfoFilled /></el-icon>
              <span>了解更多</span>
            </a>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-container">
            <div class="hero-bug-emoji">🦗</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能特点 -->
    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <p class="section-subtitle">基于先进的AI技术，为您提供专业的植物健康检测服务</p>
        
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🐛</div>
            <h3 class="feature-title">虫蛀检测</h3>
            <p class="feature-desc">
              智能识别植物表面的虫蛀痕迹，评估虫蛀风险等级，及时预警植物健康状况
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🦗</div>
            <h3 class="feature-title">蚜虫识别</h3>
            <p class="feature-desc">
              精准检测蚜虫的存在，估算数量规模，帮助您了解虫害的严重程度
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💊</div>
            <h3 class="feature-title">防治建议</h3>
            <p class="feature-desc">
              根据分析结果提供专业的防治方案，包括生物防治和化学防治建议
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3 class="feature-title">多模型支持</h3>
            <p class="feature-desc">
              支持QWEN3、GPT-4、Claude等多个主流AI模型，可自由选择使用
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">快速响应</h3>
            <p class="feature-desc">
              采用高性能服务器和优化算法，确保快速返回分析结果，提升使用体验
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3 class="feature-title">多端支持</h3>
            <p class="feature-desc">
              提供Web网页版和微信小程序，随时随地使用，方便快捷
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用流程 -->
    <section class="process">
      <div class="container">
        <h2 class="section-title">使用流程</h2>
        <p class="section-subtitle">三步即可完成植物健康检测</p>
        
        <div class="process-steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-icon">📸</div>
            <h3 class="step-title">上传照片</h3>
            <p class="step-desc">拍摄或选择植物照片上传</p>
          </div>
          
          <div class="step-arrow">→</div>
          
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-icon">🔍</div>
            <h3 class="step-title">AI分析</h3>
            <p class="step-desc">系统自动识别和分析</p>
          </div>
          
          <div class="step-arrow">→</div>
          
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-icon">📊</div>
            <h3 class="step-title">查看结果</h3>
            <p class="step-desc">获得详细报告和建议</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">
              <span class="logo-icon">🌱</span>
              植物病虫害识别
            </h3>
            <p class="footer-desc">
              基于AI技术的智能植物健康检测系统
            </p>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">快速链接</h4>
            <ul class="footer-links">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/analysis">在线识别</router-link></li>
              <li><router-link to="/about">关于我们</router-link></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h4 class="footer-heading">联系我们</h4>
            <ul class="footer-links">
              <li>📧 Email: qingmu0v0@outlook.com</li>
              <li>📱 微信小程序: 植物病虫害识别</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2025 植物病虫害识别系统. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { CameraFilled, InfoFilled, ZoomIn } from '@element-plus/icons-vue'
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

/* 头部导航 */
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

/* 英雄区 */
.hero {
  padding: 200px 20px;
}

.hero .container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.hero-title {
  font-size: 48px;
  line-height: 1.3;
  color: var(--text-primary);
  animation: fadeInUp 0.8s ease-out;
}

.gradient-text {
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 50%, #81C784 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn-large {
  padding: 16px 40px;
  font-size: 18px;
}

.btn-primary {
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

/* Hero bug emoji styles */
.hero-bug-emoji {
  font-size: 210px;
  line-height: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 280px;
  background: transparent;
  animation: bugFloat 4s ease-in-out infinite;
}

@keyframes bugFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.image-container:hover .hero-img {
  transform: scale(1.05);
}

.img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(46, 125, 50, 0.9), rgba(46, 125, 50, 0.7), transparent);
  padding: 30px 20px 20px;
  color: white;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.image-container:hover .img-overlay {
  transform: translateY(0);
}

.overlay-content {
  text-align: center;
}

.analysis-icon {
  font-size: 40px;
  margin-bottom: 10px;
  animation: pulse 2s infinite;
}

.overlay-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.overlay-desc {
  font-size: 16px;
  opacity: 0.9;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 功能特点 */
.features {
  padding: 80px 20px;
  background: white;
}

.features .container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 40px;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.section-subtitle {
  text-align: center;
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 60px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #4CAF50, #66BB6A, #81C784);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.feature-card:hover::before {
  transform: translateX(0);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.feature-icon {
  font-size: 60px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-title {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.feature-desc {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 使用流程 */
.process {
  padding: 80px 20px;
}

.process .container {
  max-width: 1200px;
  margin: 0 auto;
}

.process-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 200px;
  max-width: 280px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.step:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step:hover .step-number {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.4);
}

.step-icon {
  font-size: 60px;
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.step:hover .step-icon {
  transform: scale(1.1) rotate(5deg);
}

.step-title {
  font-size: 22px;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.step-desc {
  font-size: 16px;
  color: var(--text-secondary);
}

.step-arrow {
  font-size: 40px;
  color: var(--primary-color);
}

/* 页脚 */
.footer {
  background: #2E7D32;
  color: white;
  padding: 60px 20px 20px;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin-bottom: 15px;
}

.footer-desc {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.footer-heading {
  font-size: 18px;
  margin-bottom: 20px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a,
.footer-links li {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero .container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-image {
    order: -1;
  }
  
  .process-steps {
    flex-direction: column;
  }
  
  .step-arrow {
    transform: rotate(90deg);
  }
  
  .nav {
    gap: 15px;
  }
  
  .nav-link {
    font-size: 14px;
    padding: 6px 12px;
  }
}
</style>
