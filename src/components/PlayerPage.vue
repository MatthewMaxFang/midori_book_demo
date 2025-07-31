<template>
  <div class="player-page">
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

    <!-- 顶部控制栏 -->
    <div class="header">
      <button class="header-btn" @click="goBack">
        <img src="../assets/back_arrow.svg" alt="返回" class="icon" />
      </button>
      <div class="header-center">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="header-right">
        <button v-if="isSelectionMode" class="header-btn exit-btn" @click="exitSelectionMode">×</button>
        <template v-else>
          <button class="header-btn">
            <img src="../assets/custom.svg" alt="自定义" class="icon" />
          </button>
          <button class="header-btn">
            <img src="../assets/share.svg" alt="分享" class="icon" />
          </button>
        </template>
      </div>
    </div>

    <!-- 歌曲信息 -->
    <div class="song-info">
      <h1 class="song-title">我怀念的</h1>
      <div class="artist-info">
        <span class="artist">孙燕姿</span>
        <span class="team">制作团队</span>
      </div>
      <div class="stats">
        <button class="like-btn">
          <div class="heart-icon"></div>
          <span>2300+</span>
        </button>

      </div>
    </div>

    <!-- 歌词区域 -->
    <div class="lyrics-container" :class="{ 'selection-mode': isSelectionMode }">
      <div 
        v-for="(lyric, index) in lyrics" 
        :key="index"
        class="lyric-line"
        :class="{
          'current': currentLyricIndex === index,
          'selected': selectedLyrics.includes(index),
          'commented': commentedLyrics.includes(index),
          'collected': collectedLyrics.includes(index)
        }"
        @click="handleLyricClick(index, $event)"
      >
        {{ lyric.text }}
      </div>
    </div>

    <!-- 底部控制区 -->
    <div v-if="!isSelectionMode" class="bottom-controls">
      <div class="progress-info">
        <span class="current-time">01:17</span>
      </div>
      <div class="control-buttons">
        <button class="control-btn comment-btn">
          <img src="../assets/comment.svg" alt="评论" class="icon" />
          <span>999+</span>
        </button>
        <button class="control-btn">
          <img src="../assets/microphone.svg" alt="麦克风" class="icon" />
        </button>
        <button class="control-btn">
          <div class="phone-icon"></div>
        </button>
        <button class="control-btn">
          <div class="star-icon"></div>
        </button>
        <button class="play-pause-btn" @click="togglePlay">
          <div class="pause-icon"></div>
        </button>
      </div>
    </div>

    <!-- 选择模式时的底部操作按钮 -->
    <transition name="fade-up">
      <div v-if="isSelectionMode" class="selection-actions">
        <button @click="collectLyrics" class="selection-btn">摘抄歌词</button>
        <button @click="openCommentInput" class="selection-btn">评论</button>
        <button class="selection-btn disabled">歌词视频</button>
        <button class="selection-btn disabled">歌词视频</button>
      </div>
    </transition>

    <!-- 评论输入弹窗 -->
    <transition name="fade">
      <div v-if="showCommentInput" class="comment-overlay">
        <div class="comment-popup">
          <div class="popup-header">
            <h3>发表评论</h3>
            <button @click="showCommentInput = false" class="close-popup">×</button>
          </div>

          <div class="quoted-lyrics-section">
            <div class="quote-label">引用歌词：</div>
            <div class="quoted-lyrics">
              <div v-for="index in selectedLyrics" :key="index" class="quoted-lyric">
                "{{ lyrics[index].text }}"
              </div>
            </div>
          </div>

          <div class="comment-form">
            <textarea v-model="commentText" placeholder="分享你的感受..." rows="4" maxlength="200"
              class="comment-textarea"></textarea>
            <div class="word-count">{{ commentText.length }}/200</div>

            <div class="comment-actions">
              <button @click="showCommentInput = false" class="cancel-btn">取消</button>
              <button @click="submitComment" :disabled="!commentText.trim()" class="submit-btn">发布评论</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 心情记录弹窗 -->
    <transition name="fade">
      <div v-if="showMoodInput" class="mood-overlay">
        <div class="mood-popup">
          <div class="popup-header">
            <h3>收藏歌词</h3>
            <button @click="showMoodInput = false" class="close-popup">×</button>
          </div>

          <div class="quoted-lyrics-section">
            <div class="quote-label">选中的歌词：</div>
            <div class="quoted-lyrics">
              <div v-for="index in selectedLyrics" :key="index" class="quoted-lyric">
                "{{ lyrics[index].text }}"
              </div>
            </div>
          </div>

          <div class="mood-form">
            <div class="mood-hint">这一刻，你想到了什么？</div>
            <textarea v-model="moodText" placeholder="记录被触动的瞬间..." rows="4" maxlength="200"
              class="mood-textarea"></textarea>
            <div class="word-count">{{ moodText.length }}/200</div>

            <div class="mood-actions">
              <button @click="showMoodInput = false" class="cancel-btn">取消</button>
              <button @click="submitMoodRecord" class="collect-btn">确认摘抄</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'PlayerPage',
  data() {
    return {
      currentLyricIndex: 4, // 当前播放的歌词行
      selectedLyrics: [], // 选中的歌词行索引
      commentedLyrics: [4, 5, 6, 7], // 已评论的歌词行（示例数据）
      collectedLyrics: [], // 已收藏的歌词行
      showCommentInput: false,
      showMoodInput: false, // 心情记录弹窗
      isSelectionMode: false, // 是否处于选择模式
      commentText: '', // 评论文本
      moodText: '', // 心情文本
      touchStartTime: 0,
      isPlaying: false,
      // 双击检测相关
      lastClickTime: 0,
      lastClickIndex: -1,
      clickTimeout: null,
      doubleClickDelay: 200, // 双击检测延时（毫秒）
      lyrics: [
        { text: '真相太赤裸裸', time: '00:15' },
        { text: '狼狈比失去难受', time: '00:25' },
        { text: '我怀念的是无话不说', time: '00:35' },
        { text: '我怀念的是一起作梦', time: '00:45' },
        { text: '我怀念的是争吵以后', time: '00:55' },
        { text: '还是想要爱你的冲动', time: '01:05' },
        { text: '我记得那年生日', time: '01:15' },
        { text: '也记得那一首歌', time: '01:25' },
        { text: '记得那片星空', time: '01:35' },
        { text: '最紧的右手', time: '01:45' }
      ]
    }
  },
  computed: {
    selectedLyricsText() {
      // 按照歌词原本的顺序排列，而不是点击顺序
      const sortedIndices = [...this.selectedLyrics].sort((a, b) => a - b)
      return sortedIndices.map(index => this.lyrics[index].text).join('\n')
    },

    sortedSelectedLyrics() {
      // 返回按原本顺序排列的选中歌词索引
      return [...this.selectedLyrics].sort((a, b) => a - b)
    }
  },
  methods: {
    goBack() {
      this.$router.push('/profile')
    },

    togglePlay() {
      this.isPlaying = !this.isPlaying
    },

    handleLyricDoubleClick(event, index) {
      // 防止双击缩放和事件冒泡
      event.preventDefault()
      event.stopPropagation()

      // 双击进入选择模式并选中该歌词
      if (!this.isSelectionMode) {
        this.enterSelectionMode(index)
      }
    },

    handleLyricClick(index, event) {
      const currentTime = Date.now()
      
      // 防止事件冒泡
      event.preventDefault()
      event.stopPropagation()
      
      // 如果已经在选择模式，立即响应单击
      if (this.isSelectionMode) {
        this.toggleLyricSelection(index)
        return
      }
      
      // 检测双击
      if (this.lastClickIndex === index && 
          currentTime - this.lastClickTime < this.doubleClickDelay) {
        // 这是一个双击事件，立即进入选择模式
        this.clearClickTimeout()
        this.enterSelectionMode(index)
        return
      }
      
      // 清除之前的单击延时
      this.clearClickTimeout()
      
      // 记录当前点击
      this.lastClickTime = currentTime
      this.lastClickIndex = index
      
      // 对于非选择模式的单击，不设置延时，直接忽略
      // 用户需要双击来进入选择模式
    },

    clearClickTimeout() {
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }
    },

    enterSelectionMode(index) {
      this.isSelectionMode = true
      this.selectedLyrics = [index]
    },

    exitSelectionMode() {
      this.isSelectionMode = false
      this.selectedLyrics = []
    },

    toggleLyricSelection(index) {
      const selectedIndex = this.selectedLyrics.indexOf(index)
      
      if (selectedIndex > -1) {
        // 使用splice而不是filter，性能更好
        this.selectedLyrics.splice(selectedIndex, 1)
      } else {
        this.selectedLyrics.push(index)
      }

      // 如果没有选中的歌词，自动退出选择模式
      if (this.selectedLyrics.length === 0) {
        this.exitSelectionMode()
      }
    },

    collectLyrics() {
      // 打开心情记录弹窗
      this.showMoodInput = true
      this.moodText = ''
    },

    submitMoodRecord() {
      // 如果用户没有输入心情，使用歌曲名+歌手名作为默认值
      const defaultMood = '我怀念的 - 孙燕姿'
      const finalMoodText = this.moodText.trim() || defaultMood
  
      // 准备歌词数据（使用排序后的歌词顺序）
      const sortedIndices = [...this.selectedLyrics].sort((a, b) => a - b)
      const lyricsData = sortedIndices.map(index => ({
        index,
        text: this.lyrics[index].text
      }))

       const moodRecord = {
        id: Date.now(),
        lyrics: sortedIndices.map(index => ({
          index,
          text: this.lyrics[index].text
        })),
        songTitle: '我怀念的',
        artist: '孙燕姿',
        mood: finalMoodText,
        collectedAt: new Date().toLocaleDateString('zh-CN'),
        timestamp: Date.now()
      }

      // 存储到本地存储
      const existingRecords = JSON.parse(localStorage.getItem('lyricMoodRecords') || '[]')
      existingRecords.unshift(moodRecord)
      localStorage.setItem('lyricMoodRecords', JSON.stringify(existingRecords))

      // 添加到收藏
      this.selectedLyrics.forEach(index => {
        if (!this.collectedLyrics.includes(index)) {
          this.collectedLyrics.push(index)
        }
      })

      this.showMoodInput = false
      this.exitSelectionMode()

      // 跳转到手帐编辑页面
      this.$router.push({
        path: '/journal-edit',
        query: {
          lyrics: JSON.stringify(lyricsData),
          songTitle: '我怀念的',
          artist: '孙燕姿'
        }
      })
    },

    openCommentInput() {
      this.showCommentInput = true
      this.commentText = ''
    },

    submitComment() {
      if (!this.commentText.trim()) {
        return
      }

      // 标记这些歌词为已评论
      this.selectedLyrics.forEach(index => {
        if (!this.commentedLyrics.includes(index)) {
          this.commentedLyrics.push(index)
        }
      })

      // 准备评论数据（使用排序后的歌词顺序）
      const sortedIndices = [...this.selectedLyrics].sort((a, b) => a - b)
      const commentData = {
        lyrics: sortedIndices.map(index => ({
          index,
          text: this.lyrics[index].text
        })),
        songTitle: '我怀念的',
        artist: '孙燕姿',
        commentText: this.commentText
      }

      this.showCommentInput = false
      this.exitSelectionMode()

      // 跳转到评论页面
      this.$router.push({
        path: '/comment',
        query: {
          lyrics: JSON.stringify(commentData.lyrics),
          songTitle: commentData.songTitle,
          artist: commentData.artist,
          newComment: commentData.commentText
        }
      })
    }
  },
  
  beforeUnmount() {
    // 清理定时器，防止内存泄漏
    this.clearClickTimeout()
  }
}
</script>

