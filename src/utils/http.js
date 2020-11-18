import axios from "axios"
import qs from "qs"
import {
  errorAlert
} from "./alert"
import store from "../store/index"
import router from "../router/index"
import Vue from "vue"

// 开发环境
const baseUrl = "/aa"
// 展示图片，需要给图片加“http://localhost:3000”,打包又不用，所以在http.js 中给Vue的原型挂了http://localhost:3000
Vue.prototype.$imgPre = "http://localhost:3000"
// 生产环境
// const baseUrl = ""
// Vue.prototype.$imgPre = ""



// 请求拦截
axios.interceptors.request.use(req => {
  if (req.url != baseUrl + "/api/userlogin") {
    req.headers.authorization = store.state.userInfo.token;
  }
  return req;
})

// 响应拦截
axios.interceptors.response.use(res => {
  console.log("本次访问的地址：" + res.config.url);
  console.log(res);
  if (res.data.code != 200) {
    errorAlert(res.data.msg);
  }
  if (res.data.msg == "登录已过期或访问权限受限") { // 掉线
    store.dispatch('changeUser', {});
    router.push("/login")
  }
  return res;
})

// ===========菜单接口 开始====================

// 13. add函数 添加数据 发送时qs
export const reqMenuAdd = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}

// 18. 请求数据 一开始就
export const reqMenuList = () => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: "get",
    params: {
      istree: true
    }
  })
}

// 29 删除时获取的 点击的那一条数据 发送id
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "POST",
    data: qs.stringify({
      id: id
    })
  })
}

// 35.获取一条数据
export const reqMenuDetail = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "GET",
    params: {
      id: id
    }
  })
}

// 发送数据 
export const reqMenuUpdate = (from) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "POST",
    data: qs.stringify(from)
  })
}

// ===========菜单接口 结束====================

// ===========角色接口 开始====================

// 添加按钮
export const reqRoleAdd = (user) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(user)
  })
}

// 角色列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  })
}

// 删除时获取的 点击的那一条数据 发送id
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "POST",
    data: qs.stringify({
      id: id
    })
  })
}

// 获取一条数据
export const reqRoleDetail = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "GET",
    params: {
      id: id
    }
  })
}

// 发送数据 修改
export const reqRoleUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "POST",
    data: qs.stringify(user)
  })
}
// ===========角色接口 结束====================

// ===========管理员接口 开始====================
// 添加按钮
export const reqManageAdd = (user) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(user)
  })
}

// 管理员列表
export const reqManageList = (p) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "GET",
    params: p
  })
}

// 删除数据
export const reqManageDel = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "POST",
    data: qs.stringify({
      uid: uid
    })
  })
}

// 获取一条数据详情
export const reqManageDetail = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

// 修改
export const reqManageUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(user)
  })
}

// 获取总数
export const reqManageCount = (user) => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get",
  })
}

// 登录
export const reqLogin = (user) => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(user)
  })
}
// ===========管理员接口 结束====================

// ===========分类接口 开始====================
// 添加按钮
export const reqCateAdd = (user) => {
  let d = new FormData()
  for (let i in user) {
    d.append(i, user[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: d
  })
}

// 管理员列表  列表 p={istree:true}  p={pid:1}
export const reqCateList = (p) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "GET",
    params: p
  })
}

// 删除数据
export const reqCateDel = (id) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "POST",
    data: qs.stringify({
      id: id
    })
  })
}

// 获取一条数据详情
export const reqCateDetail = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

// 修改
export const reqCateUpdate = (user) => {
  let d = new FormData();
  for (let i in user) {
    d.append(i, user[i]);
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: d
  })
}
// ===========分类接口 结束====================

// ===========商品规格接口 开始====================
// 添加按钮
export const reqSpecsAdd = (user) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(user)
  })
}

// 商品规格列表  
export const reqSpecsList = (p) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "GET",
    params: p
  })
}

// 删除数据
export const reqSpecsDel = (id) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "POST",
    data: qs.stringify({
      id: id
    })
  })
}

// 获取一条数据详情
export const reqSpecsDetail = (id) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

// 修改
export const reqSpecsUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(user)
  })
}

export const reqSpecsCount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get"
  })
}
// ===========商品规格接口 结束====================

// ===========会员接口 开始====================

// 会员列表
export const reqVipList = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method: "get"
  })
}

// 会员获取 一条
export const reqVipDetail = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {
      uid: uid
    }
  })
}

// 会员修改
export const reqVipUpdate = (user) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data: qs.stringify(user)
  })
}

// ===========商品列表接口 开始====================
// 添加
export const reqGoodsAdd = (user) => {
  let d = new FormData();
  for (let i in user) {
    d.append(i, user[i]);
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: d
  })
}

// 商品总数 计算分页
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "GET"
  })
}

// 列表 p={page:1,size:10}
export const reqGoodsList = (p) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params: p
  })
}

//删除
export const reqGoodsDel = (id) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}

// 详情
export const reqGoodsDetail = id => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

// 修改 文件
export const reqGoodsUpdate = (user) => {
  let d = new FormData()
  for (let i in user) {
    d.append(i, user[i])
  }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method: "post",
    data: d
  })
}
// ===========商品列表接口 结束====================

// ===========分类接口 开始====================
// 添加按钮
export const reqBannerAdd = (user) => {
  let d = new FormData()
  for (let i in user) {
    d.append(i, user[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: "post",
    data: d
  })
}

// 管理员列表
export const reqBannerList = (p) => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method: "GET",
  })
}

// 删除数据
export const reqBannerDel = (id) => {
  return axios({
    url: baseUrl + "/api/bannerdelete",
    method: "POST",
    data: qs.stringify({
      id: id
    })
  })
}

// 获取一条数据详情
export const reqBannerDetail = (id) => {
  return axios({
    url: baseUrl + "/api/bannerinfo",
    method: "get",
    params: {
      id: id
    }
  })
}

// 修改
export const reqBannerUpdate = (user) => {
  let d = new FormData();
  for (let i in user) {
    d.append(i, user[i]);
  }
  return axios({
    url: baseUrl + "/api/banneredit",
    method: "post",
    data: d
  })
}
// ===========分类接口 结束====================