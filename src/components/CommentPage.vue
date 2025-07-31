<template>
  <div class="comment-page">
    <!-- 自定义导航栏 -->
    <div class="custom-nav">
      <button class="nav-back-btn" @click="goBack">
        <img src="../assets/back_arrow.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="nav-title">评论区</h1>
      <button class="nav-close-btn" @click="goBack">×</button>
    </div>

    <!-- 歌曲信息 -->
    <div class="song-header">
      <!-- 背景封面（模糊） -->
      <div class="album-cover-bg">
        <img 
          :src="coverImageSrc" 
          alt="专辑封面背景" 
          class="cover-bg-image"
          @error="handleImageError"
        />
        <div class="cover-overlay"></div>
      </div>
      
      <div class="song-content">
        <!-- 歌曲信息 -->
        <div class="song-info">
          <h2 class="song-title">{{ songTitle }}</h2>
          <p class="song-artist">{{ artist }}</p>
          <div class="play-indicator">
            <div class="wave-animation">
              <div class="wave-bar"></div>
              <div class="wave-bar"></div>
              <div class="wave-bar"></div>
              <div class="wave-bar"></div>
            </div>
            <span class="now-playing">正在播放</span>
          </div>
        </div>
        
        <!-- 专辑封面（清晰显示） -->
        <div class="album-cover">
          <img 
            :src="coverImageSrc" 
            alt="专辑封面" 
            class="cover-image"
            @error="handleImageError"
            @load="handleImageLoad"
          />
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="comments-container">
      <div class="comments-header">
        <h3>评论 ({{ comments.length }})</h3>
      </div>
      
      <div class="comments-list">
        <div
          v-for="comment in comments" 
          :key="comment.id"
          class="comment-item"
        >
          <div class="comment-avatar">
            <img 
              :src="comment.avatar" 
              :alt="comment.username"
              @error="handleAvatarError"
              @load="handleAvatarLoad"
            />
          </div>
          
          <div class="comment-content">
            <div class="comment-header">
              <span class="username">{{ comment.username }}</span>
              <span class="time">{{ comment.time }}</span>
            </div>
            
            <div class="comment-body">
              <div v-if="comment.quotedLyrics" class="comment-quoted">
                <div class="quote-icon">♪</div>
                <span class="quoted-text">{{ formatQuotedLyrics(comment.quotedLyrics) }}</span>
              </div>
              <div class="comment-text">{{ comment.text }}</div>
              <div class="comment-actions">
                <button 
                  @click="likeComment(comment.id)"
                  :class="{ 'liked': comment.liked }"
                  class="action-btn like-btn"
                >
                  <div class="heart-icon" :class="{ 'filled': comment.liked }"></div>
                  <span v-if="comment.likes > 0">{{ comment.likes }}</span>
                </button>
                <button 
                  @click="replyComment(comment.id)"
                  class="action-btn reply-btn"
                >
                  <img src="../assets/comment.svg" alt="回复" class="reply-icon" />
                  回复
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论输入框 -->
    <div class="comment-input-container">
      <div class="input-wrapper">
        <textarea
          v-model="newComment"
          placeholder="写下你的感受..."
          class="comment-input"
          rows="1"
          @input="autoResize"
          ref="commentInput"
        ></textarea>
        <button 
          @click="submitComment"
          :disabled="!newComment.trim()"
          class="send-btn"
        >
          <div class="send-icon"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import coverImage from '../assets/cover.jpg'
import avatar1 from '../assets/avatars/avatar_1.jpg'
import avatar2 from '../assets/avatars/avatar_2.jpg'
import avatar3 from '../assets/avatars/avatar_3.jpg'
import avatar4 from '../assets/avatars/avatar_4.jpg'
import avatar5 from '../assets/avatars/avatar_5.jpg'

