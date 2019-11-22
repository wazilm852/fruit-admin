<style lang='scss' scoped>
@import "../../../../styles/public.scss";
.son-app {
    height: 100vh;
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
                    <el-option v-for="item in commodityType" :key="item.label"
                     :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="cell-box">
            <div class="title">商品规格</div>
            <div class="form">
                <el-radio v-model="commodity.specs" label="斤">斤</el-radio>
                <el-radio v-model="commodity.specs" label="个">个</el-radio>
                <el-radio v-model="commodity.specs" label="袋">袋</el-radio>
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
                <Cropper :width="width" :height="height" imgtype="Base" type="detail"
                 v-on:datafromCropper="datafromCropper"></Cropper>
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
import { insertFruits } from '../../../../api/all';
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
                name: null, //商品名称
                type: null, //商品类型
                price: null,  //商品价格
                number: null, //商品库存数量
                introduction: null, //商品介绍
                image: null,    //商品主图
                imageDetail: null,     //商品详情图
                specs: '斤', //商品规格
                bestSellers: false, //是否加入热卖
                news: false, //是否加入新品
                upperShelf: false, //是否上架
            },
            commodityType: [
                {
                    label: '柑橘',
                },
                {
                    label: '核果',
                },
                {
                    label: '浆果',
                },
                {
                    label: '仁果',
                },
                {
                    label: '瓜果',
                },
                {
                    label: '干果',
                },
                {
                    label: '其他',
                }
            ],
            
        };
    },
    created() { },
    mounted() { },
    methods: {
        submit() {
            // console.log(this.commodity);
            insertFruits(this.commodity).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        },
        datafromCropper(data) {
            const CropperInfo = data;
            this.commodity.image = CropperInfo;
        },
        dataDetail(data) {
            console.log(data)
            const CropperInfo = data;
            this.commodity.imageDetail = CropperInfo;
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
