<template>
    <div id="todo-container">
        <h1>To do</h1>
        <!-- Projects -->
        <div class="row project" v-for="project in projects" :key="project.id">
            <div class="col-12">
                <h2>{{ project.name }}</h2>
                <!-- Sections -->
                <div class="row section" v-for="section in getSectionsFromProject(project)" :key="section.id">
                    <div class="col-12">
                        <h4>{{ section.name }}</h4>
                        <!-- Tasks -->
                        <div class="row task" v-for="task in getTasksFromSection(section)" :key="task.id">
                            <div class="col-12">
                                <h6>{{ task.content }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../css/todo.css'

export default {
    name: 'Todo',
    data() {
        return {
            // Sample projects, sections and tasks.
            projects: [
                {
                    id: 2203306141,
                    name: "Shopping List",
                    comment_count: 10,
                    order: 1,
                    color: 47,
                    shared: false,
                    sync_id: 2203843926,
                    favorite: false,
                    parent_id: 220325187,
                    team_inbox: false,
                    inbox_project: false,
                    url: "https://todoist.com/showProject?id=2203306141&sync_id=2203843926"
                },
                {
                    id: 2203306140,
                    name: "Other Project",
                    comment_count: 10,
                    order: 2,
                    color: 47,
                    shared: false,
                    sync_id: 2203843926,
                    favorite: false,
                    parent_id: 220325187,
                    team_inbox: false,
                    inbox_project: false,
                    url: "https://todoist.com/showProject?id=2203306141&sync_id=2203843926"
                }
            ],
            sections: [
                {
                    id: 7025,
                    project_id: 2203306141,
                    order: 1,
                    name: "Groceries"
                },
                {
                    id: 7026,
                    project_id: 2203306140,
                    order: 1,
                    name: "Something Else"
                }
            ],
            tasks: [
                {
                    assignee: 2671142,
                    assigner: 2671362,
                    comment_count: 0,
                    completed: false,
                    content: "Buy Milk",
                    due: {
                        date: "2016-09-01",
                        datetime: "2016-09-01T11:00:00Z",
                        string: "2017-07-01 12:00",
                        timezone: "Europe/Lisbon"
                    },
                    id: 2995104339,
                    order: 1,
                    priority: 1,
                    project_id: 2203306141,
                    section_id: 7025,
                    parent_id: 2995104589,
                    url: "https://todoist.com/showTask?id=2995104339"
                },
                {
                    assignee: 2671142,
                    assigner: 2671362,
                    comment_count: 0,
                    completed: false,
                    content: "Buy Something",
                    due: {
                        date: "2016-09-01",
                        datetime: "2016-09-01T11:00:00Z",
                        string: "2017-07-01 12:00",
                        timezone: "Europe/Lisbon"
                    },
                    id: 2995104330,
                    order: 1,
                    priority: 1,
                    project_id: 2203306141,
                    section_id: 7026,
                    parent_id: 2995104589,
                    url: "https://todoist.com/showTask?id=2995104339"
                }
            ]
        }
    },
    methods: {
        getSectionsFromProject(project) {
            return this.sections.filter(s => s.project_id == project.id)
        },
        getTasksFromSection(section) {
            return this.tasks.filter(t => t.section_id == section.id);
        }
    }
}
</script>