<template>
  <div>
    <!-- 20.展示list数据 :data="list" -->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" width="80"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100">
      </el-table-column>

      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品" width="100">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.isnew == 1">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" width="100">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.ishot == 1">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.status == 1">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
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

    <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="size"
      @current-change="changePage"
      ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// 引入弹框
import { successAlert, errorAlert } from "../../../utils/alert";

import { reqGoodsDel } from "../../../utils/http";

import vDel from "../../../components/delBtn";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqCount: "goods/reqCount",
      changePage: "goods/changePage",
    }),
    del(id) {
      reqGoodsDel(id).then((res) => {
        if (res.data.code === 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqCount();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqList();
    this.reqCount();
  },
  components: {
    vDel,
  },
};
</script>
<style scoped>
img {
  width: 150px;
  height: 150px;
}
</style>