<template>
    <div style="text-align: left; padding: 30px">
        <el-header>
            <el-button @click.native="back" style="margin-right: 20px">返回首页</el-button>
            <span style="font-size: 20px;font-weight: bold">{{ this.exercise.title }}</span>
        </el-header>
        <el-divider></el-divider>
        <div class="title">{{ problem.showTitle }}</div>
        <div v-if="!problem.type">
            <el-radio-group v-model="problem.selected">
                <el-row
                    v-for="(item,index) in problem.options"
                    :key="item.title"
                >
                    <el-checkbox class="options">
                        {{ String.fromCharCode(index + 65) + "、" + item.title }}
                    </el-checkbox>
                </el-row>
            </el-radio-group>
        </div>
        <div v-else>
            <el-radio-group v-model="problem.multipleSelected">
                <el-row
                    v-for="(item,index) in problem.options"
                    :key="item.title"
                >
                    <el-radio
                        class="options"
                        aria-selected="false"
                        :label="String.fromCharCode(index + 65) + '、'+ item.title"
                    >
                    </el-radio>
                </el-row>

            </el-radio-group>
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
                selected: "",
                multipleSelected: [],
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
        submit() {
            console.log({selected: this.problem.selected,multipleSelected: this.problem.multipleSelected})
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
}
</style>