export default {
  name: 'CommentPage',
  data() {
    return {
      songTitle: '',
      artist: '',
      quotedLyrics: [],
      newComment: '',
      coverImageSrc: coverImage,
      avatars: [avatar1, avatar2, avatar3, avatar4, avatar5],
      comments: [
        {
          id: 1,
          username: '音乐爱好者',
          avatar: avatar1,
          time: '2小时前',
          quotedLyrics: '我怀念的是无话不说',
          text: '这句歌词真的说到心坎里了，那种无话不说的感情真的很珍贵。',
          likes: 12,
          liked: false
        },
        {
          id: 2,
          username: '夜空中最亮的星',
          avatar: avatar2,
          time: '3小时前',
          quotedLyrics: '我怀念的是一起作梦',
          text: '一起作梦的日子，现在想起来都觉得很美好。',
          likes: 8,
          liked: true
        },
        {
          id: 3,
          username: '流年似水',
          avatar: avatar3,
          time: '5小时前',
          text: '孙燕姿的声音太有感染力了，每次听都会想起很多回忆。',
          likes: 15,
          liked: false
        },
        {
          id: 4,
          username: '追梦人',
          avatar: avatar4,
          time: '1天前',
          quotedLyrics: '我怀念的是争吵以后 还是想要爱你的冲动 我记得那年生日 也记得那一首歌 记得那片星空',
          text: '即使争吵过后，还是想要爱的那种感觉，真的很真实。这些歌词串联起来真的太美了。',
          likes: 20,
          liked: false
        }
      ]
    }
  },
  mounted() {
    // 从路由参数中获取引用的歌词
    const { lyrics, songTitle, artist, newComment } = this.$route.query
    
    if (lyrics) {
      this.quotedLyrics = JSON.parse(lyrics)
    }
    
    this.songTitle = songTitle || '我怀念的'
    this.artist = artist || '孙燕姿'
    
    // 如果有新评论，添加到评论列表顶部
    if (newComment) {
      const newCommentObj = {
        id: Date.now(),
        username: '我',
        avatar: avatar5, // 使用第5个头像作为当前用户头像
        time: '刚刚',
        quotedLyrics: this.quotedLyrics.length > 0 ? this.quotedLyrics.map(l => l.text).join(' ') : null,
        text: newComment,
        likes: 0,
        liked: false
      }
      
      this.comments.unshift(newCommentObj)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    
    likeComment(commentId) {
      const comment = this.comments.find(c => c.id === commentId)
      if (comment) {
        if (comment.liked) {
          comment.likes--
          comment.liked = false
        } else {
          comment.likes++
          comment.liked = true
        }
      }
    },
    
    replyComment(commentId) {
      // 实现回复功能
      console.log('回复评论:', commentId)
    },
    
    formatQuotedLyrics(lyrics) {
      if (!lyrics) return ''
      
      // 将歌词按空格分割，然后按4行限制
      const words = lyrics.split(' ')
      const maxLines = 4
      let lines = []
      let currentLine = ''
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const testLine = currentLine ? `${currentLine} ${word}` : word
        
        // 每行约12个字符比较合适
        if (testLine.length > 12 && currentLine) {
          lines.push(currentLine)
          if (lines.length >= maxLines) {
            // 如果还有剩余文字，添加省略号
            if (i < words.length - 1) {
              lines[maxLines - 1] += '...'
            }
            break
          }
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      
      // 添加最后一行
      if (lines.length < maxLines && currentLine) {
        lines.push(currentLine)
      }
      
      return lines.join('\n')
    },

    submitComment() {
      if (!this.newComment.trim()) return
      
      const newCommentObj = {
        id: Date.now(),
        username: '我',
        avatar: avatar5, // 使用第5个头像作为当前用户头像
        time: '刚刚',
        quotedLyrics: this.quotedLyrics.length > 0 ? this.quotedLyrics.map(l => l.text).join(' ') : null,
        text: this.newComment,
        likes: 0,
        liked: false
      }
      
      this.comments.unshift(newCommentObj)
      this.newComment = ''
      this.autoResize()
    },

    autoResize() {
      this.$nextTick(() => {
        const textarea = this.$refs.commentInput
        if (textarea) {
          textarea.style.height = 'auto'
          textarea.style.height = textarea.scrollHeight + 'px'
        }
      })
    },

    handleImageError(event) {
      console.error('封面图片加载失败:', event.target.src)
      console.error('错误详情:', event)
      // 如果是前景封面图片加载失败，显示占位符
      if (event.target.classList.contains('cover-image')) {
        event.target.style.display = 'none'
        // 在封面容器中添加占位符
        const container = event.target.parentElement
        if (container && !container.querySelector('.cover-placeholder')) {
          const placeholder = document.createElement('div')
          placeholder.className = 'cover-placeholder'
          placeholder.innerHTML = '♪'
          container.appendChild(placeholder)
        }
      } else {
        // 背景图片加载失败，隐藏即可
        event.target.style.display = 'none'
      }
    },

    handleImageLoad(event) {
      console.log('封面图片加载成功!')
      console.log('图片路径:', event.target.src)
      // 图片加载成功时，确保显示
      event.target.style.display = 'block'
    },

    handleAvatarError(event) {
      console.error('头像加载失败:', event.target.src)
      // 头像加载失败时，使用备用头像或显示用户名首字符
      const container = event.target.parentElement
      const username = event.target.alt || '用户'
      
      if (container && !container.querySelector('.avatar-placeholder')) {
        event.target.style.display = 'none'
        const placeholder = document.createElement('div')
        placeholder.className = 'avatar-placeholder'
        placeholder.textContent = username.charAt(0).toUpperCase()
        container.appendChild(placeholder)
      }
    },

    handleAvatarLoad(event) {
      console.log('头像加载成功:', event.target.alt)
    }
  }
}
</script>

<style scoped>
.comment-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #f5f0e8 0%, #f0e4d0 50%, #e8d5c4 100%);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 自定义导航栏 */
.custom-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-back-btn, .nav-close-btn {
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

.nav-back-btn:hover, .nav-close-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.back-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
}

.nav-close-btn {
  font-size: 20px;
  font-weight: 300;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  letter-spacing: -0.3px;
}

/* 歌曲信息 */
.song-header {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 20px;
  overflow: hidden;
  min-height: 140px;
}

.song-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  pointer-events: none;
  z-index: 2;
}

/* 背景封面（模糊） */
.album-cover-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 50%, #b8956e 100%);
  background-size: 120% 120%;
  background-position: center;
}

