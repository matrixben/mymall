import myAjax from './ajax';

// 1. 定义基础路径
const BASE_URL = 'http://localhost:8088/';

// 首页
// 获取幻灯片数据
export const getHomeSlider = () => myAjax(BASE_URL + 'home/banners');
// 获取热卖推荐数据,入参中的值为默认值
export const getHomeRecommend = () => myAjax(BASE_URL + 'home/hot', {'page':1,'pagesize':20});

// 分类页
// 获取分类详情数据
export const getCategoryContent = (type, id) => myAjax(BASE_URL+'home/cats/'+type+'/'+id);

// 搜索页
//获取热门搜索数据--ajax
export const getSearchHotKeyword = () => myAjax(BASE_URL + 'home/searchHot');

// 商品页
// 获取商品详情数据
export const getProductDetail = (id) => myAjax(BASE_URL + 'item/detail/' + id);
// 获取用户评价数据
export const getUserComments = (id) => myAjax(BASE_URL + 'item/detail/comments/' + id, {'page':1,'pagesize':20});

// 购物车页
// 添加商品到购物车
export const addItemToCart = (userId, cartItem) => myAjax(BASE_URL + 'cart/add',
                                                          {'userId':userId,'ShoppingCartBO':cartItem},
                                                          'POST');
// 展示购物车中的商品
export const showItemsInCart = (userId) => myAjax(BASE_URL+ 'cart/getitemsfromcart',{'userId':userId},'POST');