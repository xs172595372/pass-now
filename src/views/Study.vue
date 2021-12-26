<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" v-on:click="add_new_connection"></el-button>
    </div>
</template>

<script>
import Store from "electron-store";

export default {
    name: "HeaderTool",
    props: {
        msg: String,
    },
    methods: {
        add_new_connection: function() {
            const store = new Store();
            // 存储信息
            store.set("foo", "bar");
            console.log(store.get("foo"));
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
