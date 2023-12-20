# contentScroll

HTMl scroll 固定 Demo，源码无加密。

# 原理

分为 上、中、下 三区域。
列如滑动至中区域固定，则需要计算上区域所有 Dom height

1. 监听 Dom Scroll
2. 计算固定位置以上 All Dom height
3. 抵达交界区固定 Dom Scroll scrollTop
4. 计算并赋值为中区域实现左右平移
5. 抵达 max min 值，取消固定 Dom Scroll scrollTop 恢复滚动
