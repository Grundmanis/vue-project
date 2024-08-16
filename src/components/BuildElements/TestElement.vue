<script setup lang="ts">
  import BoxElement from './BoxElement.vue';
  import TextElement from './TextElement.vue';
</script>

<script lang="ts">
export default {
    props: {
        id: {
            type: Number,
            // required: true
        }
    },
    data() {
        return {
            props: {
                // id: this.id,
                // className: "b-test",
                // tag: "div",
                // styles: {
                //     border: "1px solid red",
                //     backgroundColor: "#333",
                //     height: "100px",
                // },
            }
        };
    },
    components: { BoxElement }
}
</script>

<template>
    <BoxElement>
        <TextElement text="Hello from the other side" />
    </BoxElement>
</template>
