<template>
    <div class="addShopsType">
        <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
        </el-tag>
        <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加种类</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dynamicTags: ['干果', '瓜果', '仁果'],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
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
            let flag = false
            for(let i = 0; i < this.dynamicTags.length; i ++){
                if(inputValue == this.dynamicTags[i]) {
                    flag = false
                    break;
                } else {
                    flag = true
                }
            }
            if (flag) {
                this.dynamicTags.push(inputValue);
            } else {
                this.$message({
                message: '该类别已存在，请勿重复添加',
                    type: 'error'
                });
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
}
</script>
<style lang="scss" scoped>
.addShopsType{
    width: 100%;
    height: 100%;
    .el-tag + .el-tag {
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
}
</style>
<style lang="scss">
.el-dialog__body{
    padding: 30px;
    padding: 30px 50px;
}
</style>