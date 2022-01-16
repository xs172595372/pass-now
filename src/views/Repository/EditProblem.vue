<template>
    <el-dialog
        title="编辑题目"
        width="50%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :visible.sync="show">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="text-align: left">
            <el-form-item label="id" hidden>
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="题干" prop="title">
                <el-input type="textarea" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="选项" prop="optionsText">
                <el-input type="textarea" v-model="form.optionsText" @input="optionsChanged" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="答案" prop="answer">
                <el-select v-model="form.answer" multiple>
                    <el-option v-for="item in form.options" :key="item.title"
                               :value="item.title"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button type="primary" @click="save()">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: "EditProblem",
    props: {
        visible: {
            required: true,
            type: Boolean,
        },
        problem: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            form: {},
            show: false,
            rules: {
                title: [
                    { required: true, message: "请输入题干", trigger: "blur" },
                ],
                optionsText: [
                    { required: true, message: "请输入选项", trigger: "blur" },
                ],
                answer: [
                    { required: true, message: "请选择答案", trigger: "blur" },
                ],
            },
        };
    },
    watch: {
        problem(val) {
            this.form = val;
        },
        visible(val) {
            this.show = val;
        },
    },
    methods: {
        optionsChanged(val) {
            let options = val.split("\n");
            this.form.options = [];
            options.forEach(item => {
                this.form.options.push({ title: item, isAnswer: false });
            });
        },
        save() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    this.form.options.forEach(option => {
                        this.form.answer.forEach(item => {
                            if (option.title === item) {
                                option.isAnswer = true;
                            }
                        });
                    });
                    this.$emit("save", this.form);
                    this.close();
                }
            });

        },
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>

</style>
