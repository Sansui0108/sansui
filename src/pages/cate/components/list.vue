<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" width="140">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="140">
      </el-table-column>
      <el-table-column label="图片" width="380">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <v-del @confirm="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// 引入弹框
import { successAlert, errorAlert } from "../../../utils/alert";

import { reqCateDel } from "../../../utils/http";

import vDel from "../../../components/delBtn";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqCateDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
  },
  mounted() {
    this.reqList();
  },
  components: {
    vDel,
  },
};
</script>
<style scoped>
/* .el-table__row >>> .cell{
  text-align: center;
} */
.el-table__row img {
  width: 200px;
  height: 200px;
  
}
.el-table >>> .el-table_1_column_3 .cell{
  text-align: center;
}

</style>