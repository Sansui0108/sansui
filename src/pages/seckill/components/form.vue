<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="info">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              
            >
            </el-date-picker>
          </div>
        </el-form-item>
   
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            v-model="user.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirst"
          >
            <!-- <el-option label="顶级分类" :value="0"></el-option> -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px">
          <el-select
            v-model="user.second_cateid"
            placeholder="请选择二级分类"
            @change="changeSecond"
          >

            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="120px">
          <el-select v-model="user.goodsid" placeholder="请选择商品">

            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title === '添加活动'" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import {
  reqCateList,
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillDetail,
  reqSeckillUpdate
} from "../../../utils/http";
// 引入弹框
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 二级分类list
      secondCateList: [],
      // 三级分类list
      goodsList: [],
      // 初始化时间
      time: [],
    };
  },
  computed: {
    ...mapGetters({
      //一级分类list
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      // 请求一级分类list
      reqCateList: "cate/reqList",
      reqScekillList: "seckill/reqList",
    }),
    // 置空user
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      // 二级分类list
      this.secondCateList = [];
      // 三级分类list
      this.goodsList = [];
      // 初始化时间
      this.time = "";
    },
    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },

    // 根据一级分类id 得到二级分类list
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
      this.changeSecond();
    },
    // 获取二级分类的list
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 根据二级分类id 得到三级分类list
    changeSecond() {
      this.user.goodsid = "";
      this.getGoodsList();
    },
    getGoodsList() {
      reqGoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
      });
    },

    // 添加
    add() {
      this.user.begintime = this.time[0].getTime();
      this.user.endtime = this.time[1].getTime();
      reqSeckillAdd(this.user).then((res) => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.cancel();
          this.empty();
          // 刷新列表
          this.reqScekillList()
        }
      });
    },
    getOne(id) {
      reqSeckillDetail(id).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.id=id;
          this.getSecondList();
          this.getGoodsList();
          this.user.begintime = new Date(parseInt(res.data.list.begintime));
          this.user.endtime = new Date(parseInt(res.data.list.endtime));
          this.time=[this.user.begintime,this.user.endtime]
        }
      });
    },
    updata() {
      this.user.begintime = this.time[0].getTime();
      this.user.endtime = this.time[1].getTime();

      reqSeckillUpdate(this.user).then(res=>{
        if(res.data.code===200){
          successAlert('修改成功');
          this.cancel();
          this.empty();
          this.reqScekillList()
        }
      })
    },
    closed() {
      if (this.info.title == "编辑活动") {
        this.empty();
      }
    },
  },
  mounted() {
    this.reqCateList();
  },
};
</script>
<style scoped>
</style>