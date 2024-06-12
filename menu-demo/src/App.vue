<template>
  <div id="app">
    <div class="container">
      <div class="menu">
        <ul class="menu-list">
          <li v-for="(item, index) in menuItems" :key="index" @mouseover="showSubmenu(index)">
            {{ item.name }}
            <ul v-if="item.favorites && item.favorites.length" class="favorites-list">
              <li v-for="(favorite, favoriteIndex) in item.favorites" :key="favoriteIndex" class="favorite-item">
                <div class="favorite-category">
                  <span class="category-icon">📁</span>
                  {{ favorite.category }}
                </div>
                <ul class="favorite-sublist">
                  <li v-for="(subItem, subIndex) in favorite.items" :key="subIndex" class="favorite-subitem">
                    {{ subItem }}
                  </li>
                </ul>
              </li>
            </ul>
            <div class="submenu" v-if="activeSubmenu === index">
              <div class="submenu-header">
                <div class="search-container">
                  <span class="search-icon">🔍</span>
                  <input type="text" placeholder="请输入关键词" v-model="searchQuery" class="search-input">
                </div>
                <span class="menu-action">使用默认菜单</span>
                <span class="close-btn" @click="closeSubmenu">×</span>
              </div>
              <div class="submenu-content">
                <div v-for="(column, columnIndex) in item.columns" :key="columnIndex" class="submenu-column">
                  <div v-for="(bottomItem, bottomIndex) in column.bottomItems" :key="bottomIndex" class="bottom-category">
                    <div class="category-title">{{ bottomItem.category }}</div>
                    <ul class="category-list">
                      <li v-for="(subItem, subIndex) in filteredItems(bottomItem.items)" :key="subIndex" @mouseover="showFavorite(subItem)" @mouseleave="hideFavorite(subItem)" class="category-item">
                        {{ subItem }}
                        <span v-if="hoveredItem === subItem" class="favorite-icon" @click="toggleFavorite(bottomItem.category, subItem, item.name)">☆</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      hoveredItem: null,
      menuItems: [
        {
          name: '监控类别',
          columns: [
            {
              bottomItems: [
                {
                  category: '用户分析',
                  items: ['维度分析']
                },
                {
                  category: '基础性能',
                  items: ['APP启动', '卡顿', '首屏耗时', '端资源']
                },
                {
                  category: '异步监控',
                  items: ['崩溃分析', '异常码分析']
                },
                {
                  category: '业务监控',
                  items: ['业务监控项']
                }
              ]
            },
            {
              bottomItems: [
                {
                  category: '组件监控',
                  items: ['Hybrid监控', '流媒体监控', 'RN监控']
                },
                {
                  category: '专项监控',
                  items: ['店铺性能', 'CPS监控']
                },
                {
                  category: '网络监控',
                  items: ['网络探测', '网络分析', 'CDN监控']
                }
              ]
            },
            {
              bottomItems: [
                {
                  category: '实用工具',
                  items: ['用户追踪', '机型管理', '数据加解密']
                },
                {
                  category: '告警管理',
                  items: ['异常码告警', '流媒体告警', '告警历史']
                },
                {
                  category: '配置管理',
                  items: ['策略配置', '权限配置']
                }
              ]
            }
          ],
          favorites: [] // 新增的收藏项数组
        }
        // 其他菜单项可以根据需要添加
      ],
      activeSubmenu: null
    };
  },
  methods: {
    showSubmenu(index) {
      this.activeSubmenu = index;
    },
    hideSubmenu() {
      // 保持二级菜单不隐藏
    },
    closeSubmenu() {
      this.activeSubmenu = null;
      this.searchQuery = '';
    },
    filteredItems(items) {
      if (!this.searchQuery) {
        return items;
      }
      return items.filter(item => item.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    showFavorite(item) {
      this.hoveredItem = item;
    },
    hideFavorite(item) {
      if (this.hoveredItem === item) {
        this.hoveredItem = null;
      }
    },
    toggleFavorite(category, item, categoryName) {
      const menuItem = this.menuItems.find(menuItem => menuItem.name === categoryName);
      if (menuItem) {
        const favoriteCategory = menuItem.favorites.find(fav => fav.category === category);
        if (favoriteCategory) {
          if (!favoriteCategory.items.includes(item)) {
            favoriteCategory.items.push(item);
          } else {
            favoriteCategory.items = favoriteCategory.items.filter(favItem => favItem !== item);
          }
        } else {
          menuItem.favorites.push({ category: category, items: [item] });
        }
      }
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  margin: 20px;
}

.menu {
  width: 200px;
  border-right: 1px solid #e0e0e0;
  background-color: #f9fafb; /* 修改背景色 */
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list > li {
  padding: 15px;
  background: #f9fafb; /* 修改背景色 */
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #333;
  text-align: left; /* 左对齐 */
}

.menu-list > li:hover {
  background: #e7eff8; /* 鼠标悬停背景色 */
}

.favorites-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.favorite-item {
  padding: 10px 15px;
  background: #e7eff8; /* 淡蓝色背景 */
  font-size: 14px; /* 字体稍小 */
  color: #666; /* 字体颜色稍浅 */
  cursor: pointer;
  position: relative;
  text-align: left; /* 左对齐 */
}

.favorite-item:hover {
  background: #d7e7f8; /* 鼠标悬停背景色 */
}

.favorite-category {
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.favorite-category .category-icon {
  margin-right: 5px;
}

.favorite-sublist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.favorite-subitem {
  padding-left: 20px; /* 左侧缩进 */
  font-size: 16px; /* 字体大小与一级菜单一致 */
  color: #333;
  cursor: pointer;
  text-align: left; /* 左对齐 */
}

.favorite-subitem:hover {
  text-decoration: underline;
  color: #1a73e8;
}

.submenu {
  position: absolute;
  left: 200px;
  top: 0;
  width: 800px;
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.submenu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 4px;
}

.search-icon {
  margin-right: 5px;
  font-size: 16px;
  color: #888;
}

.search-input {
  flex: 1;
  padding: 5px;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
}

.menu-action {
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
}

.close-btn {
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.submenu-content {
  display: flex;
  flex-wrap: wrap;
}

.submenu-column {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}

.bottom-category {
  margin-bottom: 20px;
}

.category-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.category-item:hover {
  background: #e7eff8; /* 鼠标悬停背景色 */
  color: #1a73e8;
}

.favorite-icon {
  font-size: 14px;
  color: #1a73e8;
  cursor: pointer;
  margin-left: 10px;
}

.favorite-icon:hover {
  color: #ff0000;
}
</style>
