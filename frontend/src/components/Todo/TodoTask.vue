<template>
    <a href="#task-details" class="row task" @click="select">
        <div class="col-12">
            <p>{{ task.content }}</p>
        </div>
    </a>
</template>

<script>
export default {
    name: 'TodoTask',
    props: {
        task: Object,
        hasSection: Boolean,
        isSubtask: Boolean
    },
    methods: {
        select() {
            if (this.isSubtask) {
                this.$emit("selected", this.task.id);
            }
            else {
                if (this.hasSection) {
                    this.$parent.$parent.$emit("selected", this.task.id);
                }
                else {
                    this.$parent.$emit("selected", this.task.id);
                }
            }
        }
    }
}
</script>