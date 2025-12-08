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
        <view class="nav-btn">
          <wd-icon name="arrow-left" size="20px" color="var(--secondary-800)"></wd-icon>
        </view>
      </view>
      <text class="nav-title">识别历史</text>
      <view class="nav-right" @click="clearHistory">
        <view class="nav-btn danger">
          <wd-icon name="delete" size="20px" color="var(--danger-500)"></wd-icon>
        </view>
      </view>
    </view>

    <!-- 筛选和统计 -->
    <view class="header-section">
      <view class="stats-row">
        <view class="stat-info">
          <text class="stat-count">{{ historyList.length }}</text>
          <text class="stat-label">条记录</text>
        </view>
        <view class="export-btn" @click="exportHistory">
          <wd-icon name="download" size="14px" color="var(--primary-600)"></wd-icon>
          <text>导出数据</text>
        </view>
      </view>
      
      <view class="filter-tabs">
        <view 
          class="tab-item" 
          :class="{ active: currentFilter === 'all' }" 
          @click="setFilter('all')"
        >全部</view>
        <view 
          class="tab-item" 
          :class="{ active: currentFilter === 'plant' }" 
          @click="setFilter('plant')"
        >植物</view>
        <view 
          class="tab-item" 
          :class="{ active: currentFilter === 'pest' }" 
          @click="setFilter('pest')"
        >害虫</view>
      </view>
    </view>

    <!-- 列表内容 -->
    <scroll-view scroll-y class="main-scroll" :show-scrollbar="false">
      <view class="content-wrapper">
        <view class="history-list" v-if="filteredHistoryList.length > 0">
          <view 
            class="history-card animate-slide-up" 
            v-for="(item, index) in filteredHistoryList" 
            :key="item.id"
            :style="{ animationDelay: `${index * 0.05}s` }"
            @click="goToResult(item)"
          >
            <view class="card-thumb-wrapper">
              <image :src="item.imagePath" mode="aspectFill" class="card-thumb"></image>
              <view v-if="item.analysisResult?.identificationType === 'pest'" class="pest-badge">
                <view class="bug-dot"></view>
              </view>
            </view>
            
            <view class="card-content">
              <view class="card-header">
                <text class="card-title">{{ getDisplayName(item.analysisResult) }}</text>
                <view class="confidence-badge">
                  {{ (item.analysisResult?.confidence * 100).toFixed(0) }}%
                </view>
              </view>
              
              <view class="card-meta">
                <view class="meta-tag" :class="item.analysisResult?.identificationType">
                  {{ item.analysisResult?.identificationType === 'plant' ? '植物' : '害虫' }}
                </view>
                <text class="meta-time">{{ formatTime(item.timestamp || item.id) }}</text>
              </view>
              
              <view class="card-actions">
                <view class="action-btn" @click.stop="deleteHistory(item.id)">
                  <wd-icon name="delete" size="16px" color="var(--secondary-400)"></wd-icon>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-else class="empty-state">
          <view class="empty-img-wrapper">
            <view class="empty-decoration">
              <wd-icon name="search" size="32px" color="var(--primary-300)" class="empty-magnifier"></wd-icon>
              <view class="empty-bug"></view>
            </view>
          </view>
          <text class="empty-text">暂无识别记录</text>
          <button class="btn-primary" @click="goToHome">
            <wd-icon name="camera" size="18px" color="white"></wd-icon>
            <text>去识别</text>
          </button>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onShow, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const currentFilter = ref('all');
const historyList = ref<any[]>([]);

const filteredHistoryList = computed(() => {
  if (currentFilter.value === 'all') {
    return historyList.value;
  }
  return historyList.value.filter(item => item.analysisResult?.identificationType === currentFilter.value);
});

const setFilter = (filter: string) => {
  currentFilter.value = filter;
};

const getDisplayName = (result: any) => {
  if (!result) return '未知对象';
  if (result.identificationType === 'pest' && result.pestName) {
    return result.pestName;
  }
  return result.plantName || '未知对象';
};

const loadHistory = () => {
  try {
    const historyData = uni.getStorageSync('recognitionHistory'); // Corrected key from previous code
    if (historyData) {
      // Sort by newest first
      const data = JSON.parse(historyData);
      if (Array.isArray(data)) {
         historyList.value = data.sort((a: any, b: any) => (b.timestamp || b.id) - (a.timestamp || a.id));
      }
    }
  } catch (error) {
    console.error('加载历史记录失败:', error);
  }
};

onShow(() => {
  loadHistory();
});

const exportHistory = () => {
  uni.showToast({
    title: '导出功能开发中',
    icon: 'none'
  });
};

const deleteHistory = (id: string) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条记录吗？',
    success: (res) => {
      if (res.confirm) {
        historyList.value = historyList.value.filter(item => item.id !== id);
        uni.setStorageSync('recognitionHistory', JSON.stringify(historyList.value));
        uni.showToast({
          title: '已删除',
          icon: 'success'
        });
      }
    }
  });
};

const clearHistory = () => {
  if (historyList.value.length === 0) return;
  
  uni.showModal({
    title: '清空历史',
    content: '确定要清空所有记录吗？此操作不可恢复。',
    confirmColor: '#FF4D4F',
    success: (res) => {
      if (res.confirm) {
        historyList.value = [];
        uni.removeStorageSync('recognitionHistory');
        uni.showToast({
          title: '已清空',
          icon: 'success'
        });
      }
    }
  });
};

