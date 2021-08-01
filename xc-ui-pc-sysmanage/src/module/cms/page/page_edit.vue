<template>
  <div>
    <el-form ref="pageForm" :model="pageForm" :rules="rules" label-width="80px">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模板" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择模板">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="pageForm.pageAliase"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio v-model="pageForm.pageType" label="1">静态</el-radio>
        <el-radio v-model="pageForm.pageType" label="0">动态</el-radio>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="pageForm.pageCreateTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="submitForm('pageForm')">更新</el-button>
        <el-button type="primary" @click="go_back" >返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as cmsApi from "../api/cms"
export default {
  data() {
    return {
      siteList:[],
      templateList:[],
      pageForm: {
        siteId: '',
        templateId: '',
        pageName: '',
        pageAliase: '',
        pageWebPath:'',
        pagePhysicalPath: '',
        pageType: '',
        pageCreateTime: ''
      },
      rules: {
        siteId: [
          { required: true, message: '请选择站点', trigger: 'blur' },
        ],
        templateId: [
          { required: true, message: '请选择模版', trigger: 'blur' },
        ],
        pageName: [
          { required: true, message: '请输入页面名称', trigger: 'blur' },
        ],
        pageWebPath: [
          { required: true, message: '请输入访问路径', trigger: 'blur' },
        ],
        pagePhysicalPath: [
          { required: true, message: '请输入物理路径', trigger: 'blur' },
        ]
      }
    }

  },
  methods: {
    querySiteList(){
      cmsApi.site_list().then((res)=>{
        this.siteList=res
      })
    },
    queryTemplateIdList(){
      cmsApi.template_list().then((res)=>{
        this.templateList=res
      })
    },
    queryPage(pageId){
      cmsApi.site_edit(pageId).then((res)=>{
        this.pageForm.siteId=res.siteId,
        this.pageForm.templateId=res.templateId,
        this.pageForm.pageAliase=res.pageAliase,
        this.pageForm.pageName=res.pageName,
        this.pageForm.pageWebPath=res.pageWebPath,
        this.pageForm.pagePhysicalPath=res.pagePhysicalPath,
        this.pageForm.pageType=res.pageType,
        this.pageForm.pageCreateTime=res.pageCreateTime
      })

    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          cmsApi.site_update(this.$route.query.pageId,this.pageForm).then((res)=>{
            this.$alert('确认提交吗', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                if(res.SUCCESS){
                  this.$message({
                    type: 'info',
                    message: res.message
                  });
                }else if(!res.SUCCESS){
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
        } else {
          console.log('提交失败');
          return false;
        }
      });
    },

    go_back(){
      this.$router.push({
        path: '/cms/page/list', query: {
          page: this.$route.query.page,
          siteId:this.$route.query.siteId
        }
      })

    },
  },


  mounted(){
    this.querySiteList()
    this.queryTemplateIdList();
    this.queryPage(this.$route.query.pageId);
  }
}
</script>

<style>

</style>
