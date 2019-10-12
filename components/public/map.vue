<template>
    <div
        :id='id'
        :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
        class="m-map"
        />
</template>
<script>
    export default{

        props:{

            width:{
                type:Number,
                default:300
            },
            height:{
                type:Number,
                default:300
            },
            point:{
                type:Array,
                default(){
                    return[116.46,39.92]
                }
            },
        },
        data(){
            return{
                id:`map`,
                key:'bf880d8ea63bbe5f946f19a345b24d92'
            }
        },
        watch:{
            point:function(val,old){
                    this.map.setCenter(val)
                    this.marker.setPosition(val)
            }
        },
        //来异步加载才能拿到windows对象
        mounted(){
            let self =this
            //动态id
            self.id=`map${Math.random().toString().slice(4,6)}`
            //onmaploaded为回调函数名
            window.onmaploaded  =()=>{
                let map = new window.AMap.Map(self.id,{
                    resizeEnable:true,
                    zoom:11,
                    center:self.point

                });
                self.map=map
                window.AMap.plugin('AMap.ToolBar', ()=>{
                        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                        let toolbar=new window.AMap.ToolBar()

                        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                        map.addControl(toolbar);
                        let marker=new window.AMap.marker({
                            icon:'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                            position: self.point
                        })
                        self.marker=marker
                        marker.setMap(map)
                    });
            }
             var url = 'https://webapi.amap.com/maps?v=1.4.15&key=${self.key}&callback=onmaploaded';
            var jsapi = doc.createElement('script');
            jsapi.charset = 'utf-8';
            jsapi.src = url;
            document.head.appendChild(jsapi);

        }
    }
</script>