<style scoped>
.player-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #f0e4d0 50%, #e8d5c4 100%);
  position: relative;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

.signal-bar:nth-child(1) {
  height: 3px;
}

.signal-bar:nth-child(2) {
  height: 5px;
}

.signal-bar:nth-child(3) {
  height: 7px;
}

.signal-bar:nth-child(4) {
  height: 9px;
}

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

/* 顶部控制栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.header-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.header-btn .icon {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

.exit-btn {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.header-center {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  background: #666;
  border-radius: 50%;
}

.header-right {
  display: flex;
  gap: 15px;
  align-items: center;
}

/* 头部图标 */
.back-arrow {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 8px solid #666;
}

.shirt-icon {
  width: 14px;
  height: 14px;
  border: 2px solid #666;
  border-radius: 3px 3px 6px 6px;
  position: relative;
  background: transparent;
}

.shirt-icon::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 2px;
  border: 1px solid #666;
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  background: transparent;
}

.share-icon {
  width: 10px;
  height: 10px;
  position: relative;
}

.share-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid #666;
}

.share-icon::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 0;
  width: 4px;
  height: 2px;
  background: #666;
  transform: rotate(45deg);
}

/* 歌曲信息 */
.song-info {
  padding: 0 20px;
  margin-bottom: 30px;
}

