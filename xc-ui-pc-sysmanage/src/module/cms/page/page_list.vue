<template>
  <div>
    <el-select v-model="params.siteId" placeholder="请选择站点">
      <el-option
        v-for="item in siteList"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
      </el-option>
    </el-select>
    <el-input v-model="params.pageAliase" style="width: 100px" placeholder="页面名称"></el-input>
    <el-button type="primary" v-on:click="query" size="small">查询</el-button>

    <router-link :to="{ path: 'add',params:{ page: this.params.page,siteId:this.params.siteId}}" replace>
      <el-button type="primary"  size="small">新增页面</el-button>
    </router-link>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>

      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row.pageId)"  size="small">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row.pageId)"  size="small">删除</el-button>
          <el-button type="text" @click="handlePreview(scope.row.pageId)"  size="small">预览</el-button>
          <el-button type="text" @click="postPage(scope.row.pageId)" size="small">页面发布</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :page-size="this.params.size" v-on:current-change="changePage"
        :total="total" :current-page="this.params.page" style="float:right;"></el-pagination>
<!--    <el-pagination style=float:right-->
<!--    @size-change="handleSizeChange"-->
<!--    @current-change="handleCurrentChange"-->
<!--    :current-page="currentPage4"-->
<!--    :page-sizes="[100, 200, 300, 400]"-->
<!--    :page-size="100"-->
<!--    layout="total, sizes, prev, pager, next, jumper"-->
<!--    :total="total">-->
<!--    </el-pagination>-->
  </div>
</template>
<script>
import * as cmsApi from "../api/cms"

export default {
  data() {
    return {
      list:[],
      siteList:[],
      total:0,
      params:{
        size:10,
        page:1,
        pageAliase:'',
        siteId:'',
        pageId:''
      }
    }
  },
  methods: {
    changePage(page){
      this.params.page=page;
      this.query()
    },
    // editPage(row){
    //   alert(row.pageName);
    //
    // },
    postPage(pageId){
      cmsApi.page_postPage(pageId).then((res)=>{

      })
    },
    query(){
      cmsApi.page_list(this.params.size,this.params.page,this.params).then((res)=>{
        //结果赋值给模型对象
        this.total=res.queryResult.total;
        this.list=res.queryResult.list;

      })
    },
    handlePreview(pageId){
      alert("DDD")
      cmsApi.page_preview(pageId).then((res)=>{
        alert("LLLL")
      })
    },

    querySiteList(){
      cmsApi.site_list().then((res)=>{
        this.siteList=res
      })
    },
    handleEdit(pageId){
      this.$router.push({ path:'edit',query:{'pageId':pageId} })
    },
    handleDelete(pageId){
      cmsApi.page_delete(pageId).then((res)=>{
        this.$alert('确认删除吗', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if(res.success){
              this.query()
              this.$message({
                type: 'info',
                message: res.message
              });
            }else if(!res.success){
              this.$message({
                type: 'warning ',
                message: res.message
              });
            }else{
              this.$message({
                type: 'warning ',
                message: `提交失败`
              });
            }

          }
        })






      })
    }
},
  mounted(){
    this.query()
    this.querySiteList()
  },
  created() {
//从路由上获取参数
    this.params.page = Number.parseInt(this.$route.query.page || 1);
    this.params.siteId = this.$route.query.siteId || '';
  }

}
</script>

<style>

</style>
