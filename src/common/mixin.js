import { debounce } from "common/utils";
export const itemListenerMixin = {
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 100);
        //刷新函数提取出来方便下面复用
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on("itemImageLoad", this.itemImgListener);
        // console.log("我是混入中的内容");
    }
}