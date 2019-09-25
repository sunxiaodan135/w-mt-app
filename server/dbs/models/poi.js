//搜索框的线下数据模型
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String//景点名
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String //区县
  },
  areaCode: {
    type: String  //区号
  },
  tel: {
    type: String  //电话
  },
  area: {
    type: String  //地区、商圈
  },
  addr: {
    type: String  //地址
  },
  type: {
    type: String  //类型:餐饮、经典
  },
  module: {
    type: String   //子分类
  },
  longitude: {
    type: Number  //经纬度链接地图时候使用
  },
  latitude: {
    type: Number
  }
})

export default mongoose.model('Poi', Poi)