.song-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
  letter-spacing: -0.5px;
}

.artist-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.artist {
  font-size: 16px;
  color: #666;
}

.team {
  font-size: 14px;
  color: #999;
}

.stats {
  display: flex;
  align-items: center;
  gap: 15px;
}

.like-btn,
.share-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 爱心图标 */
.heart-icon {
  width: 12px;
  height: 11px;
  position: relative;
}

.heart-icon::before,
.heart-icon::after {
  content: '';
  width: 6px;
  height: 9px;
  position: absolute;
  left: 6px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
  background: #666;
  border-radius: 6px 6px 0 0;
}

.heart-icon::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

/* 小分享图标 */
.share-icon-small {
  width: 10px;
  height: 10px;
  border: 2px solid #666;
  border-top: none;
  border-right: none;
  transform: rotate(45deg);
}

/* 歌词区域 */
.lyrics-container {
  padding: 0 20px;
  max-height: calc(100vh - 350px);
  overflow-y: auto;
  margin-bottom: 20px;
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.lyric-line {
  font-size: 18px;
  line-height: 2.2;
  margin-bottom: 15px;
  color: #bbb;
  cursor: pointer;
  padding: 12px 8px;
  transition: background-color 0.15s ease, color 0.15s ease;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  border-radius: 6px;
  touch-action: manipulation;
  -webkit-touch-callout: none;
  /* 增加触摸目标大小，提高点击准确性 */
  min-height: 44px;
  display: flex;
  align-items: center;
  /* 防止双击缩放 */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* 使用GPU加速 */
  will-change: background-color, color;
  transform: translateZ(0);
}

/* 移除可能导致卡顿的active状态动画 */

.lyric-line.current {
  color: #333;
  font-weight: 500;
}

.lyric-line.selected {
  background: rgba(0, 0, 0, 0.15);
  color: white;
  padding: 8px 12px;
  margin: 8px -12px;
  display: block !important;
  width: 100%;
  border-radius: 6px;
  position: relative;
  /* 使用GPU加速，避免重复的transition */
  will-change: background-color, color;
  transform: translateZ(0);
}

.lyric-line.selected::before {
  content: '✓';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) translateZ(0);
  color: white;
  font-size: 16px;
  font-weight: bold;
  z-index: 10;
  /* 使用GPU加速 */
  will-change: transform;
}

