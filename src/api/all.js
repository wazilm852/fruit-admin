import request from '@/utils/request';

// 网页获取水果分类列表
export function categoryList() {
    return request({
        url: '/admin/category/list',
        method: 'get',
        params: {},
    });
}
// 添加水果分类
export function addFruitCategory(categoryName, isShow) {
    return request({
        url: '/admin/category/list',
        method: 'get',
        params: {
            categoryName,
            isShow
        },
    });
}

// 网页获取水果列表
export function getFruitsList(data) {
    return request({
        url: '/admin/product/list',
        method: 'post',
        data: data
    });
}
// 水果插入
export function insertFruits(data) {
    return request({
        url: '/admin/product/insert',
        method: 'post',
        data: data,
    });
}
// 删除水果
export function deleteFruits(pkId) {
    return request({
        url: '/product/delete', // ?pkId=1
        method: 'delete',
        params: {
            pkId,
        },
    });
}
// 更新水果图片
export function updateFruitsImage(pkId, image) {
    return request({
        url: '/product/updateImage',
        method: 'post',
        data: {
            pkId,
            image,
        },
    });
}
// 更新水果信息
export function updateFruitsInfo(pkId, name, type, price, image, introduction) {
    return request({
        url: '/product/update',
        method: 'post',
        data: {
            pkId,
            name,
            type,
            price,
            image,
            introduction,
        },
    });
}
// 获取用户列表
export function getUserList() {
    return request({
        url: '/user/list',
        method: 'get',
    });
}
// 获取订单列表
export function getOrderList(data) {
    return request({
        url: '/admin/order/list',
        method: 'post',
        data: data
    });
}
// 更新订单状态
export function updateOrderStatus(orderId, status) {
    return request({
        url: 'order/update',
        method: 'post',
        data: {
            orderId,
            status,
        },
    });
}
// 删除订单
export function deleteOrder(orderId) {
    return request({
        url: '/order/delete', // orderId=201903160001
        method: 'delete',
        params: {
            orderId,
        },
    });
}
