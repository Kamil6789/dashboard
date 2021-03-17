<template>
    <div class="label">
        <span>
            <i class="fa fa-tag" aria-hidden="true" :style="{ color: color }"></i>
            {{ label.name }}
        </span>
    </div>
</template>

<script>
import labelColors from '../../utils/colors.js'

export default {
    name: 'TodoLabel',
    props: {
        label: Object
    },
    computed: {
        color() {
            return labelColors.find(color => color.id == this.label.color).color;
        }
    }
}
</script>