<template>
    <div class="message">
        <!-- <span @click="jump">messahe</span>     -->
        <div class="content">
            <h3>完善信息</h3>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form-input">
                <el-form-item label="店铺名称" prop="shopName">
                    <el-input v-model="form.shopName"></el-input>
                </el-form-item>
                <el-form-item label="店铺管理员姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺管理员手机号" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="店铺地址" prop="address">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="起送价格" prop="money">
                    <el-input v-model="form.money"></el-input>
                </el-form-item>
                <el-form-item label="店铺描述">
                    <el-input v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">确定</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                shopName: '',  //店铺名称
                name: '',      //店铺管理员姓名
                phone: '',     //店铺管理员手机号
                address: '',   //店铺地址
                money: '',     //起送费设置
                describe: ''   //店铺描述
            },
            rules: {
                shopName: [
                    { required: true, message: '请输入店铺名', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入店铺管理员姓名', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请输入店铺管理员手机号', trigger: 'change' }
                ],
                money: [
                    { required: true, message: '请输入店铺起送价格', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入店铺地址', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$router.push({
                        name: 'index',
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(form) {
            this.$refs[form].resetFields();
            this.form.describe = ''
        },
        // jump() {
        //     this.$router.push({
        //         name: 'index',
        //     });
        // }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../../styles/public.scss";
.message{
    width: 100vw;
    height: 100vh;
    background-color: #02b3b3;
    padding-top: 100px;
    .content{
        width: 500px;
        min-height: 350px;
        background-color: #fff;
        margin: 0 auto;
        border-radius: 5%;
        h3{
            text-align: center;
            font-size: 24px;
            padding-top: 20px;
        }
        .form-input{
            padding: 0 30px;
            padding-bottom: 30px;
        }
    }
}
</style>
<style lang="scss">
.el-form-item__content{
    margin-left: 0 !important;
}
.el-form-item__label{
    width: 150px !important;
    text-align: left;
}
</style>