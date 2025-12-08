<template>
  <view class="page-container">
    <!-- 背景装饰 -->
    <view class="bg-decoration">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="leaf leaf-1"></view>
    </view>

    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="nav-left" @click="goBack">
        <view class="nav-btn glass">
          <wd-icon name="arrow-left" size="20px" color="var(--secondary-800)"></wd-icon>
        </view>
      </view>
      <text class="nav-title">关于我们</text>
      <view class="nav-right"></view> <!-- Placeholder for balance -->
    </view>

    <view class="content-wrapper">
      <view class="header animate-fade-in">
        <view class="logo-wrapper">
          <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
          <view class="logo-glow"></view>
        </view>
        <text class="app-name">植物虫害AI识别</text>
        <text class="version">Version {{ version }}</text>
      </view>

      <view class="card-section animate-slide-up delay-100">
        <view class="section-header">
          <wd-icon name="info-circle" size="18px" color="var(--primary-600)"></wd-icon>
          <text class="title">产品介绍</text>
        </view>
        <view class="info-card">
          <text class="text">
            我们致力于利用人工智能技术，为农业生产提供便捷、高效的病虫害识别服务。通过先进的深度学习算法，帮助农户快速诊断作物问题，提供科学的防治建议，守护您的绿色家园。
          </text>
        </view>
      </view>

      <view class="card-section animate-slide-up delay-200">
        <view class="section-header">
          <wd-icon name="chat" size="18px" color="var(--primary-600)"></wd-icon>
          <text class="title">联系方式</text>
        </view>
        <view class="info-card contact-card">
          <view class="contact-item" @click="openWebsite">
            <view class="contact-icon">
              <wd-icon name="link" size="20px" color="var(--primary-500)"></wd-icon>
            </view>
            <view class="contact-info">
              <text class="label">官方网站</text>
              <text class="value">https://qingmu.cloud</text>
            </view>
            <wd-icon name="arrow-right" size="16px" color="var(--secondary-400)"></wd-icon>
          </view>
          
          <view class="divider"></view>
          
          <view class="contact-item" @click="copyEmail">
            <view class="contact-icon">
              <wd-icon name="mail" size="20px" color="var(--primary-500)"></wd-icon>
            </view>
            <view class="contact-info">
              <text class="label">客服邮箱</text>
              <text class="value">qingmu0v0@outlook.com</text>
            </view>
            <wd-icon name="copy" size="16px" color="var(--secondary-400)"></wd-icon>
          </view>
        </view>
      </view>

      <view class="footer animate-fade-in delay-300">
        <text class="copyright">青木 © 2025 · 鄂ICP备2025089336号</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const version = ref('');
const accountInfo = uni.getAccountInfoSync();
if (accountInfo && accountInfo.miniProgram && accountInfo.miniProgram.version) {
  version.value = accountInfo.miniProgram.version;
} else {
  version.value = '1.0.0'; // Default or Dev environment
}

const goBack = () => uni.navigateBack();

const openWebsite = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=' + encodeURIComponent('https://qingmu.cloud')
  });
};

const copyEmail = () => {
  uni.setClipboardData({
    data: 'qingmu0v0@outlook.com',
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success'
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background-color: var(--secondary-50);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Background Decoration */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
  }
  
  .circle-1 {
    width: 200px;
    height: 200px;
    background: var(--primary-100);
    top: -50px;
    right: -50px;
  }

  .circle-2 {
    width: 150px;
    height: 150px;
    background: var(--accent-100);
    bottom: 10%;
    left: -50px;
  }

  .leaf {
    position: absolute;
    background: var(--primary-200);
    opacity: 0.1;
    border-radius: 0 50% 0 50%;
  }
  
  .leaf-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: -20px;
    transform: rotate(45deg);
  }
}

.navbar {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-2) var(--spacing-4);
  padding-top: calc(var(--status-bar-height) + 16px);
  
  .nav-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    color: var(--secondary-900);
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    transition: all 0.2s;
    
    &.glass {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    
    &:active {
      transform: scale(0.95);
      background: rgba(255, 255, 255, 0.8);
    }
  }
}

.content-wrapper {
  flex: 1;
  padding: var(--spacing-4);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: var(--spacing-6) 0;
  
  .logo-wrapper {
    position: relative;
    margin-bottom: var(--spacing-4);
    
    .logo {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-xl);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      position: relative;
      z-index: 2;
    }
    
    .logo-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90px;
      height: 90px;
      background: var(--primary-200);
      filter: blur(20px);
      border-radius: 50%;
      z-index: 1;
      opacity: 0.6;
    }
  }
  
  .app-name {
    font-size: 24px;
    font-weight: 800;
    color: var(--secondary-900);
    margin-bottom: var(--spacing-1);
    letter-spacing: 0.5px;
  }
  
  .version {
    font-size: var(--text-sm);
    color: var(--secondary-500);
    background: rgba(255, 255, 255, 0.5);
    padding: 2px 10px;
    border-radius: var(--radius-full);
  }
}

.card-section {
  margin-bottom: var(--spacing-5);
  
  .section-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    padding-left: var(--spacing-1);
    
    .title {
      font-size: var(--text-base);
      font-weight: var(--font-bold);
      color: var(--secondary-800);
    }
  }
  
  .info-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    padding: var(--spacing-4);
    box-shadow: var(--shadow-sm);
    border: 1px solid rgba(255, 255, 255, 0.6);
    
    .text {
      font-size: var(--text-sm);
      color: var(--secondary-600);
      line-height: 1.8;
      text-align: justify;
    }
    
    &.contact-card {
      padding: 0;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      padding: var(--spacing-4);
      transition: all 0.2s;
      
      &:active {
        background: rgba(255, 255, 255, 0.5);
      }
      
      .contact-icon {
        width: 36px;
        height: 36px;
        background: var(--primary-50);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-3);
      }
      
      .contact-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .label {
          font-size: 12px;
          color: var(--secondary-400);
          margin-bottom: 2px;
        }
        
        .value {
          font-size: 14px;
          color: var(--secondary-800);
          font-weight: 500;
        }
      }
    }
    
    .divider {
      height: 1px;
      background: var(--secondary-100);
      margin: 0 var(--spacing-4);
    }
  }
}

.footer {
  margin-top: auto;
  text-align: center;
  padding-bottom: calc(var(--spacing-6) + env(safe-area-inset-bottom));
  
  .copyright {
    font-size: 10px;
    color: var(--secondary-400);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}
</style>