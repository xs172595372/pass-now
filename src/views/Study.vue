<template>
    <div style="text-align: left; padding: 30px">
        <el-header>
            <el-button @click.native="back" style="margin-right: 20px">返回首页</el-button>
            <span style="font-size: 20px;font-weight: bold">{{ this.exercise.title }}</span>
        </el-header>
        <el-divider></el-divider>
        <span class="title">{{ problem.showTitle }}</span>
        <el-form v-model="problem">
            <el-form-item v-if="!problem.type">
                <el-row v-for="(item,index) in problem.options" :key="item.title">
                    <el-checkbox
                        @change="multipleSelectedChange(index)"
                        class="options"
                        :label="String.fromCharCode(index + 65) + '、' + item.title"
                    >
                    </el-checkbox>
                </el-row>
            </el-form-item>
            <el-form-item v-else>
                <el-radio-group v-model="selected">
                    <el-row v-for="(item,index) in problem.options" :key="item.title">
                        <el-radio class="options" :label="index">
                            {{ String.fromCharCode(index + 65) + "、" + item.title }}
                        </el-radio>
                    </el-row>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div style="margin-top: 30px">
            <el-button type="primary" @click="submit" v-if="!problem.type">提交答案</el-button>
            <el-button @click="next">下一题</el-button>
        </div>

        <div v-show="hasSubmit" style="margin-top: 20px">
            <div v-if="correct" style="color: green">
                回答正确!
            </div>
            <div v-else style="color: red">
                回答错误，正确答案：{{ answer }}
            </div>
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
            multipleSelected: [],
            selected: "",
            correct: true,
            answer: "",
            hasSubmit: false,
        };
    },
    created() {
        this.exercise = this.store.get("exercises").find(item => item.id === this.$route.params.id);
        if (this.exercise.problems.length === 0) {
            this.$message({
                showClose: true,
                message: "请先添加题目",
                type: "error",
                duration: 1000,
            });
            this.back();
            return;
        }
        this.next();
        document.onkeydown = () => {

        };
    },
    watch: {
        selected() {
            if (this.selected !== "") {
                this.submit();
            }
        },
    },
    methods: {
        multipleSelectedChange(index) {
            let selected = this.multipleSelected;
            if (!selected.includes(index)) {
                selected.push(index);
            } else {
                selected.splice(selected.indexOf(index), 1);
            }
        },
        submit() {
            if ((this.problem.type && this.selected === "") || (!this.problem.type && !this.multipleSelected.length)) {
                this.$message({
                    showClose: true,
                    message: "请选择答案！",
                    type: "error",
                    duration: 1000,
                });
                return;
            }
            this.correct = true;
            this.answer = this.problem.options.map((item, index) => {
                return item.isAnswer && String.fromCharCode(index + 65);
            }).filter(item => {
                return item;
            }).join(" ");
            this.hasSubmit = true;
            if (this.problem.type) {
                this.correct = this.problem.options[this.selected].isAnswer;
            } else {
                this.multipleSelected.forEach(item => {
                    if (!this.problem.options[item].isAnswer) {
                        this.correct = false;
                    }
                });
                this.problem.options.forEach((item, index) => {
                    if (item.isAnswer) {
                        if (!this.multipleSelected.includes(index)) {
                            this.correct = false;
                        }
                    }
                });
            }
        },
        next() {
            const randArr = this.exercise.problems.filter(item => item.title !== this.problem.title);
            this.problem = randArr[Math.floor(Math.random() * randArr.length)];
            this.problem.showTitle = "【" + (this.problem.type ? "单选" : "多选") + "】" + this.problem.title;
            this.hasSubmit = false;
            this.correct = true;
            this.selected = "";
            this.multipleSelected = [];
            console.log(this.problem);
        },
        back: function() {
            this.$router.back();
        },
    },
};
</script>

<style scoped>
.title {
    font-size: 18px;
}

.options {
    font-size: 18px;
    margin-top: 30px;
    margin-left: 10px;
}
</style>
