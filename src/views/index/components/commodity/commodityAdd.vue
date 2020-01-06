<style lang='scss' scoped>
@import "../../../../styles/public.scss";
.son-app {
    // height: 100vh;
    padding: 15px 25px;
    background: white;
    box-shadow: $box-shadow-base;
    border-radius: 3px;
}
.cell-box {
    min-height: 60px;
    @include displayCenter($justify-content: flex-start);
    .title {
        width: 90px;
    }
    .form {
        width: 250px;
    }
}
</style>

<template>
    <div class="son-app">
        <div class="cell-box">
            <div class="title">商品名</div>
            <div class="form">
                <el-input v-model="commodity.name" placeholder="请输入商品名"></el-input>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">商品类型</div>
            <div class="form">
                <el-select v-model="commodity.type" placeholder="请选择" style="width:250px;">
                    <el-option v-for="item in commodityType" :key="item.categoryName"
                     :label="item.categoryName" :value="item.categoryId">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">商品规格</div>
            <div class="form">
                <el-radio v-model="commodity.specs" label="0">斤</el-radio>
                <el-radio v-model="commodity.specs" label="1">个</el-radio>
                <el-radio v-model="commodity.specs" label="2">袋</el-radio>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">价格</div>
            <div class="form">
                <el-input v-model="commodity.price" placeholder="请输入价格"></el-input>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">库存</div>
            <div class="form">
                <el-input v-model="commodity.number" placeholder="请输入库存数量"></el-input>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">商品介绍</div>
            <div class="form">
                <el-input v-model="commodity.introduction" placeholder="请输入商品介绍"></el-input>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title">商品主图</div>
            <div class="form">
                <Cropper :width="width" :height="height" imgtype="Base" type="main"
                 v-on:datafromCropper="datafromCropper"></Cropper>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title">商品详情图</div>
            <div class="form">
                <!-- <Cropper :width="width" :height="height" imgtype="Base" type="detail"
                 v-on:datafromCropper="datafromCropper"></Cropper> -->
                 <el-upload
                class="upload-demo"
                action="http://localhost:8090"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title">加入热卖</div>
            <div class="form">
                <el-switch
                v-model="commodity.bestSellers"
                active-color="#13ce66"
                inactive-color="#dedede">
                </el-switch>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title">加入新品</div>
            <div class="form">
                <el-switch
                v-model="commodity.news"
                active-color="#13ce66"
                inactive-color="#dedede">
                </el-switch>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title">上架</div>
            <div class="form">
                <el-switch
                v-model="commodity.upperShelf"
                active-color="#13ce66"
                inactive-color="#dedede">
                </el-switch>
            </div>
        </div>
        <div class="cell-box" style="marin:0px;" >
            <div class="title"></div>
            <div class="form">
                <el-button type="primary" :loading="false" long
                 style="width:250px" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { insertFruits, categoryList } from '../../../../api/all';
import Cropper from '../../../../components/Cropper.vue';

export default {
    name: 'commodityAdd',
    data() {
        return {
            // 截图子组件宽高
            width: 200,
            height: 200,
            // 表单
            commodity: {
                name: null,            //商品名称
                type: null,            //商品类型
                price: null,           //商品价格
                number: null,          //商品库存数量
                introduction: null,    //商品介绍
                image: null,           //商品主图
                imageDetail: null,     //商品详情图
                specs: '0',           //商品规格
                bestSellers: false,    //是否加入热卖
                news: false,           //是否加入新品
                upperShelf: false,     //是否上架
            },
            commodityType: [],
            fileList: [
                {
                    name: '',
                    url: ''
                }
            ],
            // fileList: [
            //     {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
            //     {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            // ],
        };
    },
    created() { 
        categoryList({
            
        }).then((res) => {
            this.commodityType = res.data.data
        }).catch((err) => {
            console.log(err);
        });
    },
    mounted() { },
    methods: {
        submit() {
            insertFruits({
                productName: this.commodity.name,
                marketPrice: this.commodity.price,
                productTips: '促销信息',
                productDesc: this.commodity.introduction,
                categoryId: this.commodity.type,
                productStock: this.commodity.number,
                productUnit: this.commodity.specs,
                isHot: this.commodity.bestSellers ? 1 : 0,
                isNew: this.commodity.news ? 1 : 0,
                isSale: this.commodity.upperShelf ? 1 : 0,
                productImg: this.commodity.image,
                imgList: this.commodity.imageDetail,
            }).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        },
        datafromCropper(data) {
            console.log(data)
            const CropperInfo = data;
            this.commodity.image = CropperInfo;
        },
        // dataDetail(data) {
        //     console.log(data)
        //     const CropperInfo = data;
        //     this.commodity.imageDetail = CropperInfo;
        // },

        //上传详情图
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            console.log(files)
            console.log(fileList)
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            console.log(files)
            console.log(fileList)
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    },
    computed: {
    },
    watch: {},
    components: {
        Cropper
    },
};
</script>
