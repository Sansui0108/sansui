<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list :list="list" @init="init" @edit="edit" ></v-list>

    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";

import { reqRoleList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加角色",
      },
      // 列表数据初始化
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.title = "添加角色";
    },
    init() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info = {
        isshow: true,
        title: "编辑角色",
      };
      this.$refs.form.getOne(id);
    },
    
  },
  components: {
    vList,
    vForm,
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
</style>