<template>
    <el-container>
        <el-card
            class="exercise"
            v-for="item in exercises"
            :key="item.index"
        >
            <div style="margin-bottom: 20px">{{ item.title }}</div>
            <div>
                <el-button type="success" icon="el-icon-thumb" @click.native="study()" circle></el-button>
                <el-button type="primary" icon="el-icon-edit" @click.native="edit()" circle></el-button>
            </div>
        </el-card>
    </el-container>
</template>

<script>

export default {
    name: "Home",
    components: {},
    data() {
        return {
            exercises: [{
                index: 1,
                title: "Javascript科目二",
            }, {
                index: 2,
                title: "Javascript科目三",
            }, {
                index: 3,
                title: "Javascript科目四",
            }],
        };
    },
    methods: {
        study() {
            this.$router.push("/study");
        },
        edit() {
            this.$router.push('/edit-repository')
        }
    },
};
</script>

<style scoped>
.exercise {
    margin: 20px;
    cursor: pointer;
}
</style>
