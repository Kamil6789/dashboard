<template>
    <div class="row section">
        <div class="col-12">
            <h4>{{ section.name }}</h4>
            <!-- Tasks -->
            <TodoTask v-for="task in getTasksFromSection(section)" :key="task.id" :task="task" :hasSection="true" :isSubtask="false" />
        </div>
    </div>
</template>

<script>
import TodoTask from './TodoTask.vue'

export default {
    name: 'TodoSection',
    components: {
        TodoTask
    },
    props: {
        section: Object
    },
    methods: {
        getTasksFromSection(section) {
            return this.$parent.$parent.getTasksFromSection(section);
        }
    }
}
</script>