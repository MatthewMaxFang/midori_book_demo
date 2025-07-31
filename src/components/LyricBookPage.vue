<template>
  <div class="lyric-book-page">
    <!-- 状态栏 -->
    <div class="status-bar">
      <span class="time">14:23</span>
      <div class="status-right">
        <div class="signal-icon">
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
          <div class="signal-bar"></div>
        </div>
        <div class="battery-icon">
          <div class="battery-body">
            <div class="battery-level"></div>
          </div>
          <div class="battery-tip"></div>
          <span class="battery-text">97</span>
        </div>
      </div>
    </div>

    <!-- 自定义导航栏 -->
    <div class="custom-nav">
      <button class="nav-back-btn" @click="goBack">
        <img src="../assets/back_arrow.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="nav-title">歌词手帐</h1>
      <button class="nav-search-btn">
        <div class="search-icon"></div>
      </button>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 如果有收藏的歌词 -->
      <div v-if="moodRecords.length > 0" class="journal-grid">
        <div 
          v-for="(record, index) in moodRecords" 
          :key="record.id"
          class="journal-card"
          :class="{ 'flipped': flippedCards.includes(record.id) }"
          @click="handleCardClick(record)"
          @dblclick.prevent="handleCardDoubleClick(record.id)"
        >
          <div class="card-inner">
            <!-- 正面 - 海报样式 -->
            <div class="card-front">
              <div class="poster-background">
                <img 
                  :src="getPosterImage(index)" 
                  :alt="record.songTitle"
                  class="poster-image"
                />
                <div class="poster-overlay"></div>
              </div>
              <div class="poster-content">
                <div class="song-info">
                  <div class="song-title">{{ record.songTitle }}</div>
                  <div class="artist">{{ record.artist }}</div>
                </div>
                <div class="date-badge">{{ record.collectedAt }}</div>
              </div>
            </div>
            
            <!-- 背面 -->
            <div class="card-back">
              <div class="mood-content">
                <div class="quote-icon">💭</div>
                <div class="mood-text">
                  "{{ record.mood }}"
                </div>
                <div class="mood-footer">
                  <div class="timestamp">{{ formatTime(record.timestamp) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <div class="note-icon">📖</div>
        </div>
        <div class="empty-content">
          <h3 class="empty-title">还没有创建手帐</h3>
          <p class="empty-desc">在播放页面双击歌词并记录心情来创建你的第一篇手帐</p>
          <button class="goto-player-btn" @click="goToPlayer">
            去播放页面
          </button>
        </div>
      </div>
    </div>

    <!-- 底部Tab栏 -->
    <div class="bottom-tabs">
      <div class="tab-item" @click="goToJournalZone">
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tab-label">手帐专区</span>
      </div>
      <div class="tab-item active">
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tab-label">我的</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LyricBookPage',
  data() {
    return {
      moodRecords: [
        {
          id: 1640000000000,
          lyrics: [
            { index: 2, text: '我怀念的是无话不说' },
            { index: 3, text: '我怀念的是一起作梦' }
          ],
          songTitle: '我怀念的',
          artist: '孙燕姿',
          mood: '听到这句歌词的时候，突然想起了大学时代的室友，那种无话不说的感觉真的很珍贵。现在各自忙碌，很久没有深入交流了。',
          collectedAt: '2024-01-15',
          timestamp: 1640000000000
        },
        {
          id: 1640100000000,
          lyrics: [
            { index: 4, text: '我怀念的是争吵以后' },
            { index: 5, text: '还是想要爱你的冲动' }
          ],
          songTitle: '我怀念的',
          artist: '孙燕姿',
          mood: '这就是爱情最真实的模样吧，即使吵架了，还是舍不得对方。想起和他的那些争吵，现在回想起来都是甜蜜的回忆。',
          collectedAt: '2024-01-20',
          timestamp: 1640100000000
        },
        {
          id: 1640200000000,
          lyrics: [
            { index: 6, text: '我记得那年生日' },
            { index: 7, text: '也记得那一首歌' },
            { index: 8, text: '记得那片星空' }
          ],
          songTitle: '我怀念的',
          artist: '孙燕姿',
          mood: '今天是妈妈的生日，这首歌让我想起小时候和她一起看星空的夜晚。那时候的我们都还年轻，时间过得真快。',
          collectedAt: '2024-01-25',
          timestamp: 1640200000000
        }
      ],
      flippedCards: [], // 记录已翻转的卡片ID
      clickTimeout: null // 用于区分单击和双击
    }
  },
  mounted() {
    this.loadMoodRecords()
  },
  methods: {
    loadMoodRecords() {
      // 从localStorage加载心情记录
      const records = JSON.parse(localStorage.getItem('lyricMoodRecords') || '[]')
      console.log('LyricBookPage加载记录:', records.length, '条');
      
      if (records.length > 0) {
        // 如果有存储的记录，将新记录添加到示例数据前面（最新的在前）
        this.moodRecords = [...records, ...this.moodRecords]
        console.log('合并存储记录和示例数据');
      } else {
        // 如果没有存储的记录，使用已经设置的示例数据
        console.log('使用示例数据');
      }
      
      // 输出每个记录的editedPosterPath状态
      this.moodRecords.forEach(record => {
        if (record.editedPosterPath) {
          console.log(`记录 ${record.id} 有编辑图片:`, record.editedPosterPath);
        }
      });
    },

    goBack() {
      this.$router.push('/profile')
    },
    
    goToPlayer() {
      this.$router.push('/player')
    },

    goToJournalZone() {
      this.$router.push('/journal-zone')
    },
    
    handleCardClick(record) {
      // 单击处理，延迟执行以检测是否为双击
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
        return
      }
      
      this.clickTimeout = setTimeout(() => {
        this.viewJournalDetail(record)
        this.clickTimeout = null
      }, 250)
    },

    handleCardDoubleClick(cardId) {
      // 双击翻转卡片
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }
      
      const index = this.flippedCards.indexOf(cardId)
      if (index > -1) {
        this.flippedCards.splice(index, 1)
      } else {
        this.flippedCards.push(cardId)
      }
    },

    viewJournalDetail(record) {
      // 点击进入手帐详情页面
      this.$router.push({
        path: '/journal-detail',
        query: { id: record.id }
      })
    },

    getPosterImage(index) {
      const record = this.moodRecords[index]
      
      // 如果有编辑后的海报，优先使用缩略图
      if (record.editedPosterPath) {
        const editedImages = JSON.parse(localStorage.getItem('editedImages') || '{}');
        // 支持jpg和png格式的缩略图
        const thumbnailPath = record.editedPosterPath.replace(/\.(jpg|png)$/, '_thumb.$1');
        if (editedImages[thumbnailPath]) {
          return editedImages[thumbnailPath];
        }
        // 如果没有缩略图，使用原图
        if (editedImages[record.editedPosterPath]) {
          return editedImages[record.editedPosterPath];
        }
      }
      
      // 示例数据的固定ID，使用对应的图片
      const exampleImageMap = {
        1640000000000: '/src/assets/midori/cover_1.jpg',
        1640100000000: '/src/assets/midori/cover_2.jpg', 
        1640200000000: '/src/assets/midori/cover_3.jpg'
      }
      
      // 如果是示例数据，使用对应的图片
      if (exampleImageMap[record.id]) {
        return exampleImageMap[record.id]
      }
      
      // 新创建的记录使用默认模板
      return '/src/assets/midori/cover_common.jpg'
    },

    formatTime(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMs = now - date
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (diffDays === 0) {
        return '今天'
      } else if (diffDays === 1) {
        return '昨天'
      } else if (diffDays < 7) {
        return `${diffDays}天前`
      } else {
        return date.toLocaleDateString('zh-CN', { 
          month: 'long', 
          day: 'numeric' 
        })
      }
    }
  }
}
</script>

