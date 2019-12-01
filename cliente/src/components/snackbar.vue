<template>
    <div class="text-center">
        <v-snackbar v-model="snackbar" class="white--text" :timeout="timeout" :color="color">
            {{ message }}
            <v-btn dark text @click="snackbar = false" class="white--text">Close</v-btn>
        </v-snackbar>
    </div>
</template>
