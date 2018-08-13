import { GoodsList, CartAdd, CartCount } from '../assets/js/api'
import { CONTRASTLIST, ADD_CARTLIST } from '../store/mutations/mutations-types'
import { mapMutations } from 'vuex'
//商列表和商品详情逻辑
import { Search } from '../assets/js/api'

export const goodsMixins = {
  data () {
    return {
      goodsList: [],
      cartListLength: 0,
      curpage: 1,
      hasmore: true,
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '加载成功'
        },
        pullUpLoad: {
          threshold: 90,
          txt: {
            more: 'Load more',
            noMore: '没有更多数据'
          }
        }
      },
    }
  },
  created () {

    this.getGoddsList(false)
    this.cartLength()
  },
  methods: {
    ...mapMutations([CONTRASTLIST, ADD_CARTLIST]),
    addordel (id) {
      let item = this.goodsList.filter((i) => i.goods_id === id)[0]
      let obj = Object.assign({store_name: item.store_name}, item.affiliated)
      this[CONTRASTLIST](obj)
    },
    async addCart (index) {
      let json = await this.$http.post(CartAdd, {
        post: {
          quantity: 1,
          goods_id: index
        }
      }, {show: true, type: 'mini'})
      if (json.code !== 200) {
        this.$toast({
          message: json.datas.error,
          position: 'bottom'
        })
      } else {
        this.$toast({
          message: '加入成功',
          position: 'bottom'
        })
        this.cartLength()
        // let item = this.goodsList.filter((i) => i.goods_id === index)[0];
        // this[ADD_CARTLIST](item)
      }
    },
    onPullingDown () {
      // 模拟更新数据
      this.curpage = 1
      setTimeout(() => {
        this.getGoddsList(true)
      }, 1000)
    },
    onPullingUp () {
      setTimeout(() => {
        if (this.hasmore) {
          this.getGoddsList(false)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    RequestGoodsData (off, json) {
      if (json.code === 200) {
        let list = this.goodsList
        let hasMore = json.hasmore
        if (off) {
          list = []
          this.hasmore = true
        }
        if (!hasMore) {
          this.hasmore = false
          this.goodsList = [...list, ...json.datas.goods_list]
          return
        } else {
          this.curpage++
        }
        this.goodsList = [...list, ...json.datas.goods_list]
      }
    },
    link (name) {
      this.$router.push({
        name: name
      })
    },
    async cartLength () {
      if (this.$store.state.key) {
        let json = await this.$http.post(CartCount, {}, {})
        this.cartListLength = json.datas.cart_count
      }
    },
  },
  computed: {
    contrastLength () {
      if (!this.$store.state.contrastList.list) return 0
      return this.$store.state.contrastList.list.length
    },
    // cartListLength() {
    //   if (!this.$store.state.cartList.list) return 0;
    //   return this.$store.state.cartList.list.length
    // },
  },
}

// 上啦加载，下拉刷新
export const uploadMixins = {
  data () {
    return {
      is_Load: true,
      a_page: 1
    }
  },
  created () {
    this.requestUploadData(true)
  },
  methods: {
    refresh (loaded) {
      this.a_page = 1
      this.requestUploadData(true)
      loaded.loaded('done')
    },
    loadmore (loaded) {
      if (this.is_Load) {
        this.requestUploadData(false)
        loaded.loaded('done')
      } else {
        loaded.loaded('fail')
      }
    },
    _mixinsRequestData (_type, _list_data, _list_data_item) {
      if (_list_data.code === 200) {
        let newData = this.list
        let hasMore = _list_data.hasmore
        if (_type) {
          newData = []
          this.is_Load = true
        }
        // 已经是最后一页了
        if (!hasMore) {
          this.is_Load = false
          this.list = [...newData, ..._list_data_item]
          return
        } else {
          this.a_page++
        }
        this.list = [...newData, ..._list_data_item]
      }
    }
  }
}

//提交钻石逻辑
export const submitMixins = {
  data () {
    return {
      pickerKey: null,
      text: 'GIA',
      activeTab: [],
      genderVisible: false,
      options: [],
    }
  },
  props: {
    info: Object,
    textinfo: Object,
    edit: {
      type: Boolean,
      default: true
    },
    reportNumS: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.reportNumS) {
      console.log(this.textinfo.textData)
    }
  },
  methods: {
    async reportNum () {
      if (this.info.report_no && this.info.report_no.length === 10) {
        let json = await this.$http.get(Search, {report_no: this.info.report_no}, {show: true})
        if (json.code === 200) {
          let info = json.datas;
          [this.textinfo.SearchData.carat_weight, this.textinfo.SearchData.clarity, this.textinfo.SearchData.shape, this.textinfo.SearchData.measurements, this.textinfo.SearchData.cut, this.textinfo.SearchData.polish, this.textinfo.SearchData.symmetry, this.textinfo.SearchData.fluorescence]
            =
            [info.carat_weight, info.clarity, info.shape, info.measurements, info.cut, info.polish, info.symmetry, info.fluorescence]
          this.textinfo['report'] = json.datas
        } else {
          for (let key in this.textinfo.SearchData) {
            this.textinfo.SearchData[key] = ''
          }
        }
      } else {
        this.$toast('请正确填写证书编号')
        for (let key in this.textinfo.SearchData) {
          this.textinfo.SearchData[key] = ''
        }
      }
    },
    pickerStatus (key) {
      if (!this.edit) return
      this.pickerKey = key
      this.options = this.optiosTest[key]
      setTimeout(() => {
        this.genderVisible = true
      }, 200)
    },
    setGender (val) {
      if (this.pickerKey === 'city_id') {
        this.textinfo.textData.city = `境外 ${val.text}`
        this.textinfo.textData.cityYC = '境外货源'
      } else {
        this.textinfo.textData[this.pickerKey] = val.text
        this.info[this.pickerKey] = val.value
      }

    },
    cityVal () {
      if (!this.edit) return
      this.$refs.choice.open()
    },
    cityChange (val) {
      let city = val
      if (city.length > 0) {
        this.textinfo.textData.city = `境内 ${city[1].name}`
        this.textinfo.textData.cityYC = '境内货源'
        this.info.city_id = city[1].area_id
        this.info.area = 1
      }
    }
  },
}

//解决android定位fixed或者absolute随键盘弹起
export const adPosition = {
  data () {
    return {
      screenHeight: 0,
      initBodyHeight: 0
    }
  },
  mounted () {
    const _this = this
    this.initBodyHeight = document.body.clientHeight
    window.addEventListener('resize', () => {
      _this.screenHeight = document.body.clientHeight
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
      }
    })
  },
  watch: {
    screenHeight (newVal) {
      this.screenHeight = newVal
      let $parent = document.getElementsByClassName('router')[0]
      if (this.screenHeight < this.initBodyHeight) {
        $parent.style.transition = 'none'
        this.$refs.save.style.display = 'none'
      } else if (this.screenHeight === this.initBodyHeight) {
        this.$refs.save.style.display = 'block'
        $parent.style.transition = ''
      }
    }
  }
}

//原生分享功能

export const shareMixins = {
  data () {
    return {
      shares: {},

    }
  },
  created () {

  },
  mounted () {
    if ($prod) {
      plus.share.getServices((s) => {
        this.shares = {}
        for (var i in s) {
          var t = s[i]
          this.shares[t.id] = t
        }
      }, function (e) {
        console.log('获取分享服务列表失败：' + e.message)
      })
    }
  },
  computed: {
    fullPath () {
      return `http://diamond.3wchina.net/mobile/dist/#${this.$route.fullPath}`
    },
  },
  methods: {
    //生成分享方式
    shareHref () {
      let shareBts = []
      let ss = this.shares['weixin']
      ss && ss.nativeClient && (shareBts.push({title: '微信朋友圈', s: ss, x: 'WXSceneTimeline'}),
        shareBts.push({title: '微信好友', s: ss, x: 'WXSceneSession'}))
      // 弹出分享列表
      shareBts.length > 0 ? plus.nativeUI.actionSheet({title: '分享本页面', cancel: '取消', buttons: shareBts}, (e) => {
        (e.index > 0) && this.shareAction(shareBts[e.index - 1])
      }) : plus.nativeUI.alert('当前环境无法支持分享链接操作!')
    },
    //分享操作
    shareAction (sb) {
      if (!sb || !sb.s) {
        this.$toast('无效的分享服务！')
        return
      }
      let msg = {
        content: '乐检钻石',
        title: '乐检钻石向您分享',
        thumbs: 'http://legem.oss-cn-beijing.aliyuncs.com/static/logo.png',
        extra: {scene: sb.x},
        href: this.fullPath
      }
      if (sb.s.authenticated) {
        this.shareMessage(msg, sb.s)
      } else {
        sb.s.authorize(() => {
          this.shareMessage(msg, sb.s)
        }, function (e) {
          console.log('认证授权失败：' + e.code + ' - ' + e.message)
        })
      }
    },
    //发送分享消息
    shareMessage (msg, s) {
      console.log(JSON.stringify(msg))
      s.send(msg, () => {
        this.$toast('分享成功')
      }, (e) => {
        this.$toast('分享失败')
      })
    },
  }
}
