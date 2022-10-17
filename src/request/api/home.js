import service from ".."
// 获取首页轮播图的数据 
export function getBanner() {
    return service({
        method: "GET",
        url: "/banner?type=2",
        data: {

        }
    })
}

// 获取发现好歌单
export function getMusicList() {
    return service({
        method: "GET",
        url: "/personalized?limit=10",
        data: {

        }
    })
}

// 关键字
export function getSearchWord() {
    return service({
        method: "GET",
        url: "/search/default",
        data: {

        }
    })
}

// 搜索
export function getSearchMusic(data) {
    return service({
        method: "GET",
        url: `/search?keywords=${data}`,
        data: {

        }
    })
}

// 登录
export function getPhoneLogin(data) {
    return service({
        method: "GET",
        url: `/login?email=${data.phone}&password=${data.password}`,
        data: {

        }
    })
}

// 获取用户详情 /user/detail?uid=32953014
export function getUserInfo(data) {
    return service({
        method: "GET",
        url: `/user/detail?uid=${data}`,
        data: {

        }
    })
}