.cover-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(25px) brightness(0.3) saturate(1.2);
  transform: scale(1.1);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(245, 240, 232, 0.92) 0%,
    rgba(240, 228, 208, 0.88) 50%,
    rgba(232, 213, 196, 0.92) 100%
  );
  z-index: 1;
}

/* 内容区域 */
.song-content {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  height: 100%;
}

.song-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

/* 前景专辑封面（清晰显示） */
.album-cover {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cover-image:hover {
  transform: scale(1.05);
}

/* 封面占位符 */
.cover-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .song-content {
    gap: 16px;
  }
  
  .album-cover {
    width: 80px;
    height: 80px;
    border-radius: 10px;
  }
  
  .cover-placeholder {
    font-size: 28px;
  }
  
  .comment-avatar img,
  .avatar-placeholder {
    width: 36px;
    height: 36px;
  }
  
  .avatar-placeholder {
    font-size: 14px;
  }
  
  .song-title {
    font-size: 24px;
  }
  
  .song-artist {
    font-size: 14px;
  }
  
  .play-indicator {
    margin-top: 8px;
  }
}

.song-title {
  font-size: 28px;
  font-weight: 600;
  color: #4a3d2a;
  margin: 0;
  letter-spacing: -0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  line-height: 1.2;
  opacity: 0.95;
}

.song-artist {
  font-size: 16px;
  color: #7a6649;
  margin: 0;
  font-weight: 400;
  opacity: 0.85;
  letter-spacing: 0.3px;
}

.play-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.wave-animation {
  display: flex;
  gap: 2px;
  align-items: center;
}

.wave-bar {
  width: 3px;
  background: linear-gradient(to top, #d4b896, #c7a882);
  border-radius: 2px;
  animation: wave 1.5s ease-in-out infinite;
}

.wave-bar:nth-child(1) {
  height: 8px;
  animation-delay: 0s;
}

.wave-bar:nth-child(2) {
  height: 12px;
  animation-delay: 0.1s;
}

.wave-bar:nth-child(3) {
  height: 6px;
  animation-delay: 0.2s;
}

.wave-bar:nth-child(4) {
  height: 10px;
  animation-delay: 0.3s;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
    opacity: 0.7;
  }
  50% {
    transform: scaleY(1.5);
    opacity: 1;
  }
}

.now-playing {
  font-size: 13px;
  color: #8b7355;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 评论容器 */
.comments-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
}

.comments-header {
  padding: 20px 0 16px;
  margin-bottom: 8px;
}

.comments-header h3 {
  font-size: 17px;
  color: #6b5b3f;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.2px;
  opacity: 0.9;
}

.comments-list {
  padding-bottom: 30px;
}

