<template>
  <!--地图容器-->
  <div id="map" class="XSDFXPage"></div>
</template>
<script>
  export default {
    name: 'baidu-Map',
    props: {
      cityText: {
        type: String,
        default: ''
      },
      cityCenterList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        map: null
      }
    },
    mounted () {
      // this.loadJScript().then(()=>{

      // })
      // 百度地图API功能
      // setTimeout(()=>{
      //   console.log(BMap.Map)
      // },1000)
      // setTimeout(() => {
      //   // 创建Map实例
      this.map = new BMap.Map('map')
      //   this.map.centerAndZoom(this.cityText,14) // 初始化地图,设置中心点坐标和地图级别
      // this.map.setCurrentCity('天津')

      // }, 200)
    },
    watch: {
      cityCenterList (val) {
        let {latitude, longitude} = val[0]
        let centerVal =  new BMap.Point(longitude, latitude)
        console.log(centerVal)
        this.map.centerAndZoom(centerVal,14)
        this.init()
        // this.map.setCurrentCity('天津')
        console.log(val)
      }
    },
    methods: {
      //异步加载地图
      // loadJScript () {
      //   return new Promise((resolve, reject) => {
      //     let script = document.createElement('script')
      //     script.type = 'text/javascript'
      //     script.src = 'http://api.map.baidu.com/api?v=2.0&ak=WFSnWQdgWrAx3vhWE01DCdMQ4RNGooZO&callback=init'
      //     document.body.appendChild(script)
      //     script.onload = script.readystatechange=(e)=>{
      //       console.log(script)
      //       resolve()
      //       // if(document.readyState==='complete'){
      //       //   console.log(document.readyState)
      //       // }
      //     }
      //   })

      // },
      addMarker (point) {
        let marker = new BMap.Marker(point)
        // console.log(marker)
        marker.addEventListener('click', (res) => {
          console.log(res)
        })
        this.map.addOverlay(marker)

      },
      init () {
        let list = this.cityCenterList
        list.forEach((item,index)=>{
          let point = new BMap.Point(item.longitude,item.latitude)
          this.addMarker(point)
        })
      }
    }

  }
</script>
<style lang="scss" scoped>
  .XSDFXPage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
</style>
