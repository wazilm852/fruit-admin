<template>
    <div class="addShopsType">
        <el-tag
        :key="tag.categoryName"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag.categoryName)">
        {{tag.categoryName}}
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
import { categoryList, addFruitCategory } from '../../../../api/all';
export default {
    data() {
        return {
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    created() {
        this.category()
    },
    methods: {
        category() {
            categoryList({
            
            }).then((res) => {
                this.dynamicTags = res.data.data
            }).catch((err) => {
                console.log(err);
                
            });
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
            console.log(this.inputValue)

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
                // this.dynamicTags.push(inputValue);
                addFruitCategory({
                    categoryName: inputValue,
                    isShow: 1
                }).then((res) => {
                    console.log(res)
                    if(res.data.code == 200) {
                        this.$message.success('添加成功');
                        this.category()
                    }
                }).catch((err) => {
                    console.log(err)
                })
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