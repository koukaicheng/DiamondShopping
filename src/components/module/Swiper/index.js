import dsSwiper from './Swiper';
import dsSwiperItem from './SwiperItem';


dsSwiper.install((Vue)=>{
  Vue.component(dsSwiper.name,dsSwiper);
  Vue.component(dsSwiperItem.name,dsSwiperItem)
});
dsSwiper.Item = dsSwiperItem;
export default dsSwiper;
