<template>
    <div style="text-align: left; padding: 30px">
        <div class="title">{{ problem.showTitle }}</div>

        <div class="options" v-for="(item,index) in problem.options" :key="item.title">
            {{ String.fromCharCode(index + 65) + "、" + item.title }}
        </div>

        <el-button @click.native="back">返回首页</el-button>
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
        back: function() {
            this.$router.back();
        },
    },
};
</script>

<style scoped>
.title {
    font-weight: bold;
    font-size: 20px;
    line-height: 40px;
}

.options {
    font-size: 18px;
    line-height: 30px;
}
</style>
