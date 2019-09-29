<template>
  <div class="page-changeCity">
        <el-row>
            <el-col :span="24"><iSelect/></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><Hot/></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><Category/></el-col>
        </el-row>

  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Category from '@/components/changeCity/category.vue'

export default {
//   layout: 'blank',
  components:{
      iSelect,
      Hot,
      Category
  }
 
}
</script>
<style lang="css" >

</style>
