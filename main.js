
document.addEventListener("DOMContentLoaded", function () {

    let _count = 0;
    let _isHot = true;
    let _isTrue = true;
    let _lastScrollTop = 0;
    // 移动偏移量
    let _MAX_SHIFTING = 200;
    // 设备存在宽度兼容
    // 此设备准确宽度差应为 6，设置 100 防备多设备无法兼容问题。
    // 下方 ”兼容标记“ Title 处，需其中一处必须要 + || -，解决此问题，
    const _COMPATIBLE = 100;

    // Elements
    let _trackElement =
        document.querySelector("#span");
    let _frontAllElement =
        document.querySelector("#top");
    let _scrollElement =
        document.querySelector("#view");
    let _lastAllElement =
        document.querySelector("#bottom");
    let _contentElement =
        document.querySelector("#middle");

    _scrollElement.addEventListener("scroll", function () {

        let _currentLeft =
            _MAX_SHIFTING * _count;

        // 兼容标记：? + _COMPATIBLE，解决偏移量兼容问题.
        const _viewWidth =
            _trackElement.clientWidth - _contentElement.clientWidth;

        const _currentScrollTop =
            _scrollElement.pageYOffset || _scrollElement.scrollTop;

        if (
            _isTrue &&
            _currentScrollTop > _lastScrollTop
        ) {
            // 到达指定位置
            if (
                _scrollElement.scrollTop
                >=
                _frontAllElement.clientHeight
            ) {

                if (
                    _currentLeft < _viewWidth
                ) {
                    // _currentLeft + 300 预防方向偏移
                    _trackElement.style.transform = `translate(${-(_currentLeft + _MAX_SHIFTING)}px, 0)`;
                    _count++
                    _scrollElement.scroll(0, _frontAllElement.clientHeight);
                }
                return
            }
        } else if (
            _currentScrollTop < _lastScrollTop
        ) {
            _isTrue = false
            // 兼容标记：? - _COMPATIBLE，解决偏移量兼容问题.
            let _currentBomLeft = _currentLeft - _COMPATIBLE;

            // 计算距离底部距离
            let scrollBom =
                (_scrollElement.scrollHeight - _scrollElement.scrollTop) / 2;

            if (
                scrollBom
                >=
                _frontAllElement.clientHeight
            ) {

                if (
                    _currentBomLeft <= 0
                ) {
                    _isTrue = true;
                    _isHot = true;
                    _trackElement.style.transform = `translate(0,0)`;
                    return;
                }

                if (
                    _currentBomLeft <= _viewWidth
                ) {
                    _isHot = false;
                    // _currentLeft - 300 预防方向偏移
                    _trackElement.style.transform = `translate(${-(_currentLeft - _MAX_SHIFTING)}px,0)`;
                    _count--;
                    _scrollElement.scroll(0, _lastAllElement.clientHeight);
                    return
                }
                _scrollElement.scroll(0, _lastAllElement.clientHeight);

            }
        }

        if (!_isHot) {
            _isHot = true;
            _isTrue = true;
        }

        // 更新上一次的滚动位置
        _lastScrollTop = _currentScrollTop;

    });
});
