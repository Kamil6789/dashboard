<template>
    <div class="row project">
        <div class="col-12">
            <h2><b>{{ project.name }}</b></h2>
            <!-- Tasks without section -->
            <TodoTask v-for="task in getTasksWithoutSection(project)" :key="task.id" :task="task" :hasSection="false" :isSubtask="false" />
            <!-- Sections -->
            <TodoSection v-for="section in getSectionsFromProject(project)" :key="section.id" :section="section" />
        </div>
    </div>
</template>

<script>
import TodoTask from './TodoTask.vue'
import TodoSection from './TodoSection.vue'

export default {
    name: 'TodoProject',
    components: {
        TodoTask,
        TodoSection
    },
    props: {
        project: Object
    },
    methods: {
        getTasksWithoutSection(project) {
            return this.$parent.getTasksWithoutSection(project);
        },
        getSectionsFromProject(project) {
            return this.$parent.getSectionsFromProject(project);
        }
    }
}
</script>