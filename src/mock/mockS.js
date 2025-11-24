import Mock from 'mockjs'
import category from './category.json'
import goods from './goods.json'
Mock.mock('/good/category','get',{
    code:200,
    data:category
})
Mock.mock('/good/list','get',{
    code:200,
    data:goods
})