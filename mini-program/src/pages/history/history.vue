<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="navbar-content">
        <view class="nav-item" @click="goBack">
          <wd-icon name="arrow-left" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
        <text class="navbar-title">识别历史</text>
        <view class="nav-item" @click="clearHistory">
          <wd-icon name="delete" size="20px" color="var(--secondary-600)"></wd-icon>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 统计信息卡片 -->
      <view class="stats-card animate-fade-up">
        <view class="stats-icon">
          <wd-icon name="chart-bar" size="24px" color="var(--primary-600)"></wd-icon>
        </view>
        <view class="stats-content">
          <text class="stats-title">识别统计</text>
          <text class="stats-value">{{ historyList.length }} 次识别</text>
        </view>
        <view class="stats-action">
          <button class="btn-text" @click="exportHistory">
            <wd-icon name="download" size="16px" color="var(--primary-600)"></wd-icon>
            <text>导出</text>
          </button>
        </view>
      </view>

      <!-- 筛选标签 -->
      <view class="filter-container animate-fade-up animation-delay-200">
        <scroll-view scroll-x class="filter-scroll">
          <view class="filter-tags">
            <view 
              class="filter-tag" 
              :class="{ active: currentFilter === 'all' }" 
              @click="setFilter('all')"
            >
              <text>全部</text>
            </view>
            <view 
              class="filter-tag" 
              :class="{ active: currentFilter === 'plant' }" 
              @click="setFilter('plant')"
            >
              <text>植物</text>
            </view>
            <view 
              class="filter-tag" 
              :class="{ active: currentFilter === 'pest' }" 
              @click="setFilter('pest')"
            >
              <text>害虫</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 历史记录列表 -->
      <view class="history-list animate-fade-up animation-delay-400">
        <view 
          v-for="(item, index) in filteredHistoryList" 
          :key="item.id" 
          class="history-item"
          @click="goToResult(item)"
        >
          <view class="history-image-container">
            <image :src="item.imagePath" mode="aspectFill" class="history-image"></image>
            <view class="history-type-badge" :class="item.analysisResult.identificationType">
              <text>{{ item.analysisResult.identificationType === 'plant' ? '植物' : '害虫' }}</text>
            </view>
          </view>
          
          <view class="history-content">
            <view class="history-header">
              <text class="history-title">{{ item.analysisResult.plantName || '未知对象' }}</text>
              <view class="history-confidence">
                <text>{{ (item.analysisResult.confidence * 100).toFixed(1) }}%</text>
              </view>
            </view>
            
            <view class="history-details">
              <view class="detail-item" v-if="item.analysisResult.riskLevel">
                <wd-icon name="warning" size="14px" color="var(--warning-500)"></wd-icon>
                <text>风险等级: {{ item.analysisResult.riskLevel }}</text>
              </view>
              <view class="detail-item" v-if="item.analysisResult.aphidDetected !== undefined">
                <wd-icon name="bug" size="14px" color="var(--accent-500)"></wd-icon>
                <text>蚜虫检测: {{ item.analysisResult.aphidDetected ? '是' : '否' }}</text>
              </view>
            </view>
            
            <view class="history-footer">
              <text class="history-time">{{ formatTime(item.timestamp) }}</text>
              <view class="history-actions">
                <view class="action-btn" @click.stop="shareResult(item)">
                  <wd-icon name="share" size="16px" color="var(--secondary-500)"></wd-icon>
                </view>
                <view class="action-btn" @click.stop="deleteHistory(item.id)">
                  <wd-icon name="delete" size="16px" color="var(--danger-500)"></wd-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="historyList.length === 0" class="empty-state">
        <view class="empty-icon">
          <wd-icon name="inbox" size="48px" color="var(--secondary-300)"></wd-icon>
        </view>
        <text class="empty-title">暂无识别记录</text>
        <text class="empty-desc">点击下方按钮开始识别</text>
        <button class="btn-primary" @click="goToHome">
          <wd-icon name="camera" size="18px" color="white"></wd-icon>
          <text>开始识别</text>
        </button>
      </view>
    </view>
    
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
import { ref, computed, onMounted } from 'vue'
import { onLoad, onShow, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

// 筛选状态
const currentFilter = ref('all')

// 历史记录列表
const historyList = ref<any[]>([])

// 根据筛选条件过滤历史记录
const filteredHistoryList = computed(() => {
  if (currentFilter.value === 'all') {
    return historyList.value
  }
  return historyList.value.filter(item => item.analysisResult.identificationType === currentFilter.value)
})

// 设置筛选条件
const setFilter = (filter: string) => {
  currentFilter.value = filter
}

// 导出历史记录
const exportHistory = () => {
  uni.showToast({
    title: '导出功能开发中',
    icon: 'none'
  })
}

// 分享结果
const shareResult = (item: any) => {
  uni.showShareMenu({
    withShareTicket: true
  })
}

// 删除单个历史记录
const deleteHistory = (id: string) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条识别记录吗？',
    success: (res) => {
      if (res.confirm) {
        historyList.value = historyList.value.filter(item => item.id !== id)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 查看结果详情
const goToResult = (item: any) => {
  uni.navigateTo({
    url: `/pages/result/result?id=${item.id}`
  })
}

// 跳转到首页
const goToHome = () => {
  uni.switchTab({
    url: '/pages/index/index'
  })
}

// 清空历史记录
const clearHistory = () => {
  if (historyList.value.length === 0) {
    uni.showToast({
      title: '暂无记录可清空',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有识别记录吗？此操作不可恢复',
    success: (res) => {
      if (res.confirm) {
        historyList.value = []
        uni.showToast({
          title: '清空成功',
          icon: 'success'
        })
      }
    }
  })
}

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 加载历史记录
const loadHistory = () => {
  try {
    const historyData = uni.getStorageSync('identificationHistory')
    if (historyData) {
      historyList.value = JSON.parse(historyData)
    }
  } catch (error) {
    console.error('加载历史记录失败:', error)
  }
}

// uni-app页面生命周期钩子
onShow(() => {
  loadHistory();
});

// 分享功能
onShareAppMessage(() => {
  return {
    title: 'AI植物虫害识别 - 我的识别历史',
    path: '/pages/index/index',
    imageUrl: '/static/share-image.png'
  };
});

// 分享到朋友圈
onShareTimeline(() => {
  return {
    title: 'AI植物虫害识别 - 精准识别，守护丰收',
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

onMounted(() => {
  loadHistory()
})
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: var(--secondary-50);
  position: relative;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  box-shadow: var(--shadow-sm);
  
  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4) var(--spacing-5);
    
    .nav-item {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--secondary-100);
      border-radius: var(--radius-full);
      transition: all var(--transition-base);
      
      &:active {
        transform: scale(0.95);
        background-color: var(--secondary-200);
      }
    }
    
    .navbar-title {
      font-size: var(--text-lg);
      font-weight: var(--font-semibold);
      color: var(--secondary-800);
    }
  }
}

.main-content {
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
}

.stats-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-sm);
  
  .stats-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background-color: var(--primary-100);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--spacing-4);
  }
  
  .stats-content {
    flex: 1;
    
    .stats-title {
      font-size: var(--text-sm);
      color: var(--secondary-600);
      margin-bottom: var(--spacing-1);
    }
    
    .stats-value {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
      color: var(--secondary-800);
    }
  }
  
  .stats-action {
    .btn-text {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      background-color: transparent;
      color: var(--primary-600);
      border: 1px solid var(--primary-200);
      border-radius: var(--radius-md);
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--text-sm);
      font-weight: var(--font-medium);
      transition: all var(--transition-base);
      
      &:active {
        background-color: var(--primary-50);
      }
    }
  }
}

