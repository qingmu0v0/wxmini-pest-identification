<template>
  <view class="related-pest-images">
    <view class="section-title">相关虫害问题图片</view>
    <view class="images-container" v-if="relatedImages.length > 0">
      <view 
        class="image-item" 
        v-for="(image, index) in relatedImages" 
        :key="index"
        @click="previewImage(image.url)"
      >
        <image :src="image.url" mode="aspectFill" class="pest-image"></image>
        <view class="image-info">
          <text class="pest-name">{{ image.pestName }}</text>
          <text class="pest-description">{{ image.description }}</text>
        </view>
      </view>
    </view>
    <view class="no-images" v-else>
      <text>暂无相关虫害图片</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface RelatedImage {
  url: string;
  pestName: string;
  description: string;
}

const props = defineProps<{
  pestType?: string;
  pestName?: string;
}>();

const relatedImages = ref<RelatedImage[]>([]);

// 模拟相关虫害图片数据
const mockRelatedImages: { [key: string]: RelatedImage[] } = {
  '蚜虫': [
    {
      url: '/static/pests/aphid1.jpg',
      pestName: '蚜虫',
      description: '叶片背面的蚜虫群集'
    },
    {
      url: '/static/pests/aphid2.jpg',
      pestName: '蚜虫',
      description: '蚜虫造成的叶片卷曲'
    },
    {
      url: '/static/pests/aphid3.jpg',
      pestName: '蚜虫',
      description: '蚜虫分泌的蜜露'
    }
  ],
  '红蜘蛛': [
    {
      url: '/static/pests/spider_mite1.jpg',
      pestName: '红蜘蛛',
      description: '叶片上的红蜘蛛'
    },
    {
      url: '/static/pests/spider_mite2.jpg',
      pestName: '红蜘蛛',
      description: '红蜘蛛造成的叶片黄化'
    }
  ],
  '白粉虱': [
    {
      url: '/static/pests/whitefly1.jpg',
      pestName: '白粉虱',
      description: '叶片背面的白粉虱成虫'
    },
    {
      url: '/static/pests/whitefly2.jpg',
      pestName: '白粉虱',
      description: '白粉虱若虫'
    }
  ]
};

// 根据害虫类型获取相关图片
const fetchRelatedImages = () => {
  if (!props.pestName) return;
  
  // 查找匹配的害虫类型
  for (const [key, images] of Object.entries(mockRelatedImages)) {
    if (props.pestName?.includes(key)) {
      relatedImages.value = images;
      return;
    }
  }
  
  // 如果没有精确匹配，使用默认图片
  relatedImages.value = [
    {
      url: '/static/pests/default1.jpg',
      pestName: props.pestName || '常见害虫',
      description: '害虫形态特征'
    },
    {
      url: '/static/pests/default2.jpg',
      pestName: props.pestName || '常见害虫',
      description: '害虫危害症状'
    }
  ];
};

// 预览图片
const previewImage = (url: string) => {
  uni.previewImage({
    current: url,
    urls: relatedImages.value.map(img => img.url)
  });
};

// 监听害虫名称变化
watch(() => props.pestName, () => {
  fetchRelatedImages();
}, { immediate: true });
</script>

<style lang="scss" scoped>
.related-pest-images {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #eee;
}

.images-container {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.image-item {
  display: flex;
  flex-direction: column;
  border-radius: 12rpx;
  overflow: hidden;
  background-color: #f9f9f9;
}

.pest-image {
  width: 100%;
  height: 300rpx;
  border-radius: 12rpx 12rpx 0 0;
}

.image-info {
  padding: 16rpx;
}

.pest-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 8rpx;
}

.pest-description {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.no-images {
  padding: 40rpx 0;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style>