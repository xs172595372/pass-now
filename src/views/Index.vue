<template>
    <el-container>
        <el-card
            class="exercise"
            v-for="item in exercises"
            :key="item.index"
            @click.native="enter()"
            @contextmenu.prevent.native="show()"
        >
            {{ item.title }}
        </el-card>
        <el-popover
            v-show="visible">

        </el-popover>
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
            visible: false,
        };
    },
    methods: {
        enter() {
            this.$router.push("/detail");
        },
        show() {
            this.visible = true;
        },
    },
};
</script>

<style scoped>
.exercise {
    margin: 20px;
    cursor: pointer;
}
</style>
