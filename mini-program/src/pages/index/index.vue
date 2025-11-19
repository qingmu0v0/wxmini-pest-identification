<template>
  <view class="container hero-gradient">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-content">
        <view class="logo-container">
          <image class="logo-image" src="/static/logo.png" mode="aspectFit"></image>
          <text class="logo-text">植物虫害AI识别</text>
        </view>
        <view class="nav-actions">
          <view class="nav-item" @click="goToHistory">
            <wd-icon name="history" size="20px" color="var(--secondary-600)"></wd-icon>
          </view>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 标题区域 -->
      <view class="hero-section animate-fade-up">
        <view class="badge">
          <wd-icon name="sparkles" size="16px" color="var(--primary-600)"></wd-icon>
          <text class="badge-text">基于深度学习的智能识别技术</text>
        </view>
        
        <view class="title-container">
          <text class="title-main">植物虫害</text>
          <text class="title-accent">AI智能识别</text>
        </view>
        
        <text class="subtitle">{{ currentSubtitle }}</text>
      </view>

      <!-- 数据展示区域 -->
      <view class="stats-container animate-fade-up animation-delay-200">
        <view class="stat-item">
          <text class="stat-value">99.2%</text>
          <text class="stat-label">识别准确率</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">200+</text>
          <text class="stat-label">病虫害种类</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">15s</text>
          <text class="stat-label">识别速度</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">1万+</text>
          <text class="stat-label">用户信赖</text>
        </view>
      </view>

      <!-- 主要功能卡片 -->
      <view class="feature-card animate-scale-in animation-delay-400">
        <view class="feature-header">
          <view class="feature-icon">
            <wd-icon name="camera" size="32px" color="white"></wd-icon>
          </view>
          <text class="feature-title">开始识别</text>
        </view>
        <text class="feature-desc">请上传或拍摄一张清晰的害虫照片</text>
        <view class="feature-action">
          <button class="btn-primary" @click="startScan">
            <wd-icon name="camera" size="18px" color="white"></wd-icon>
            <text>拍照识别</text>
          </button>
        </view>
      </view>

      <!-- 功能网格 -->
      <view class="function-grid animate-fade-up animation-delay-600">
        <view class="function-item" @click="goToHistory">
          <view class="function-icon-container" style="background-color: var(--accent-100);">
            <wd-icon name="history" size="24px" color="var(--accent-600)"></wd-icon>
          </view>
          <text class="function-title">识别历史</text>
          <text class="function-desc">查看历史识别记录</text>
        </view>
        <view class="function-item" @click="goToAbout">
          <view class="function-icon-container" style="background-color: var(--primary-100);">
            <wd-icon name="info-circle" size="24px" color="var(--primary-600)"></wd-icon>
          </view>
          <text class="function-title">关于我们</text>
          <text class="function-desc">了解更多信息</text>
        </view>
      </view>
    </view>

    <!-- 底部信息 -->
    <view class="footer">
      <text class="footer-text">青木 © 2025</text>
      <view class="contact-info">
        <view class="contact-item" @click="copyEmail">
          <wd-icon name="mail" size="16px" color="var(--primary-600)"></wd-icon>
          <text class="contact-text">qingmu0v0@outlook.com</text>
        </view>
        <view class="contact-item" @click="openWebsite">
          <wd-icon name="link" size="16px" color="var(--primary-600)"></wd-icon>
          <text class="contact-text">qingmu.cloud</text>
        </view>
      </view>
      <text class="icp-number">鄂ICP备2025089336号</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { uploadFile } from '../../utils/request'; // 导入上传文件方法

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
    imageUrl: '/static/share-image.png' // 分享图片，如果没有会使用默认截图
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: 'AI植物虫害识别 - 智能分析，预警病害',
    query: '',
    imageUrl: '/static/share-image.png' // 分享图片，如果没有会使用默认截图
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
      try {
        // 调用上传文件方法，默认模型类型为qwen3
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

        uni.navigateTo({
          url: '/pages/result/result?image=' + encodeURIComponent(imagePath) + '&analysisResult=' + encodeURIComponent(JSON.stringify(analysisResult)),
        });
      } catch (error) {
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

// 复制邮箱地址
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

// 打开官网
const openWebsite = () => {
  uni.showModal({
    title: '提示',
    content: '即将跳转到青木官网',
    success: (res) => {
      if (res.confirm) {
        // 在小程序中可以使用web-view或者复制链接让用户在浏览器中打开
        uni.setClipboardData({
          data: 'https://qingmu.cloud',
          success: () => {
            uni.showToast({
              title: '网址已复制，请在浏览器中打开',
              icon: 'none',
              duration: 3000
            });
          }
        });
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: var(--secondary-50);
  position: relative;
  overflow: hidden;
}

.hero-gradient {
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--primary-100) 0%, transparent 70%);
    opacity: 0.5;
    z-index: 0;
    animation: float 20s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -30%;
    width: 160%;
    height: 160%;
    background: radial-gradient(circle, var(--accent-100) 0%, transparent 70%);
    opacity: 0.4;
    z-index: 0;
    animation: float 25s ease-in-out infinite reverse;
  }
}

.navbar {
  position: relative;
  z-index: 10;
  padding: var(--spacing-4) 0;
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--spacing-5);
    
    .logo-container {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      
      .logo-image {
        width: 40px;
        height: 40px;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-md);
      }
      
      .logo-text {
        font-size: var(--text-xl);
        font-weight: var(--font-bold);
        color: var(--secondary-800);
      }
    }
    
    .nav-actions {
      display: flex;
      gap: var(--spacing-3);
      
      .nav-item {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-sm);
        transition: all var(--transition-base);
        
        &:active {
          transform: scale(0.95);
          background-color: var(--secondary-100);
        }
      }
    }
  }
}

