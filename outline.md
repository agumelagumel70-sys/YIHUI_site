# 万义辉个人网站项目大纲

## 文件结构
```
/mnt/okcomputer/output/
├── index.html              # 主页 - 个人简介和概览
├── research.html           # 研究页面 - 论文和项目
├── teaching.html           # 教学页面 - 助教和培训
├── awards.html             # 荣誉页面 - 奖项和实践
├── main.js                 # 主要JavaScript文件
├── resources/              # 资源文件夹
│   ├── hero-bg.jpg        # 主页背景图
│   ├── profile.jpg        # 个人照片
│   └── university-bg.jpg  # 教育背景图
├── interaction.md          # 交互设计文档
├── design.md              # 设计规范文档
└── outline.md             # 项目大纲
```

## 页面详细规划

### 1. index.html - 主页
**内容结构:**
- 导航栏
- 简洁的Hero区域（个人照片 + 基本信息）
- 教育背景时间线
- 研究兴趣概览
- 联系方式

**交互功能:**
- 平滑滚动导航
- 动态加载内容
- 响应式布局

### 2. research.html - 研究页面
**内容结构:**
- 学术论文列表（可展开查看详情）
- 科研项目参与
- 会议发言记录
- 研究成果统计

**交互功能:**
- 论文搜索和筛选
- 时间线排序
- DOI链接跳转

### 3. teaching.html - 教学页面
**内容结构:**
- 助教课程经历
- 教师培训参与
- 教学成果展示
- 学生评价（如适用）

**交互功能:**
- 课程详情展开
- 时间线展示
- 分类筛选

### 4. awards.html - 荣誉页面
**内容结构:**
- 荣誉奖项时间线
- 社会实践活动
- 志愿服务经历
- 获奖证书展示

**交互功能:**
- 按年份筛选
- 按类别分类
- 详情弹窗展示

## 技术实现
- **前端框架**: 纯HTML5 + CSS3 + JavaScript
- **样式框架**: Tailwind CSS
- **动画库**: Anime.js
- **图标库**: Feather Icons
- **字体**: Noto Sans/Serif SC + Inter
- **响应式**: 移动优先设计

## 内容优化
- 所有文本内容保持学术专业性
- 图片优化和压缩
- SEO友好的URL和元数据
- 无障碍访问支持