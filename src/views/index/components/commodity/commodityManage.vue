<style lang='scss' scoped>
@import "../../../../styles/public.scss";
.son-app {
    height:100vh;
    padding:20px;
    background: white;
    box-shadow: $box-shadow-base;
    border-radius: 3px;
    .commodity-layout {
        height: 300px;
        .table-box{
            padding-top:20px;
        }
        .paging-box{
            padding-top:20px;
            @include displayCenter();
        }
    }
}
.table {
    width:100%;
}
</style>

<template>
    <div class="son-app">
        <!-- 选项区域 -->
        <!-- <userGroupSelect></userGroupSelect> -->
        <div class="commodity-layout">
            <div>
                <el-button type="primary" @click="goTocommodityAdd">添加商品</el-button>
                <el-button type="primary" @click="goTOaddShopsType">商品分类</el-button>
            </div>
            <div class="table-box">
                <el-table :data="fruitsList" stripe border class="table">
                    <el-table-column prop="productName" label="商品名" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="productDesc" label="商品种类" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="shopPrice" label="商品价格" min-width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="productTips" label='商品介绍' min-width="150"
                    align="center" >
                    </el-table-column>
                    <el-table-column prop="productImg" label="商品图片"  min-width="50" align="center" >
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" placement="left">
                            <el-button type="text">查看图片</el-button>
                            <img slot="content" v-bind:src="scope.row.productImg" />
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作"  min-width="90" align="center">
                         <template slot-scope="scope">
                             <el-button size="mini" type="warning"
                             @click="clickModify(scope.$index, scope.row)">修改</el-button>
                             <el-button size="mini" type="danger"
                             @click="clickDelete(scope.$index, scope.row)">删除</el-button>
                         </template>
                    </el-table-column>
                </el-table>
                <!-- 修改弹框 -->
                <el-dialog
                title="修改"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类型" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品介绍" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="加入热卖" prop="sellers">
                            <el-switch v-model="ruleForm.sellers"></el-switch>
                        </el-form-item>
                        <el-form-item label="加入新品" prop="newShop">
                            <el-switch v-model="ruleForm.newShop"></el-switch>
                        </el-form-item>
                        <el-form-item label="上架" prop="show">
                            <el-switch v-model="ruleForm.show"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重 置</el-button>
                            <el-button @click="dialogVisible = false">取 消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
            <div class="paging-box">
                <el-pagination background layout="prev, pager, next" :page-size="pageSize"
                 :total="totalCount" :current-page="currentPage" @current-change="changePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getFruitsList, deleteFruits } from '../../../../api/all';

export default {
    name: 'commodityManage',
    data() {
        return {
            pageSize: 10,
            totalCount: 0,
            currentPage: 0,
            fruitsList: [],
            dialogVisible: false,  //修改弹框
            ruleForm: {
                name: '',
                region: '',
                price: '',
                desc: '',
                sellers: false,
                newShop: false,
                show: false,
            },
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写商品介绍', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.getData(10, 1);
    },
    mounted() { },
    methods: {
        getData(pageSize, currentPage) {
            getFruitsList({
                pageNum: currentPage,
                pageSize: pageSize
            }).then((res) => {
                console.log(res);
                if(res.data.code == 200) {
                    this.fruitsList = res.data.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        goTocommodityAdd() {
            this.$router.push({
                name: 'commodityAdd',
            });
        },
        goTOaddShopsType() {
            this.$router.push({
                name: 'addShopsType'
            })
        },
        clickModify(index, row) {
            this.dialogVisible = true
            console.log(index, row);
        },
        clickDelete(index, row) {
            console.log(index, row);
            this.$confirm('确认要删除该商品吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 删除商品接口
                console.log(row.pkId);
                deleteFruits(row.pkId).then((res) => {
                    console.log(res.data);
                    if (res) {
                        this.fruitsList.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    if (err) {
                        this.$message({
                            type: 'errow',
                            message: '删除失败!',
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        changePage(e) {
            this.getData(10, e);
        },
        // 修改弹框
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$message.success('修改成功');
                this.dialogVisible = false
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    computed: {},
    watch: {},
    components: {
    },
};
</script>
