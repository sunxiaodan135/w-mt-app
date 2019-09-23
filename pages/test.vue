<template>
    <div>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"

                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <templete>
                <el-menu-item index="2" >消息中心</el-menu-item>
                <el-menu-item index="3"><a href="/login" target="_blank" >订单管理</a></el-menu-item>
            </templete>

        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "test",
        layout: 'blank',
        data(){
            return{

                activeIndex2: '1'
            }
        }
    }
</script>

<style scoped>

</style>
