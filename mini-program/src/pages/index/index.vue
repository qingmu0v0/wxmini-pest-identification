<template>
  <view class="page-container">
    <!-- 背景装饰 (Background Decoration) -->
    <view class="bg-decoration">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="leaf leaf-1"></view>
      <view class="leaf leaf-2"></view>
    </view>

    <!-- 顶部导航 -->
    <view class="navbar">
      <view class="brand">
        <image class="brand-logo" src="/static/logo.png" mode="aspectFit"></image>
        <text class="brand-name">植物虫害AI识别</text>
      </view>
    </view>

    <!-- 主要内容 -->
    <scroll-view scroll-y class="main-scroll" :show-scrollbar="false">
      <view class="content-wrapper">
        <!-- 欢迎标语 -->
        <view class="hero-section animate-fade-in">
          <text class="hero-title">守护您的<text class="highlight">绿色</text>家园</text>
          <text class="hero-subtitle">{{ currentSubtitle }}</text>
        </view>

        <!-- 核心功能卡片 (Master Design - Lens/Magnifier Concept) -->
        <view class="scan-card-wrapper animate-slide-up" @click="startScan">
          <view class="scan-card">
            <view class="lens-effect"></view>
            <view class="scan-content">
              <view class="scan-icon-wrapper">
                 <!-- 放大镜图标 -->
                <wd-icon name="search" size="48px" color="#ffffff" class="magnifier-icon"></wd-icon>
                 <!-- 虫子图标 (如果图标库支持 bug，否则用 warning 替代，但为了效果尽量模拟) -->
                 <!-- Assuming 'bug' might not be in the set, using 'warn-bold' or similar if bug fails, but trying CSS shape for bug if icon missing -->
                 <view class="bug-decoration">
                    <view class="bug-body"></view>
                    <view class="bug-head"></view>
                 </view>
              </view>
              <view class="scan-text">
                <text class="scan-title">拍照识别</text>
                <text class="scan-desc">点击拍摄，AI 专家为您诊断</text>
              </view>
            </view>
            <view class="scan-action">
              <text>立即开始</text>
              <wd-icon name="arrow-right" size="16px" color="#ffffff"></wd-icon>
            </view>
          </view>
          
          <!-- 装饰性元素：悬浮的虫子/叶子 -->
          <view class="floating-icon bug-icon-1">
             <!-- Simple CSS Bug Representation or Icon -->
             <view class="css-bug"></view>
          </view>
          <view class="floating-icon magnifier-icon-1">
             <wd-icon name="search" size="24px" color="rgba(34, 197, 94, 0.4)"></wd-icon>
          </view>
        </view>

        <!-- 数据统计 -->
        <view class="stats-row animate-slide-up delay-100">
          <view class="stat-item">
            <text class="stat-num">99%</text>
            <text class="stat-label">准确率</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-num">1000+</text>
            <text class="stat-label">可识别种类</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-num">6s内</text>
            <text class="stat-label">识别速度</text>
          </view>
        </view>

        <!-- 功能快捷入口 -->
        <view class="features-grid animate-slide-up delay-200">
          <view class="feature-item" @click="goToHistory">
            <view class="feature-icon history">
              <wd-icon name="history" size="24px" color="var(--primary-600)"></wd-icon>
            </view>
            <view class="feature-info">
              <text class="feature-name">识别历史</text>
              <text class="feature-brief">查看过往记录</text>
            </view>
          </view>
          
          <view class="feature-item" @click="goToAbout">
            <view class="feature-icon about">
              <wd-icon name="info-circle" size="24px" color="var(--primary-600)"></wd-icon>
            </view>
            <view class="feature-info">
              <text class="feature-name">关于我们</text>
              <text class="feature-brief">了解更多信息</text>
            </view>
          </view>
        </view>

        <!-- 底部版权与联系 -->
        <view class="footer animate-fade-in delay-300">
          <view class="contact-links">
            <view class="link-item" @click="copyEmail">
              <wd-icon name="mail" size="14px" color="var(--secondary-500)"></wd-icon>
              <text>联系支持</text>
            </view>
            <view class="link-divider">|</view>
            <view class="link-item" @click="openWebsite">
              <wd-icon name="link" size="14px" color="var(--secondary-500)"></wd-icon>
              <text>访问官网</text>
            </view>
          </view>
          <text class="copyright">青木 © 2025 · 鄂ICP备2025089336号</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { uploadFile } from '../../utils/request';

