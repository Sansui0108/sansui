<template>
  <div>
    <!-- 5.绑定info.isshow到模板 -->
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="info">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
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
        <el-button type="primary" v-if="info.title === '添加会员'"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import { reqVipList, reqVipDetail, reqVipUpdate } from "../../../utils/http";
// 引入弹框
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      pass: "",
      oldPass: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 置空
    empty() {
      this.user = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },

    // 修改
    updata() {
      if (this.user.password === "") {
        errorAlert("密码不能为空");
        return;
      }
      reqVipUpdate(this.user).then((res) => {
        console.log(this.user);
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    // 获取详情
    getOne(uid) {
      reqVipDetail(uid).then((res) => {
        this.oldPass = res.data.list.password;
        console.log(this.oldPass);
        this.user = res.data.list;
        this.user.password = "";
      });
    },

    // 处理消失
    closed() {
      if (this.info.title == "编辑会员") {
        this.empty();
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>