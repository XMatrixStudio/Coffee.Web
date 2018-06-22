<template>
  <div class="edit-card">
    <p class="line-time">
      <i class="fa fa-circle time-point" aria-hidden="true"></i>
      <span class="time-text">{{nowTime}}</span>
    </p>
    <el-card class="new-text-card" shadow="hover">
      <div class="card-title">
        <span>记录点滴</span>
        <el-switch class="switch-public" v-model="isPublic" active-color="#13ce66" inactive-color="#ff4949" active-text="公开" inactive-text="私密" />
      </div>
      <el-input class="input-title" type="textarea" autosize placeholder="标题" v-model="title">
      </el-input>
      <el-input class="input-text" type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="内容" v-model="content">
      </el-input>
      <div class="card-tag">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
      </div>
      <div class="submit-button">
        <el-button type="danger" @click="deleteText" v-if="isEdit">删除</el-button>
        <el-button type="success" @click="submitText">{{buttonText}}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'EditCard',
    computed: {
      publicText() {
        return this.isPublic ? '公开' : '私密';
      },
      buttonText() {
        return this.isEdit ? '修改' : '发布'
      }
    },
    props: {
      rawData: {
        require: false
      }
    },
    data() {
      return {
        isEdit: false,
        nowTime: '',
        title: '',
        content: '',
        isPublic: true,
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
      }
    },
    methods: {

      submitText() {
        this.$emit('submit');
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      deleteText() {

      }
    },
    mounted() {
      if (this.rawData) {
        this.title = this.rawData.title
        this.content = this.rawData.content
        this.dynamicTags = this.rawData.tags
        this.isPublic = this.rawData.isPublic
        this.isEdit = true
      } else {
        this.title = this.$util.formatDate(new Date(), 'M月dd日')
        this.nowTime = this.$util.formatDate(new Date(), 'yyyy-M-dd hh:mm')
        setInterval(_ => {
          this.nowTime = this.$util.formatDate(new Date(), 'yyyy-M-dd hh:mm')
        }, 30000)
      }
    }
  }
</script>

<style lang="scss">
.edit-card{
  .new-text-card {
    margin-left: 28px;
    margin-bottom: 40px;
    text-align: left;
    .switch-public {
      vertical-align: middle;
      font-size: 15px;
      float: right;
    }
    .card-title {
      color: gray;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    .input-title {
      margin-bottom: 20px;
    }
    .input-text {
      font-size: 15px;
    }
    .card-tag {
      font-size: 14px;
      color: gray;
      margin: 15px 0;
    }
    .el-textarea__inner {
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .submit-button {
      text-align: right;
    }
  }
}
</style>