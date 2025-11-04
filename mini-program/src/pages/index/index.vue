<template>
  <view class="container">
    <view class="header">
      <!-- New Animated Logo -->
      <view class="logo-container">
        <image class="logo-image" src="/static/AI.png" mode="aspectFit"></image>
      </view>
      <text class="title">AI植物虫害识别</text>
      <text class="subtitle" :key="currentSubtitle">{{ currentSubtitle }}</text>
    </view>

    <wd-card title="开始识别" custom-class="main-card">
      <view class="card-content">
        <wd-icon name="camera" size="50px" color="#4caf50"></wd-icon>
        <text class="upload-text">请上传或拍摄一张清晰的害虫照片</text>
      </view>
      <wd-button type="success" block size="large" custom-class="scan-button" @click="startScan">
        拍照识别
      </wd-button>
    </wd-card>

    <wd-grid :column="2" clickable custom-class="menu-grid">
      <view @click="goToHistory">
        <wd-grid-item icon="history" text="识别历史" />
      </view>
      <view @click="goToAbout">
        <wd-grid-item icon="info-circle" text="关于我们" />
      </view>
    </wd-grid>

    <view class="footer">
      <text>青木 © 2025</text>
      <view class="contact-info">
        <view class="contact-item" @click="copyEmail">
          <wd-icon name="mail" size="16px" color="#4caf50"></wd-icon>
          <text class="email">qingmu0v0@outlook.com</text>
        </view>
        <view class="contact-item" @click="openWebsite">
          <wd-icon name="link" size="16px" color="#4caf50"></wd-icon>
          <text class="website">qingmu.cloud</text>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
  background: linear-gradient(135deg, #e0f2e0, #f5fff5, #e6f7ff);
  background-size: 400% 400%;
  animation: backgroundAnimation 15s ease infinite;
}

@keyframes backgroundAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.header, .main-card, .menu-grid {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.main-card {
  animation-delay: 0.2s;
}

.menu-grid {
  animation-delay: 0.4s;
}

@keyframes fadeInUp {
  from {
    transform: translateY(30rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.header {
  text-align: center;
  margin-top: 80rpx;
  margin-bottom: 60rpx;

  .logo-container {
    width: 150rpx;
    height: 150rpx;
    margin: 0 auto 20rpx;
    animation: float 4s ease-in-out infinite;
    .logo-image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15rpx);
  }
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
}

.subtitle {
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 10rpx;
  height: 40rpx;
  display: block; /* Changed from inline-block to block */
  background: linear-gradient(45deg, #4caf50, #2196f3, #f44336, #ffeb3b);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 400% 400%;
  animation: gradientAnimation 6s ease infinite, fadeInOut 3s ease-in-out infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes fadeInOut {
  0%, 90%, 100% {
    opacity: 0;
    transform: translateY(10rpx);
  }
  10%, 80% {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.main-card) {
  width: 90%;
  margin-bottom: 80rpx; /* 增加底部边距，提供更多空白 */
  --wd-card-border-radius: 40rpx;
  --wd-card-box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40rpx 0;
    .upload-text {
      font-size: 26rpx;
      color: #666;
      margin-top: 20rpx;
    }
  }
  .scan-button {
    margin-top: 20rpx;
    margin-bottom: 20rpx; /* 增加按钮底部边距 */
    --wd-button-large-height: 90rpx;
    --wd-button-border-radius: 50rpx;
    font-size: 32rpx;
  }
}

:deep(.menu-grid) {
  width: 90%;
  --wd-grid-item-content-padding: 30rpx 16rpx;
  --wd-grid-item-icon-size: 50rpx;
  --wd-grid-item-text-font-size: 26rpx;
  --wd-grid-item-text-margin-top: 16rpx;
  --wd-grid-item-bg-color: rgba(255, 255, 255, 0.7);
  --wd-grid-item-border-radius: 20rpx;
}

.footer {
    position: absolute;
    bottom: 40rpx;
    font-size: 24rpx;
    color: #888;
    text-align: center;
    width: 100%;
    
    .contact-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20rpx;
      margin-top: 10rpx;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 10rpx;
        
        .email, .website {
          color: #4caf50;
          text-decoration: underline;
        }
      }
    }
    
    .icp-number {
      font-size: 20rpx;
      color: #999;
      margin-top: 10rpx;
    }
  }
</style>