const subtitles = ref(['一眼认出病虫害，守住丰收粮满仓', '庄稼生病早知道，提前防治损失少', '科技种田就是好，粮食更多，票子也多']);
const currentSubtitleIndex = ref(0);
let intervalId: any = null;

const currentSubtitle = computed(() => subtitles.value[currentSubtitleIndex.value]);

onMounted(() => {
  intervalId = setInterval(() => {
    currentSubtitleIndex.value = (currentSubtitleIndex.value + 1) % subtitles.value.length;
  }, 3000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// 分享功能
onShareAppMessage(() => {
  return {
    title: 'AI植物虫害识别 - 精准识别，守护丰收',
    path: '/pages/index/index',
    imageUrl: '/static/share-image.png'
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: 'AI植物虫害识别 - 智能分析，预警病害',
    query: '',
    imageUrl: '/static/share-image.png'
  };
});

const startScan = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: async (res) => {
      const imagePath = res.tempFilePaths[0];
      console.log('选择的图片路径:', imagePath);
      
      // 显示加载提示
      uni.showLoading({
        title: '正在分析中...',
        mask: true
      });

      try {
        console.log('开始上传图片...');
        const analysisResult = await uploadFile(imagePath, 'qwen3');
        console.log('分析结果:', analysisResult);

        // 保存识别历史
        try {
          let history = uni.getStorageSync('recognitionHistory');
          history = history ? JSON.parse(history) : [];
          history.push({
            imagePath: imagePath,
            analysisResult: analysisResult,
            timestamp: Date.now(),
          });
          uni.setStorageSync('recognitionHistory', JSON.stringify(history));
        } catch (e) {
          console.error('Failed to save recognition history', e);
        }

        uni.hideLoading();
        uni.navigateTo({
          url: '/pages/result/result?image=' + encodeURIComponent(imagePath) + '&analysisResult=' + encodeURIComponent(JSON.stringify(analysisResult)),
        });
      } catch (error) {
        uni.hideLoading();
        console.error('图片上传或分析失败', error);
        uni.showToast({
          title: '识别失败，请重试',
          icon: 'none',
        });
      }
    },
  });
};

const goToHistory = () => {
  uni.navigateTo({
    url: '/pages/history/history',
  });
};

const goToAbout = () => {
  uni.navigateTo({
    url: '/pages/about/about',
  });
};

const copyEmail = () => {
  uni.setClipboardData({
    data: 'qingmu0v0@outlook.com',
    success: () => {
      uni.showToast({
        title: '邮箱已复制',
        icon: 'success',
        duration: 2000
      });
    }
  });
};

const openWebsite = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=' + encodeURIComponent('https://qingmu.cloud')
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

/* Master Design Background */
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  .circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.6;
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    background: var(--primary-200);
    top: -100px;
    right: -50px;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
    background: var(--primary-100);
    top: 20%;
    left: -50px;
  }

  .leaf {
    position: absolute;
    background: var(--primary-100);
    opacity: 0.2;
    border-radius: 0 50% 0 50%;
  }

  .leaf-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 10%;
    transform: rotate(45deg);
  }

  .leaf-2 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    right: 5%;
    transform: rotate(-15deg);
  }
}

.navbar {
  position: relative;
  z-index: 10;
  padding: var(--spacing-4) var(--spacing-6);
  padding-top: calc(var(--status-bar-height) + 24px);
  
  .brand {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
    
    .brand-logo {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-md);
    }
    
    .brand-name {
      font-size: var(--text-lg);
      font-weight: bold;
      color: var(--primary-900);
    }
  }
}

.main-scroll {
  flex: 1;
  position: relative;
  z-index: 10;
}

.content-wrapper {
  padding: var(--spacing-6);
  padding-bottom: calc(var(--spacing-8) + env(safe-area-inset-bottom));
}

