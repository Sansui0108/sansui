<template>
  <div class="add" :rules="rules">
    <el-dialog
      :title="info.title"
      :visible.sync="info.isshow"
      @opened="opened"
      @closed="closed"
    >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select
            v-model="user.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirst"
          >
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="user.second_cateid" placeholder="请选择二级分类">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px" prop="price">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px" prop="market_price">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      
        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select
            v-model="user.specsid"
            placeholder="请选择商品规格"
            @change="changeSpecsId"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" rop="specsattr">
          <el-select
            v-model="user.specsattr"
            placeholder="请选择二级分类"
            multiple
          >
            <el-option
              v-for="item in attrsList"
              :key="item"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="描述" label-width="120px">
          <!-- 富文本编辑器 -->
          <div v-if="info.isshow" id="edit"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title === '添加商品'" @click="add"
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
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/http";

// 引入弹框
import { successAlert, errorAlert } from "../../../utils/alert";

import path from "path";
import E from "wangeditor";

export default {
  props: ["info"],

  data() {
    return {
      rules: {
        first_cateid: [
          { required: true, message: "请输入一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请输入二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入商品市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        specsattr: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个规格属性",
            trigger: "change",
          },
        ],
      },
      // 初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //此时是数组，后端要的是 "[]"
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类的list
      secondCateList: [],
      // 规格属性list
      attrsList: [],
      // 初始化图片路径
      imgUrl: "",
    };
  },

  computed: {
    ...mapGetters({
      // 一级分类list
      cateList: "cate/list",
      // 7.请求规格list
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      // 一级list
      reqCateList: "cate/reqList",
      // 请求规格list
      reqSpecsList: "specs/reqList",
      // 商品list和总数
      reqGoodsList: "goods/reqList",
      reqGoodsCount: "goods/reqCount",
    }),

    //element-ui的上传文件
    changeFile2(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    // 根据一级分类id 得到二级分类list
    changeFirst() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    // 获取二级分类的list
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },

    // 根据商品规格 获取商品属性的list
    changeSpecsId() {
      //先将specsattr 置空
      this.user.specsattr = [];
      this.getAttrs();
    },
    getAttrs() {
      // 取出 specsList ,哪条数据的id和this.user.specsid是一样的
      let obj = this.specsList.find((item) => item.id === this.user.specsid);
      this.attrsList = obj ? obj.attrs : [];
    },

    // 置空user
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //此时是数组，后端要的是 "[]"
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //二级分类的list
      this.secondCateList = [];
      //图片临时地址
      this.imgUrl = "";
      //规格属性list
      this.attrsList = [];
    },

    // 弹框消失
    cancel() {
      this.info.isshow = false;
    },

    // 添加
    add() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsAdd(d).then((res) => {
          if (res.data.code == 200) {
            successAlert("添加成功");
            this.cancel();
            this.empty();
            // 刷新list
            this.reqGoodsList();
            this.reqGoodsCount();
          }
        });
      });
    },
    // 详情
    getOne(id) {
      reqGoodsDetail(id).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        this.getSecondList();
        this.imgUrl = this.$imgPre + this.user.img;
        this.user.specsattr = JSON.parse(this.user.specsattr);
        this.getAttrs();
        if (this.editor) {
          this.editor.txt.html(this.user.description);
        }
      });
    },

    // 修改
    updata() {
      this.check().then(() => {
        this.user.description = this.editor.txt.html();
        let d = { ...this.user };
        d.specsattr = JSON.stringify(d.specsattr);
        reqGoodsUpdate(d).then((res) => {
          if (res.data.code == 200) {
            successAlert("修改成功");
            this.cancel();
            this.empty();
            this.reqGoodsList();
          }
        });
      });
    },

    closed() {
      if (this.info.title == "编辑商品") {
        this.empty();
      }
    },
    // 弹框打开，并且动画结束了
    opened() {
      this.editor = new E("#edit");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.user.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.user.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.user.goodsname === "") {
          errorAlert("商品名称为空");
          return;
        }
        if (this.user.price === "") {
          errorAlert("商品价格为空");
          return;
        }
        if (this.user.market_price === "") {
          errorAlert("商品市场价格为空");
          return;
        }
        if (!this.user.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.user.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.user.specsattr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
  },

  mounted() {
    // 进来就请求一级分类
    this.reqCateList();
    // 一进来就请求规格list,参数true，是为了取到所有的规格
    this.reqSpecsList(true);
  },
};
</script>
<style scoped lang="stylus">
/* 穿透 */
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>