<style scoped>
.lyric-book-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #f0e4d0 50%, #e8d5c4 100%);
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.status-right {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* 信号图标 */
.signal-icon {
  display: flex;
  gap: 1px;
  align-items: flex-end;
  height: 12px;
}

.signal-bar {
  width: 2px;
  background: #333;
  border-radius: 1px;
}

.signal-bar:nth-child(1) { height: 3px; }
.signal-bar:nth-child(2) { height: 5px; }
.signal-bar:nth-child(3) { height: 7px; }
.signal-bar:nth-child(4) { height: 9px; }

/* 电池图标 */
.battery-icon {
  display: flex;
  align-items: center;
  gap: 3px;
}

.battery-body {
  width: 20px;
  height: 10px;
  border: 1px solid #333;
  border-radius: 2px;
  position: relative;
  background: white;
}

.battery-level {
  width: 90%;
  height: 100%;
  background: #4CAF50;
  border-radius: 1px;
}

.battery-tip {
  width: 1px;
  height: 4px;
  background: #333;
  border-radius: 0 1px 1px 0;
}

.battery-text {
  font-size: 12px;
  margin-left: 2px;
}

/* 自定义导航栏 */
.custom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-back-btn, .nav-search-btn {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.nav-back-btn:hover, .nav-search-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.search-icon {
  width: 16px;
  height: 16px;
  border: 2px solid #666;
  border-radius: 50%;
  position: relative;
}

.search-icon::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  width: 6px;
  height: 2px;
  background: #666;
  border-radius: 1px;
  transform: rotate(45deg);
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.3px;
}

/* 主要内容区 */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* 手帐网格 */
.journal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0;
  align-items: start;
}

