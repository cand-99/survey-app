<template >
     <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
       
        <slot name="header"> </slot>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
       <slot> </slot>
      </div>
    </main>
</template>

<script setup>

const props = defineProps({
    title: String
})

</script>

<style lang="scss" scoped>

</style>