.filter-container {
  .filter-scroll {
    white-space: nowrap;
  }
  
  .filter-tags {
    display: flex;
    gap: var(--spacing-3);
    padding-bottom: var(--spacing-2);
    
    .filter-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: 1px solid var(--secondary-200);
      border-radius: var(--radius-full);
      padding: var(--spacing-2) var(--spacing-4);
      font-size: var(--text-sm);
      color: var(--secondary-600);
      transition: all var(--transition-base);
      white-space: nowrap;
      
      &.active {
        background-color: var(--primary-500);
        border-color: var(--primary-500);
        color: white;
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  
  .history-item {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    transition: all var(--transition-base);
    
    &:active {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .history-image-container {
      position: relative;
      width: 120px;
      height: 120px;
      flex-shrink: 0;
      
      .history-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .history-type-badge {
        position: absolute;
        top: var(--spacing-2);
        left: var(--spacing-2);
        padding: var(--spacing-1) var(--spacing-2);
        border-radius: var(--radius-full);
        font-size: var(--text-xs);
        font-weight: var(--font-medium);
        
        &.plant {
          background-color: var(--success-500);
          color: white;
        }
        
        &.pest {
          background-color: var(--danger-500);
          color: white;
        }
      }
    }
    
    .history-content {
      flex: 1;
      padding: var(--spacing-4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .history-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-2);
        
        .history-title {
          font-size: var(--text-base);
          font-weight: var(--font-semibold);
          color: var(--secondary-800);
          max-width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .history-confidence {
          background-color: var(--primary-100);
          color: var(--primary-700);
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-md);
        }
      }
      
      .history-details {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-3);
        margin-bottom: var(--spacing-3);
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          font-size: var(--text-sm);
          color: var(--secondary-600);
        }
      }
      
      .history-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .history-time {
          font-size: var(--text-xs);
          color: var(--secondary-500);
        }
        
        .history-actions {
          display: flex;
          gap: var(--spacing-2);
          
          .action-btn {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--secondary-100);
            border-radius: var(--radius-full);
            transition: all var(--transition-base);
            
            &:active {
              transform: scale(0.9);
              background-color: var(--secondary-200);
            }
          }
        }
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-10) var(--spacing-5);
  text-align: center;
  
  .empty-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-100);
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-4);
  }
  
  .empty-title {
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--secondary-800);
    margin-bottom: var(--spacing-2);
  }
  
  .empty-desc {
    font-size: var(--text-sm);
    color: var(--secondary-600);
    margin-bottom: var(--spacing-6);
  }
  
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

.footer {
  padding: var(--spacing-5);
  text-align: center;
  font-size: var(--text-xs);
  color: var(--secondary-500);
  margin-top: auto;
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
</style>