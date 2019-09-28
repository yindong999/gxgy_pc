<template>
    <div class="home">
        <el-container>
            <el-header height="50px" class="bigHeader">
                <el-row>
                    <el-col :span="20"><div>运营分析平台</div><div><i class="el-icon-s-fold"></i>欢迎进入国信运营数据分析平台</div></el-col>
                    <el-col :span="4"><div><i class="el-icon-user"></i>欢迎您,管理员</div><div><i class="el-icon-close"></i>退出登陆</div></el-col>
                </el-row>
            </el-header>
            <el-container class="container">
                <el-aside width="200px">
                    <el-row @click.native="dataScreening()" :class="[flag=='dataScreening'?'active':'']"><i class="el-icon-data-analysis"></i>数据总览</el-row>
                    <el-row @click.native="userData()" :class="[flag=='userData'?'active':'']"><i class="el-icon-user"></i>用户数据</el-row>
                    <el-row @click.native="drugAnalyse()" :class="[flag=='drugAnalyse'?'active':'']"><i class="el-icon-odometer"></i>药品分析</el-row>
                    <el-row><i class="el-icon-chat-dot-square"></i>评价分析</el-row>
                </el-aside>
                <el-main class=main>
                    <el-header>
                        <el-row>
                            <el-col :span="2" @click.native="dataScreening()" :class="[flag=='dataScreening'?'active':'']">数据总览</el-col>
                            <el-col :span="2" @click.native="userData()" :class="[flag=='userData'?'active':'']">用户数据</el-col>
                            <el-col :span="2" @click.native="drugAnalyse()" :class="[flag=='drugAnalyse'?'active':'']">药品分析</el-col>
                            <el-col :span="2">评价分析</el-col>                            
                        </el-row>
                    </el-header>
                    <iframe :src="address" frameborder="0"></iframe>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default{
    data(){
        return{
            flag:"dataScreening",                                                              //控制菜单选项样式
            address:"http://114.116.78.65:8082/bjqd/#/dataScreening"                           //加载的在线地址
        }
    },
    methods:{
        dataScreening(){
            this.flag = "dataScreening";
            this.address = "http://114.116.78.65:8082/bjqd/#/dataScreening"
        },
        userData(){
            this.flag = "userData";
            this.address = "http://114.116.78.65:8082/bjqd/#/userData"
        },
        drugAnalyse(){
            this.flag = "drugAnalyse";
            this.address = "http://114.116.78.65:8082/bjqd/#/drugAnalyse"
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .home{
        background:#fff;
        .el-container{
            width:100%;
            .bigHeader{
                width:100%;
                padding:0;
                background:#409EFF;
                .el-row{
                    width:100%;
                    display:flex;
                    justify-content: space-between;
                    height:50px;
                    align-items: center;
                    .el-col{
                        display:flex;
                        color:#fff;
                        &:first-child{
                            div:first-child{
                                margin-left:20px;
                                margin-right:100px;
                            }
                            div:last-child{
                                i{
                                    margin-right:15px;
                                }
                            }
                        }
                         &:last-child{
                            i{
                                margin-right:5px;
                            }
                             div:last-child{
                                 margin-left:20px;
                             }
                         }
                    }
                }
            };
            .container{
                height:790px;
                overflow: hidden;
                .el-aside{
                    .el-row{
                        &.active{
                            color:#409EFF;
                        }
                        height:30px;
                        margin:20px 30px;
                        font-size:16px;
                        i{
                            margin-right:15px;
                        }
                        &:first-child{
                            margin-top:60px;
                        }
                    }
                }
                .main{
                    padding:0;
                    overflow: hidden;
                    height:800px;
                    .el-header{
                        padding:0;
                        display:flex;
                        align-items: center;
                        .el-row{
                            display:flex;
                            width:100%;
                            height: 100%;
                            .el-col{
                                text-align: center;
                                height:100%;
                                border-bottom:3px solid #fff;
                                line-height: 60px;
                                &.active{
                                    border-color:#409EFF;
                                    color:#409EFF;
                                }
                            }
                        }
                    }
                }
                iframe{
                    width:100%;
                    height:730px;
                }
            }
        }
    }
</style>  