/* 手帐卡片 */
.journal-card {
  aspect-ratio: 3/4;
  cursor: pointer;
  user-select: none;
  position: relative;
  transform-style: preserve-3d;
  perspective: 1200px;
  overflow: visible;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  transform-origin: 50% 50% 0;
}

.journal-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  margin: 0;
  padding: 0;
}

.card-front {
  display: flex;
  flex-direction: column;
}

.card-back {
  background: linear-gradient(135deg, #f8f5f0 0%, #f0e8d8 100%);
  backdrop-filter: blur(15px);
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* 海报背景 */
.poster-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 顶部棕色渐变，为信息展示提供背景 */
  background: linear-gradient(
    180deg,
    /* rgba(145, 88, 6, 0.8) 0%,
    rgba(145, 88, 6, 0.4) 20%, */
    rgba(62, 39, 35, 0.7) 0%,
    rgba(101, 67, 33, 0.3) 10%,
    transparent 35%
  );
  z-index: 2;
}

/* 海报内容 */
.poster-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  color: white;
}

.song-info {
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.song-title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
}

.artist {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  opacity: 1;
  white-space: nowrap;
  flex-shrink: 0;
}

.date-badge {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 10px;
  color: white;
  align-self: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-shadow: 
    0 1px 4px rgba(0, 0, 0, 0.8),
    0 1px 2px rgba(0, 0, 0, 0.6);
  font-weight: 500;
}

/* 背面样式 */
.mood-content {
  text-align: center;
  width: 100%;
}

.quote-icon {
  font-size: 24px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.mood-text {
  font-size: 14px;
  color: #6b5b3f;
  line-height: 1.6;
  font-style: italic;
  font-weight: 500;
  margin-bottom: 16px;
  word-break: break-word;
  hyphens: auto;
}

.mood-footer {
  margin-top: auto;
}

.timestamp {
  font-size: 11px;
  color: #8b7355;
  opacity: 0.7;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  min-height: 400px;
}

.empty-icon {
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.note-icon {
  font-size: 48px;
  color: #d4b896;
  opacity: 0.8;
}

.empty-content {
  max-width: 300px;
}

.empty-title {
  font-size: 22px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.empty-desc {
  font-size: 15px;
  color: #8b7355;
  line-height: 1.6;
  margin: 0 0 32px 0;
  opacity: 0.8;
}

.goto-player-btn {
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
  border: none;
  border-radius: 25px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 16px rgba(212, 184, 150, 0.4),
    0 2px 8px rgba(212, 184, 150, 0.2);
  letter-spacing: 0.3px;
}

.goto-player-btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 24px rgba(212, 184, 150, 0.5),
    0 4px 12px rgba(212, 184, 150, 0.3);
}

.goto-player-btn:active {
  transform: translateY(-1px);
}

/* 悬停效果 */
.journal-card:hover .card-inner {
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

.journal-card.flipped:hover .card-inner {
  transform: rotateY(180deg) translateY(-4px);
}

.journal-card:hover .card-front,
.journal-card:hover .card-back {
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.08);
}

.journal-card:hover .poster-image {
  transform: scale(1.02);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .main-content {
    padding: 16px;
  }
  
  .journal-grid {
    gap: 12px;
  }
  
  .card-front, .card-back {
    border-radius: 12px;
  }
  
  .poster-content {
    padding: 12px;
  }
  
  .card-back {
    padding: 16px;
  }
  
  .song-title {
    font-size: 14px;
  }
  
  .artist {
    font-size: 11px;
  }
  
  .date-badge {
    font-size: 9px;
    padding: 3px 6px;
  }
  
  .mood-text {
    font-size: 13px;
  }
  
  .empty-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 24px;
  }
  
  .note-icon {
    font-size: 40px;
  }
  
  .empty-title {
    font-size: 20px;
  }
  
  .empty-desc {
    font-size: 14px;
  }
}

/* 底部Tab栏样式 */
.bottom-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
  position: relative;
  z-index: 10;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #8b7355;
  outline: none; /* 移除蓝色选择框 */
  border: none; /* 移除边框 */
  background: none; /* 移除背景 */
  min-height: 48px; /* 固定最小高度 */
  box-sizing: border-box; /* 确保padding不影响总高度 */
}

.tab-item.active {
  color: #d4b896;
}

.tab-item:hover {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 1.5;
}

.tab-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.tab-item.active .tab-label {
  font-weight: 600;
}
</style>