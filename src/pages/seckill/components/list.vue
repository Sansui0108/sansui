<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <v-del @confirm="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// 引入弹框
import { successAlert } from "../../../utils/alert";

import { reqSeckillDel } from "../../../utils/http";
import vDel from "../../../components/delBtn";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqScekillList: "seckill/reqList",
    }),
    del(id) {
      reqSeckillDel(id).then(res=>{
        if(res.data.code==200){
          successAlert("删除成功");
          this.reqScekillList();
        }
      })
    },
    edit(id){
      this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqScekillList();
  },
  components: {
    vDel,
  },
};
</script>
<style scoped>
</style>