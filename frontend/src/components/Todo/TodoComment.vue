<template>
    <div class="comment">
        <p>
            {{ comment.content }}
            <br>
            {{ new Date(comment.posted).toLocaleString("pl-PL") }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'TodoComment',
    props: {
        comment: Object
    }
}
</script>