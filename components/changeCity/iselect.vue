<template>
  <div class="m-iselect">
       <span class="name">按省份选择：</span> 
       <el-select v-model="pvalue" placeholder="省份">
            <el-option
            v-for="item in province"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length">
            <el-option
            v-for="item in city"
            :key="item.value"
            
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <span class="name">直接搜索：</span> 
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"
            >
        </el-autocomplete>
  </div>
</template>

<script>
//做延时处理
import _ from 'lodash'
export default {
 data(){
     return{
         province:[],
         pvalue:'',
         city:[],
         cvalue:'',
         input:'',
         cities: []//全国城市列表
     }
 },
 watch:{
     //监听
     async pvalue(newPvalue){
        let self=this;
        let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
        if(status==200){
            self.city=city.map(item=>{
                return{
                    value:item.id,
                    label:item.name
                }
            })
            self.cvalue=''
        }
     }
 },
 async mounted() {
     let {
      status,
      data: { province }
    } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }

 },
 methods:{
     //用户输入时调用，参数一个是用户输入一个是回调
      querySearchAsync:_.debounce(async function(query,callback){
          if (this.cities.length) {
              let self=this
              //城市列表有值时,根据输入进行过滤搜索，处理中文！！！！
                callback(self.cities.filter(item => item.value.indexOf(query) > -1))
            } else {
                    let {status,data: { city }} = await this.$axios.get('/geo/city')
                    if (status === 200) {
                        this.cities = city.map(item => {
                            return {
                            value: item.name
                            }
                        })
                            callback(this.cities.filter(item => item.value.indexOf(query) > -1))
                    } else {
                    callback([])
                    }
                }
     },200),
     handleSelect(item) {
      console.log(item.value)
      this.$router.push('/')
    }
 }
 
}
</script>
<style lang="scss" >
    @import "@/assets/css/changeCity/iselect.scss"
</style>