const goBack = () => uni.navigateBack();

const goToResult = (item: any) => {
  uni.navigateTo({
    url: '/pages/result/result?image=' + encodeURIComponent(item.imagePath) + '&analysisResult=' + encodeURIComponent(JSON.stringify(item.analysisResult)),
  });
};

const goToHome = () => {
  uni.reLaunch({
    url: '/pages/index/index'
  });
};

const formatTime = (timestamp: number) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}-${day} ${hours}:${minutes}`;
};

// Share
onShareAppMessage(() => ({
  title: 'AI植物虫害识别 - 我的识别历史',
  path: '/pages/index/index'
}));

onShareTimeline(() => ({
  title: 'AI植物虫害识别',
  query: ''
}));
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background-color: var(--secondary-50);
  display: flex;
  flex-direction: column;
  position: relative;
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
    width: 100px;
    height: 100px;
    top: 20%;
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
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  
  .nav-title {
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
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid var(--secondary-100);
    
    &.danger {
      background: var(--danger-50);
      border-color: var(--danger-100);
    }
    
    &:active {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }
}

.header-section {
  background: rgba(255, 255, 255, 0.9);
  padding: var(--spacing-4);
  padding-bottom: 0;
  border-bottom-left-radius: var(--radius-xl);
  border-bottom-right-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  z-index: 10;
  backdrop-filter: blur(5px);
  
  .stats-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: var(--spacing-4);
    
    .stat-info {
      .stat-count {
        font-size: 32px;
        font-weight: 800;
        color: var(--primary-700);
        margin-right: 4px;
        line-height: 1;
      }
      .stat-label {
        font-size: var(--text-sm);
        color: var(--secondary-500);
      }
    }
    
    .export-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      background: var(--primary-50);
      border: 1px solid var(--primary-100);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      color: var(--primary-700);
      font-weight: var(--font-medium);
      
      &:active {
        background: var(--primary-100);
      }
    }
  }
  
  .filter-tabs {
    display: flex;
    gap: var(--spacing-4);
    
    .tab-item {
      padding-bottom: var(--spacing-3);
      font-size: var(--text-sm);
      color: var(--secondary-500);
      position: relative;
      transition: all 0.3s;
      
      &.active {
        color: var(--primary-600);
        font-weight: var(--font-bold);
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: var(--primary-600);
          border-radius: var(--radius-full);
        }
      }
    }
  }
}

.main-scroll {
  flex: 1;
  height: 0;
  z-index: 5;
}

.content-wrapper {
  padding: var(--spacing-4);
  padding-bottom: calc(var(--spacing-8) + env(safe-area-inset-bottom));
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.history-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-lg);
  padding: var(--spacing-3);
  display: flex;
  gap: var(--spacing-3);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  border: 1px solid transparent;
  
  &:active {
    transform: scale(0.99);
    background: white;
  }
  
  .card-thumb-wrapper {
    position: relative;
    width: 80px;
    height: 80px;
    flex-shrink: 0;

    .card-thumb {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-md);
      background: var(--secondary-200);
    }

    .pest-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: white;
      border-radius: 50%;
      padding: 2px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      .bug-dot {
        width: 8px;
        height: 8px;
        background: var(--danger-500);
        border-radius: 50%;
        position: relative;
        
        &::before, &::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--danger-500);
          top: -2px;
          border-radius: 50%;
        }
        &::before { left: -1px; }
        &::after { right: -1px; }
      }
    }
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      
      .card-title {
        font-size: var(--text-base);
        font-weight: var(--font-bold);
        color: var(--secondary-900);
        margin-right: var(--spacing-2);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .confidence-badge {
        font-size: 10px;
        background: var(--primary-50);
        color: var(--primary-700);
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        flex-shrink: 0;
      }
    }
    
    .card-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      
      .meta-tag {
        font-size: 10px;
        padding: 2px 6px;
        border-radius: var(--radius-sm);
        
        &.plant {
          background: var(--success-50);
          color: var(--success-700);
        }
        &.pest {
          background: var(--danger-50);
          color: var(--danger-700);
        }
      }
      
      .meta-time {
        font-size: 10px;
        color: var(--secondary-400);
      }
    }
    
    .card-actions {
      display: flex;
      justify-content: flex-end;
      
      .action-btn {
        padding: 4px;
        margin: -4px; 
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: var(--spacing-10);
  
  .empty-img-wrapper {
    width: 120px;
    height: 120px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-6);
    box-shadow: var(--shadow-sm);
    position: relative;

    .empty-decoration {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .empty-magnifier {
        z-index: 2;
      }
      
      .empty-bug {
        position: absolute;
        width: 12px;
        height: 12px;
        background: var(--accent-300);
        border-radius: 50%;
        top: 30px;
        right: 30px;
        opacity: 0.6;
        
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid var(--accent-400);
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      }
    }
  }
  
  .empty-text {
    font-size: var(--text-base);
    color: var(--secondary-500);
    margin-bottom: var(--spacing-8);
  }
  
  .btn-primary {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    background: var(--primary-600);
    color: white;
    padding: var(--spacing-3) var(--spacing-8);
    border-radius: var(--radius-full);
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
    
    &:active {
      transform: scale(0.98);
      background: var(--primary-700);
    }
  }
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