.main-content {
  position: relative;
  z-index: 5;
  padding: var(--spacing-6) var(--spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
}

.hero-section {
  text-align: center;
  margin-bottom: var(--spacing-4);
  
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    background-color: var(--primary-50);
    border: 1px solid var(--primary-200);
    border-radius: var(--radius-full);
    padding: var(--spacing-2) var(--spacing-4);
    margin-bottom: var(--spacing-4);
    
    .badge-text {
      font-size: var(--text-sm);
      color: var(--primary-700);
      font-weight: var(--font-medium);
    }
  }
  
  .title-container {
    margin-bottom: var(--spacing-4);
    
    .title-main {
      display: block;
      font-size: 48px;
      font-weight: var(--font-bold);
      color: var(--secondary-900);
      line-height: 1.1;
      margin-bottom: var(--spacing-2);
    }
    
    .title-accent {
      display: block;
      font-size: 48px;
      font-weight: var(--font-bold);
      background: linear-gradient(to right, var(--primary-600), var(--accent-600));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      line-height: 1.1;
    }
  }
  
  .subtitle {
    font-size: var(--text-lg);
    color: var(--secondary-600);
    line-height: 1.6;
    max-width: 80%;
    margin: 0 auto;
  }
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-6);
  
  .stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--spacing-4);
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin: 0 var(--spacing-1);
    
    .stat-value {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      color: var(--primary-600);
      margin-bottom: var(--spacing-1);
    }
    
    .stat-label {
      font-size: var(--text-sm);
      color: var(--secondary-600);
    }
  }
}

.feature-card {
  background-color: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-6);
  text-align: center;
  margin-bottom: var(--spacing-6);
  
  .feature-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: var(--spacing-4);
    
    .feature-icon {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--spacing-3);
    }
    
    .feature-title {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      color: var(--secondary-800);
    }
  }
  
  .feature-desc {
    font-size: var(--text-base);
    color: var(--secondary-600);
    margin-bottom: var(--spacing-5);
    line-height: 1.5;
  }
  
  .feature-action {
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      background: linear-gradient(to right, var(--primary-500), var(--primary-600));
      color: white;
      border: none;
      border-radius: var(--radius-lg);
      padding: var(--spacing-3) var(--spacing-6);
      font-size: var(--text-base);
      font-weight: var(--font-medium);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-base);
      
      &:active {
        transform: translateY(2px);
        box-shadow: var(--shadow-sm);
      }
    }
  }
}

.function-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-4);
  
  .function-item {
    background-color: white;
    border-radius: var(--radius-lg);
    padding: var(--spacing-5);
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all var(--transition-base);
    
    &:active {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .function-icon-container {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--spacing-3);
    }
    
    .function-title {
      font-size: var(--text-base);
      font-weight: var(--font-medium);
      color: var(--secondary-800);
      margin-bottom: var(--spacing-2);
    }
    
    .function-desc {
      font-size: var(--text-sm);
      color: var(--secondary-600);
      line-height: 1.4;
    }
  }
}

.footer {
  position: relative;
  z-index: 5;
  padding: var(--spacing-6) var(--spacing-5);
  text-align: center;
  margin-top: auto;
  
  .footer-text {
    font-size: var(--text-sm);
    color: var(--secondary-600);
    margin-bottom: var(--spacing-3);
    display: block;
  }
  
  .contact-info {
    display: flex;
    justify-content: center;
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-3);
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      
      .contact-text {
        font-size: var(--text-sm);
        color: var(--secondary-600);
      }
    }
  }
  
  .icp-number {
    font-size: var(--text-xs);
    color: var(--secondary-500);
    display: block;
  }
}

// 动画类
.animate-fade-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out forwards;
  transform: scale(0.9);
  opacity: 0;
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}
</style>
