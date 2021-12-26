<template>
    <el-container>
        <el-button @click.native="back">返回首页</el-button>
    </el-container>
</template>
<script>

export default {
    name: "Study",
    data() {
        return {

        };
    },
    methods: {
        back(){
            this.$router.push('/')
        }
    }
};
</script>
