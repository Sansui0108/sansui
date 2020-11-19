<template>
  <div>

    <v-list :list="list" @init="init" @edit="edit"></v-list>

    <v-form :info="info" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { reqVipList } from "../../utils/http";

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
  },
  mounted() {
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