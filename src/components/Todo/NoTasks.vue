<template>
    <div class="no-tasks">
        <v-icon size="100" color="primary">
            mdi-check
        </v-icon>
        <div class="text-h5 primary--text">No Tasks</div>
    </div>
</template>

<style scoped>
.no-tasks {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 50%;
}
</style>
<!--transform: translate(-50%, -50%); says moves 50% percent backwrds on x-axis and y-axis-->