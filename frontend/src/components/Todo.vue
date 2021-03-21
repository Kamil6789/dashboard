<template>
    <section id="todo-body" class="row">
        <div class="col-12">
            <!-- Container with tasks -->
            <div id="todo-container" class="row">
                <div class="col-12">
                    <h1>Do zrobienia</h1>
                    <!-- Projects -->
                    <TodoProject v-for="project in getLoadedProjects()" :key="project.id" :project="project" @selected="select" />
                    <Loader v-if="loading" class="mb-5" color="#ffffffca" />
                </div>
            </div>
            <!-- Task details -->
            <div id="task-details" class="row" v-if="selected != 0">
                <div class="col-12">
                    <h2>{{ getTaskByID(selected).content }}</h2>
                    <p>
                        <span>
                            Dodano:
                            {{ new Date(getTaskByID(selected).created).toLocaleString("pl-PL") }}
                        </span>
                        <br>
                        <span v-if="getTaskDeadline(getTaskByID(selected))">
                            Termin:
                            {{ getTaskDeadline(getTaskByID(selected)) }}
                        </span>
                        <br v-if="getTaskDeadline(getTaskByID(selected))">
                        <span>
                            Priorytet:
                            <i class="fa fa-flag align-middle" aria-hidden="true" :style="{ color: getPriorityColor(getTaskByID(selected)) }"></i>
                        </span>
                    </p>
                    <!-- Subtasks -->
                    <div v-if="hasSubtasks(getTaskByID(selected))">
                        <h4>Pod-zadania:</h4>
                        <TodoTask v-for="task in getSubtasks(getTaskByID(selected))" :key="task.id" :task="task" :hasSection="false" :isSubtask="true" @selected="select" />
                    </div>
                    <!-- Comments -->
                    <div v-if="getTaskByID(selected).comment_count > 0">
                        <h4>Komentarze:</h4>
                        <TodoComment v-for="comment in getCommentsFromTask(getTaskByID(selected))" :key="comment.id" :comment="comment" />
                    </div>
                    <!-- Labels -->
                    <div v-if="getTaskByID(selected).label_ids.length > 0">
                        <h4>Etykiety:</h4>
                        <TodoLabel v-for="label in getLabelsFromTask(getTaskByID(selected))" :key="label.id" :label="label" />
                    </div>
                    <!-- Close details -->
                    <div id="close-details" @click="selected = 0" title="Zamknij szczegóły">
                        <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TodoComment from './Todo/TodoComment.vue'
import TodoLabel from './Todo/TodoLabel.vue'
import TodoTask from './Todo/TodoTask.vue'
import TodoProject from './Todo/TodoProject.vue'

import {BeatLoader} from '@saeris/vue-spinners'

import '../css/todo.css'
import axios from 'axios'

import {priorities} from '../utils/colors.js'

export default {
    name: 'Todo',
    components: {
        TodoComment,
        TodoLabel,
        TodoTask,
        TodoProject,
        'Loader': BeatLoader
    },
    data() {
        return {
            loading: true,
            selected: 0,
            projects: [],
            sections: [],
            tasks: [],
            comments: [],
            labels: []
        }
    },
    methods: {
        // Todoist API
        getProjects: async function () {
            const response = await axios.get(`/api/todo/projects`);
            return response.data.data;
        },
        getSections: async function () {
            let sections = [];
            this.projects.forEach(async project => {
                const response = await axios.get(`/api/todo/sections?id=${project.id}`);
                response.data.data.forEach(section => {
                    sections.push(section);
                });
            });

            return sections;
        },
        getTasks: async function () {
            const response = await axios.get(`/api/todo/tasks`);
            return response.data.data;
        },
        getComments: async function () {
            let comments = [];
            const tasks = await this.getTasks();
            tasks.forEach(async task => {
                if (task.comment_count > 0) {
                    const response = await axios.get(`/api/todo/comments?id=${task.id}`);
                    response.data.data.forEach(comment => {
                        comments.push(comment);
                    });
                }
            });

            return comments;
        },
        getLabels: async function () {
            const response = await axios.get(`/api/todo/labels`);
            return response.data.data;
        },

        // Other methods
        getLoadedProjects() {
            return this.loading ? null : this.projects;
        },
        getSectionsFromProject(project) {
            return this.sections.filter(s => s.project_id == project.id)
        },
        getTasksFromSection(section) {
            return this.tasks.filter(t => t.section_id == section.id && !this.isSubtask(t));
        },
        getTasksWithoutSection(project) {
            return this.tasks.filter(t => t.project_id == project.id && !t.section_id && !this.isSubtask(t));
        },
        getTaskByID(id) {
            return this.tasks.find(t => t.id == id);
        },
        getTaskDeadline(task) {
            if (task.due) {
                if (task.due.datetime) {
                    return new Date(task.due.datetime).toLocaleString("pl-PL");
                }
                else {
                    return new Date(task.due.date).toLocaleString("pl-PL").split(",")[0];
                }
            }
            else {
                return null;
            }
        },
        getCommentsFromTask(task) {
            const comments = this.comments.filter(comment => comment.task_id == task.id);
            return comments;
        },
        getLabelsFromTask(task) {
            const labels = this.labels.filter(label => task.label_ids.includes(label.id));
            return labels;
        },
        getPriorityColor(task) {
            return priorities.find(color => color.id == task.priority).color;
        },
        getSubtasks(task) {
            let subtasks = [];
            this.tasks.filter(t => {
                if (t.parent_id == task.id) {
                    subtasks.push(t);
                }
            });

            return subtasks;
        },
        hasSubtasks(task) {
            return this.getSubtasks(task).length > 0;
        },
        isSubtask(task) {
            const foundTask = this.getTaskByID(task.id);
            return foundTask.parent_id != undefined;
        },
        sortData() {
            // Remove projects without any tasks
            let projects = [];
            this.projects.forEach(project => {
                let hasTasks = false;
                this.tasks.forEach(task => {
                    if (task.project_id == project.id) {
                        hasTasks = true;
                    }
                });

                if (hasTasks) {
                    projects.push(project);
                }
            });
            
            this.projects = projects;

            // Remove sections without any tasks
            let sections = [];
            this.sections.forEach(section => {
                let hasTasks = false;
                this.tasks.forEach(task => {
                    if (task.section_id == section.id) {
                        hasTasks = true;
                    }
                });

                if (hasTasks) {
                    sections.push(section);
                }
            });

            this.sections = sections;

            // Sort projects in their correct order
            this.projects.sort((a, b) => (a.order > b.order) ? 1 : -1);

            // Sort sections in their correct order
            this.sections.sort((a, b) => (a.order > b.order) ? 1 : -1);

            // Sort tasks in their correct order
            this.tasks.sort((a, b) => (a.order > b.order) ? 1 : -1);

            // Sort comments by date
            this.comments.sort((a, b) => (new Date(b.posted) - new Date(a.posted)));

            // Sort labels in their correct order
            this.labels.sort((a, b) => (a.order > b.order) ? 1 : -1);
        },
        select(id) {
            this.selected = id;
        }
    },
    created: async function() {
        this.projects = await this.getProjects();
        this.sections = await this.getSections();
        this.tasks = await this.getTasks();
        this.comments = await this.getComments();
        this.labels = await this.getLabels();
        this.sortData();
        this.loading = false;
    }
}
</script>