<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <!-- 19.将list数据传递给list.vue组件 -->
    <!-- 30.绑定list传递来的init 事件 -->
    <!-- 32.绑定list传递来的edit 事件 -->
    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- 弹框 -->
    <!-- 3.将info传给form -->
    <!-- 21.将list数据传递给form.vue组件 -->
    <!-- 25.绑定form传递过来的自定义事件 init -->
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import vForm from "./components/form";
import vList from "./components/list";
import { mapGetters, mapActions } from "vuex";
// 引入axios 请求列表数据
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    // 1.弹框状态
    return {
      info: {
        isshow: false,
        title: "添加菜单",
      },
      // 16.列表数据
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 2.点击添加按钮
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加菜单";
    },
    // 26 处理自定义事件 刷新数据
    init() {
      reqMenuList().then((res) => {
        this.list = res.data.list;
      });
    },
    //33. 处理编辑
    edit(id) {
      // isshow为true 打开弹框
      this.info.isshow = true;
      // 34. 给info补了字段 判断是添加还是编辑
      this.info.title = "编辑菜单";
      // 37.父组件调用子组件， form.vue 的 getOne()
      this.$refs.form.getOne(id);
    },
  },
  mounted() {
    // 17.一进来就请求数据
    this.init();
  },
  components: {
    vForm,
    vList,
  },
};
</script>
<style scoped>
</style>