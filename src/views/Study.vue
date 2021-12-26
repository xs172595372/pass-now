<template>
    <div style="text-align: left; padding: 30px">

        <el-header>
            <el-button @click.native="back" style="margin-right: 20px">返回首页</el-button>
            <span style="font-size: 20px;font-weight: bold">{{this.exercise.title}}</span>
        </el-header>
        <el-divider></el-divider>
        <div class="title">{{ problem.showTitle }}</div>

        <div class="options" v-for="(item,index) in problem.options" :key="item.title">
            {{ String.fromCharCode(index + 65) + "、" + item.title }}
        </div>

        <div style="margin-top: 30px">
            <el-button type="primary" @click="submit">提交答案</el-button>
            <el-button @click="next">下一题</el-button>
        </div>
    </div>
</template>

<script>
import Store from "electron-store";

export default {
    name: "Study",
    data() {
        return {
            store: new Store(),
            problem: {
                options: [],
            },
        };
    },
    created() {
        this.exercise = this.store.get("exercises").find(item => item.id === this.$route.params.id);

        if (this.exercise.problems.length === 0) {
            this.$message({
                showClose: true,
                message: "请先添加题目",
                type: "error",
                duration: 3000,
            });
        }
        this.problem = this.exercise.problems[Math.floor(Math.random() * this.exercise.problems.length)];
        this.problem.showTitle = "【" + (this.problem.type ? "单选" : "多选") + "】" + this.problem.title;
    },
    methods: {
        submit(){

        },
        next() {
            this.problem = this.exercise.problems[Math.floor(Math.random() * this.exercise.problems.length)];
            this.problem.showTitle = "【" + (this.problem.type ? "单选" : "多选") + "】" + this.problem.title;
        },
        back: function() {
            this.$router.back();
        },
    },
};
</script>

<style scoped>
.title {
    font-weight: bold;
    font-size: 22px;
    line-height: 50px;
}

.options {
    font-size: 20px;
    margin-top: 30px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
