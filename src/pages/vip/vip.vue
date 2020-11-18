<template>
  <div>

    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <!-- <el-pagination
      background
      @current-change="changePage"
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
    ></el-pagination> -->

    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { reqVipList, reqManageCount } from "../../utils/http";

import vList from "./components/list";
import vForm from "./components/form";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加会员",
      },
      // 初始化列表数据
      list: [],

      // 初始化分页
      // total: 0,
      // size: 2,
      // page: 1,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    init() {
      reqVipList().then((res) => {
        let list = res.data.list ? res.data.list : [];

        // // 56.如果取到的list是[],并且page>1,page自减，请列表
        // if (list.length === 0 && this.page > 1) {
        //   this.page--;
        //   this.init();
        //   return;
        // }

        this.list = list;
      });
    },
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑会员",
      };
      this.$refs.form.getOne(uid);
    },
    // 获取总数
    // getCount() {
    //   reqManageCount().then((res) => {
    //     this.total = res.data.list[0].total;
    //   });
    // },
    // changePage(page) {
    //   this.page = page;
    //   this.init();
    // },
    //55 .请list，请总数
    // newInit() {
    //   this.init();
      // this.getCount();
    // },
  },
  mounted() {
    this.init();
    // this.getCount();
  },

  components: {
    vForm,
    vList,
  },
};
</script>
<style scoped>
</style>