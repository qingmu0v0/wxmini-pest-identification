<template>
  <view class="container">
    <wd-card title="关于我们" custom-class="about-card">
      <view class="about-content">
        <text class="app-name">AI植物虫害识别</text>
        <text class="version">版本：1.0.0</text>
        <text class="description">
          本应用旨在利用人工智能技术，帮助用户快速准确地识别植物病虫害，
          提供详细的分析报告和防治建议，助力农业生产，守护绿色丰收。
        </text>
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
        <text class="copyright">青木 © 2025 All Rights Reserved.</text>
      </view>
    </wd-card>
  </view>
</template>

<script setup lang="ts">
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

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
  padding: 40rpx;
  background-color: #f7f8fa;
  min-height: 100vh;
}

:deep(.about-card) {
  width: 90%;
  --wd-card-border-radius: 20rpx;
  --wd-card-box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.05);
}

.about-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;
  text-align: center;

  .app-name {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  .version {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 30rpx;
  }
  .description {
    font-size: 30rpx;
    color: #555;
    line-height: 1.6;
    margin-bottom: 40rpx;
  }
  .contact-info {
      margin-bottom: 40rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20rpx;
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 10rpx;
        
        .email, .website {
          font-size: 28rpx;
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
  .copyright {
    font-size: 24rpx;
    color: #999;
  }
}
</style>