.lyric-line.commented {
  position: relative;
  display: table;
}

/* 选择模式时隐藏下划线 */
.lyrics-container.selection-mode .lyric-line.commented::after,
.lyrics-container.selection-mode .lyric-line.collected::after {
  display: none;
}

/* 选择模式时确保选中状态正确显示 */
.lyrics-container.selection-mode .lyric-line.selected {
  display: block !important;
}

.lyrics-container.selection-mode .lyric-line.commented.selected,
.lyrics-container.selection-mode .lyric-line.collected.selected {
  display: block !important;
}

.lyric-line.commented::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: calc(100% + 10px);
  height: 3px;
  background: linear-gradient(to right,
      rgba(102, 102, 102, 0.7) 0%,
      rgba(102, 102, 102, 0.5) 70%,
      transparent 100%);
  border-radius: 50px;
  transform: rotate(-0.8deg);
  transform-origin: center;
}

.lyric-line.collected {
  position: relative;
  display: table;
}

.lyric-line.collected::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: -5px;
  width: calc(100% + 10px);
  height: 3px;
  background: linear-gradient(to right,
      rgba(136, 136, 136, 0.6) 0%,
      rgba(136, 136, 136, 0.4) 70%,
      transparent 100%);
  border-radius: 50px;
  transform: rotate(0.6deg);
  transform-origin: center;
}

/* 底部控制区 */
.bottom-controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.progress-info {
  text-align: right;
  margin-bottom: 20px;
}

.current-time {
  font-size: 14px;
  color: #666;
}

.control-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-height: 50px;
  min-width: 40px;
}

.control-btn .icon {
  width: 18px;
  height: 18px;
  opacity: 0.6;
}

.control-btn span {
  font-size: 11px;
  line-height: 1;
}