.hero-section {
  margin-bottom: var(--spacing-8);
  margin-top: var(--spacing-4);
  
  .hero-title {
    display: block;
    font-size: 28px;
    font-weight: 800;
    color: var(--secondary-900);
    line-height: 1.2;
    margin-bottom: var(--spacing-3);
    
    .highlight {
      color: var(--primary-600);
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 2px;
        left: 0;
        width: 100%;
        height: 8px;
        background: var(--primary-200);
        z-index: -1;
        border-radius: 4px;
      }
    }
  }
  
  .hero-subtitle {
    font-size: var(--text-base);
    color: var(--secondary-500);
    line-height: 1.6;
  }
}

/* Master Design Scan Card */
.scan-card-wrapper {
  position: relative;
  margin-bottom: var(--spacing-8);
}

.scan-card {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  border-radius: 32px;
  padding: var(--spacing-8) var(--spacing-6);
  color: #fff;
  box-shadow: 0 20px 40px rgba(22, 163, 74, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  .lens-effect {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .scan-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-5);
  }

  .scan-icon-wrapper {
    position: relative;
    width: 72px;
    height: 72px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    
    .bug-decoration {
      position: absolute;
      bottom: 15px;
      right: 15px;
      width: 12px;
      height: 12px;
      
      .bug-body {
        width: 8px;
        height: 8px;
        background: var(--accent-400);
        border-radius: 50%;
        position: absolute;
      }
      .bug-head {
        width: 4px;
        height: 4px;
        background: #000;
        border-radius: 50%;
        position: absolute;
        top: -2px;
        left: 2px;
      }
    }
  }

  .scan-text {
    flex: 1;
    .scan-title {
      font-size: 24px;
      font-weight: bold;
      display: block;
      margin-bottom: var(--spacing-1);
    }
    .scan-desc {
      font-size: 14px;
      opacity: 0.9;
      display: block;
    }
  }

  .scan-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacing-2);
    font-size: 14px;
    font-weight: 600;
    opacity: 0.9;
  }
}

.floating-icon {
  position: absolute;
  z-index: -1;
  opacity: 0.6;
}

.bug-icon-1 {
  top: -10px;
  right: 20px;
  .css-bug {
    width: 20px;
    height: 20px;
    background: var(--primary-300);
    border-radius: 50%;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -5px;
      left: 5px;
      width: 10px;
      height: 10px;
      background: var(--primary-300);
      border-radius: 50%;
    }
  }
}

.magnifier-icon-1 {
  bottom: -15px;
  left: 20px;
  transform: rotate(-15deg);
}


/* Stats */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: var(--spacing-5) var(--spacing-6);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  
  .stat-item {
    text-align: center;
    flex: 1;
    
    .stat-num {
      display: block;
      font-size: 20px;
      font-weight: bold;
      color: var(--primary-700);
      margin-bottom: var(--spacing-1);
    }
    
    .stat-label {
      font-size: 12px;
      color: var(--secondary-500);
    }
  }
  
  .stat-divider {
    width: 1px;
    height: 24px;
    background-color: var(--secondary-200);
  }
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-8);
  
  .feature-item {
    background: #fff;
    padding: var(--spacing-5);
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    transition: all 0.2s;
    
    &:active {
      transform: scale(0.98);
    }
    
    .feature-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.history {
        background-color: var(--primary-50);
        color: var(--primary-600);
      }
      
      &.about {
        background-color: var(--secondary-100);
        color: var(--secondary-600);
      }
    }
    
    .feature-info {
      .feature-name {
        font-size: 16px;
        font-weight: bold;
        color: var(--secondary-900);
        display: block;
        margin-bottom: var(--spacing-1);
      }
      
      .feature-brief {
        font-size: 12px;
        color: var(--secondary-500);
      }
    }
  }
}

/* Footer */
.footer {
  text-align: center;
  margin-top: auto;
  
  .contact-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    
    .link-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      font-size: 13px;
      color: var(--secondary-500);
      padding: var(--spacing-2);
    }
    
    .link-divider {
      color: var(--secondary-300);
      font-size: 12px;
    }
  }
  
  .copyright {
    display: block;
    font-size: 11px;
    color: var(--secondary-400);
  }
}

// Animations
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
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
