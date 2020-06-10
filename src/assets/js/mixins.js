import storage from './storage.js';
import {SEARCH_HISTORY_KEYWORD_KEY} from '../../views/search/config';

export const searchMixin = {
  methods: {
    $_selectItem(keyword) {
      //使用浏览器的storage保存搜索历史记录
      let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      // 将搜索结果放在最上面
      if (keywords.length !== 0) {
        keywords = keywords.filter(val => val !== keyword);
      }

      keywords.unshift(keyword);

      storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);

      // 跳转到搜索结果页 todo
    }
  }
};