/* 评论数图标 */
.comment-btn {
  position: relative;
}

.comment-btn .icon {
  margin-bottom: 2px;
}

/* 麦克风图标 */
.mic-icon {
  width: 10px;
  height: 14px;
  border: 2px solid #666;
  border-radius: 6px 6px 0 0;
  position: relative;
  background: transparent;
}

.mic-icon::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 2px;
  background: #666;
  border-radius: 1px;
}

.mic-icon::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 4px;
  background: #666;
}

/* 手机图标 */
.phone-icon {
  width: 12px;
  height: 18px;
  border: 2px solid #666;
  border-radius: 2px;
  position: relative;
  background: transparent;
}

.phone-icon::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 1px;
  background: #666;
  border-radius: 1px;
}

/* 星星图标 */
.star-icon {
  width: 18px;
  height: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-icon::before {
  content: '★';
  font-size: 18px;
  color: #666;
  line-height: 1;
}

/* 暂停图标 */
.pause-icon {
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
}

.pause-icon::before,
.pause-icon::after {
  content: '';
  width: 3px;
  height: 12px;
  background: white;
  border-radius: 1px;
}

.play-pause-btn {
  background: #333;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 24px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* 评论弹窗 */
.comment-overlay,
.mood-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.comment-popup,
.mood-popup {
  background: #faf8f5;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.mood-popup {
  background: linear-gradient(135deg, #faf8f5 0%, #f5f0e8 100%);
  border: 1px solid rgba(212, 184, 150, 0.2);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.popup-header h3 {
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.close-popup {
  background: rgba(0, 0, 0, 0.06);
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-popup:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #333;
}

.quoted-lyrics-section {
  margin-bottom: 24px;
}

.quote-label {
  font-size: 14px;
  color: #8b7355;
  margin-bottom: 10px;
  font-weight: 500;
}

.quoted-lyrics {
  background: linear-gradient(135deg, #f5f0e8 0%, #f0e4d0 100%);
  border: none;
  border-radius: 12px;
  padding: 16px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quoted-lyric {
  font-size: 15px;
  color: #6b5b3f;
  line-height: 1.6;
  margin-bottom: 6px;
  font-style: italic;
  font-weight: 400;
}

.quoted-lyric:last-child {
  margin-bottom: 0;
}

.comment-form,
.mood-form {
  display: flex;
  flex-direction: column;
}

.mood-hint {
  font-size: 14px;
  color: #8b7355;
  margin-bottom: 12px;
  font-weight: 500;
  font-style: italic;
  text-align: center;
  opacity: 0.9;
}

.comment-textarea,
.mood-textarea {
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  background: white;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.mood-textarea {
  border-color: rgba(212, 184, 150, 0.3);
  background: rgba(255, 255, 255, 0.95);
}

.comment-textarea:focus,
.mood-textarea:focus {
  border-color: #d4b896;
  box-shadow: 0 0 0 3px rgba(212, 184, 150, 0.2);
}

.word-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin: 8px 0 20px;
}

.comment-actions,
.mood-actions {
  display: flex;
  gap: 12px;
}

.cancel-btn,
.submit-btn,
.collect-btn {
  flex: 1;
  padding: 14px 20px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: rgba(0, 0, 0, 0.06);
  color: #666;
}

.cancel-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.submit-btn,
.collect-btn {
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(212, 184, 150, 0.3);
}

.collect-btn {
  background: linear-gradient(135deg, #c7a882 0%, #b8956e 100%);
  box-shadow: 0 4px 12px rgba(199, 168, 130, 0.4);
}

.submit-btn:hover,
.collect-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(212, 184, 150, 0.4);
}

.collect-btn:hover {
  box-shadow: 0 6px 16px rgba(199, 168, 130, 0.5);
}

.submit-btn:disabled,
.collect-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 选择模式底部操作按钮 */
.selection-actions {
  position: fixed;
  bottom: 30px;
  left: 15px;
  right: 15px;
  display: flex;
  gap: 8px;
  z-index: 1000;
}

.selection-btn {
  flex: 1;
  padding: 14px 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.selection-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.selection-btn:active {
  transform: translateY(0);
}

.selection-btn.disabled {
  color: #999;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.7);
}

.selection-btn.disabled:hover {
  transform: none;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* 动画效果 */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>