/* 评论项 */
.comment-item {
  display: flex;
  gap: 16px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.comment-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 184, 150, 0.2), transparent);
}

.comment-item:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

.comment-avatar {
  flex-shrink: 0;
  position: relative;
}

.comment-avatar img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
}

.comment-avatar img:hover {
  transform: scale(1.05);
}

/* 头像占位符 */
.avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.username {
  font-size: 16px;
  font-weight: 700;
  color: #2c2c2c;
  letter-spacing: -0.2px;
}

.time {
  font-size: 13px;
  color: #8b7355;
  font-weight: 500;
  opacity: 0.8;
}

.comment-body {
  width: 100%;
}

/* 引用歌词 */
.comment-quoted {
  background: linear-gradient(135deg, rgba(212, 184, 150, 0.15) 0%, rgba(199, 168, 130, 0.1) 100%);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border: 1px solid rgba(212, 184, 150, 0.2);
  position: relative;
  overflow: hidden;
}

.comment-quoted::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #d4b896, #c7a882);
  border-radius: 0 2px 2px 0;
}

.quote-icon {
  color: #c7a882;
  font-size: 18px;
  line-height: 1;
  margin-top: 2px;
  flex-shrink: 0;
  opacity: 0.9;
}

.quoted-text {
  font-size: 15px;
  color: #6b5b3f;
  font-style: italic;
  flex: 1;
  white-space: pre-line;
  line-height: 1.6;
  max-height: 6em;
  overflow: hidden;
  word-break: break-word;
  font-weight: 500;
}

.comment-text {
  font-size: 16px;
  color: #2c2c2c;
  line-height: 1.6;
  margin-bottom: 16px;
  font-weight: 400;
}

/* 评论操作 */
.comment-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(212, 184, 150, 0.1);
  border: 1px solid rgba(212, 184, 150, 0.15);
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 14px;
  color: #8b7355;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-weight: 600;
  backdrop-filter: blur(5px);
}

.action-btn:hover {
  background: rgba(212, 184, 150, 0.2);
  border-color: rgba(212, 184, 150, 0.3);
  transform: translateY(-1px);
}

/* 爱心图标 */
.heart-icon {
  width: 14px;
  height: 13px;
  position: relative;
}

.heart-icon::before,
.heart-icon::after {
  content: '';
  width: 7px;
  height: 10px;
  position: absolute;
  left: 7px;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
  background: #8b7355;
  border-radius: 7px 7px 0 0;
  transition: all 0.2s ease;
}

.heart-icon::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.heart-icon.filled::before,
.heart-icon.filled::after {
  background: #d4b896;
}

.like-btn.liked {
  color: #d4b896;
  background: rgba(212, 184, 150, 0.2);
  border-color: rgba(212, 184, 150, 0.3);
}

/* 回复图标 */
.reply-icon {
  width: 16px;
  height: 16px;
  opacity: 0.8;
}

/* 评论输入区 */
.comment-input-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(212, 184, 150, 0.2);
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  position: relative;
}

.comment-input-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 184, 150, 0.3), transparent);
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(212, 184, 150, 0.15);
  backdrop-filter: blur(10px);
}

.comment-input {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  padding: 12px 16px;
  background: transparent;
  font-family: inherit;
  min-height: 24px;
  max-height: 120px;
  overflow-y: auto;
  color: #2c2c2c;
  font-weight: 400;
}

.comment-input::placeholder {
  color: #8b7355;
  opacity: 0.7;
}

.send-btn {
  background: linear-gradient(135deg, #d4b896 0%, #c7a882 100%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 16px rgba(212, 184, 150, 0.4),
    0 2px 8px rgba(212, 184, 150, 0.2);
  flex-shrink: 0;
  position: relative;
}

.send-btn::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(212, 184, 150, 0.3), rgba(199, 168, 130, 0.3));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 8px 24px rgba(212, 184, 150, 0.5),
    0 4px 12px rgba(212, 184, 150, 0.3);
}

.send-btn:hover:not(:disabled)::before {
  opacity: 1;
}

.send-btn:active:not(:disabled) {
  transform: translateY(-1px) scale(1.02);
}

.send-btn:disabled {
  background: linear-gradient(135deg, #ccc, #bbb);
  cursor: not-allowed;
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.send-icon {
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid white;
  margin-left: 2px;
}
</style>