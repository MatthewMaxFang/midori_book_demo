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
      <h1 class="nav-title">手帐专区</h1>
      <button class="nav-search-btn">
        <div class="search-icon"></div>
      </button>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <div class="journal-grid">
        <div 
          v-for="(item, index) in zoneItems" 
          :key="item.id"
          class="journal-card"
          :class="{ 'flipped': flippedCards.includes(item.id) }"
          @click="handleCardClick(item)"
          @dblclick.prevent="handleCardDoubleClick(item.id)"
        >
          <div class="card-inner">
            <!-- 正面 - 海报样式 -->
            <div class="card-front">
              <div class="poster-background">
                <img 
                  :src="item.coverImage" 
                  :alt="item.title"
                  class="poster-image"
                />
                <div class="poster-overlay"></div>
              </div>
              <div class="poster-content">
                <div class="song-info">
                  <div class="song-title">{{ item.title }}</div>
                  <div class="artist">{{ item.author }}</div>
                </div>
                <div class="meta-info">
                  <div class="item-type" :class="item.type">
                    {{ item.type === 'album' ? '手帐册' : '单页' }}
                  </div>
                  <div class="date-badge">{{ item.createdAt }}</div>
                </div>
              </div>
            </div>
            
            <!-- 背面 -->
            <div class="card-back">
              <div class="mood-content">
                <div class="quote-icon">{{ item.type === 'album' ? '📚' : '💭' }}</div>
                <div class="mood-text">
                  "{{ item.description }}"
                </div>
                <div class="mood-footer">
                  <div class="author-info">
                    <div class="author-avatar">
                      <img :src="item.authorAvatar" :alt="item.author" />
                    </div>
                    <div class="author-name">{{ item.author }}</div>
                  </div>
                  <div class="stats">
                    <span class="likes">
                      <img src="../assets/like_count.svg" alt="点赞" class="stat-icon" />
                      {{ item.likes }}
                    </span>
                    <span class="views">
                      <img src="../assets/view_count.svg" alt="浏览" class="stat-icon" />
                      {{ item.views }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部Tab栏 -->
    <div class="bottom-tabs">
      <div class="tab-item active">
        <div class="tab-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="tab-label">手帐专区</span>
      </div>
      <div class="tab-item" @click="goToMyJournals">
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
  name: 'JournalZonePage',
  data() {
    return {
      flippedCards: [], // 记录已翻转的卡片ID
      zoneItems: [
        {
          id: 'zone_1',
          type: 'album', // 手帐册
          title: '青春回忆录',
          author: '音乐少女小雨',
          authorAvatar: '/src/assets/avatars/avatar_1.jpg',
          coverImage: '/src/assets/midori/cover_multi.png',
          description: '收录了我青春时期最喜欢的歌曲片段，每一句歌词都承载着那些美好的回忆。',
          createdAt: '2024-01-20',
          likes: 128,
          views: 456,
          isAlbum: true
        },
        {
          id: 'zone_2',
          type: 'single', // 单页
          title: '夜空中最亮的星',
          author: '星空漫步者',
          authorAvatar: '/src/assets/avatars/avatar_2.jpg',
          coverImage: '/src/assets/midori/cover_spec_1.png',
          description: '每当迷茫的时候，这首歌总能给我力量，就像夜空中最亮的那颗星。',
          createdAt: '2024-01-18',
          likes: 89,
          views: 234,
          isAlbum: false
        },
        {
          id: 'zone_3',
          type: 'single',
          title: '时光倒流',
          author: '怀旧音乐人',
          authorAvatar: '/src/assets/avatars/avatar_3.jpg',
          coverImage: '/src/assets/midori/cover_1.jpg',
          description: '如果时光能够倒流，我想回到那个夏天，回到我们一起听歌的日子。',
          createdAt: '2024-01-15',
          likes: 156,
          views: 389,
          isAlbum: false
        },
        {
          id: 'zone_4',
          type: 'album',
          title: '情感日记',
          author: '文艺青年阿明',
          authorAvatar: '/src/assets/avatars/avatar_4.jpg',
          coverImage: '/src/assets/midori/cover_multi.png',
          description: '用音乐记录生活中的点点滴滴，每一首歌都是一段故事。',
          createdAt: '2024-01-12',
          likes: 203,
          views: 567,
          isAlbum: true
        },
        {
          id: 'zone_5',
          type: 'single',
          title: '雨天的思念',
          author: '雨中漫步',
          authorAvatar: '/src/assets/avatars/avatar_5.jpg',
          coverImage: '/src/assets/midori/cover_2.jpg',
          description: '雨天总是容易让人想起过去，这首歌陪伴我度过了许多个雨夜。',
          createdAt: '2024-01-10',
          likes: 67,
          views: 178,
          isAlbum: false
        },
        {
          id: 'zone_6',
          type: 'single',
          title: '梦想的翅膀',
          author: '追梦人小李',
          authorAvatar: '/src/assets/avatars/avatar_1.jpg',
          coverImage: '/src/assets/midori/cover_3.jpg',
          description: '每个人都有梦想，这首歌让我相信，只要坚持就能飞翔。',
          createdAt: '2024-01-08',
          likes: 94,
          views: 267,
          isAlbum: false
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/profile')
    },

    goToMyJournals() {
      this.$router.push('/lyricbook')
    },

    handleCardClick(item) {
      // 单击不做任何操作，只有双击才翻转
    },

    handleCardDoubleClick(cardId) {
      // 双击翻转卡片
      const index = this.flippedCards.indexOf(cardId)
      if (index > -1) {
        this.flippedCards.splice(index, 1)
      } else {
        this.flippedCards.push(cardId)
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
  background: linear-gradient(
    180deg,
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

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}

.item-type {
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-type.album {
  background: rgba(255, 193, 7, 0.9);
  color: #333;
}

.item-type.single {
  background: rgba(76, 175, 80, 0.9);
  color: white;
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

.author-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(107, 91, 63, 0.3);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 12px;
  font-weight: 500;
  color: #8b7355;
  opacity: 0.9;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 11px;
  color: #8b7355;
  opacity: 0.8;
}

.likes, .views {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  width: 12px;
  height: 12px;
  filter: brightness(0) saturate(100%) invert(45%) sepia(15%) saturate(1000%) hue-rotate(15deg) brightness(95%) contrast(85%);
  opacity: 0.9;
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
  outline: none;
  border: none;
  background: none;
  min-height: 48px;
  box-sizing: border-box;
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

/* 动画效果 */
.journal-card {
  animation: fadeInUp 0.6s ease-out;
}

.journal-card:nth-child(1) { animation-delay: 0.1s; }
.journal-card:nth-child(2) { animation-delay: 0.2s; }
.journal-card:nth-child(3) { animation-delay: 0.3s; }
.journal-card:nth-child(4) { animation-delay: 0.4s; }
.journal-card:nth-child(5) { animation-delay: 0.5s; }
.journal-card:nth-child(6) { animation-delay: 0.6s; }

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

@media (min-width: 768px) {
  .journal-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .journal-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}
</style>