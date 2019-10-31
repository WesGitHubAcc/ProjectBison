<template>

    <v-app-bar
     style="background-color:rgba(18, 22, 26, 0.87);"
        dark
        dense
        fixed="true"
        width="100%"
    >
      <v-toolbar-title style="color:rgb(170, 92, 170);">CYBERPUNK</v-toolbar-title>
      
      <v-spacer ></v-spacer>

      <v-toolbar-items>
        <v-btn text :color="coor">Home</v-btn>
        <v-btn text>Eventos</v-btn>
        <v-btn text>Cardapio</v-btn>
        <v-btn text>Reservas</v-btn>
        <v-btn text>Sobre</v-btn>
      </v-toolbar-items>

    </v-app-bar>

</template>

<style scoped>

    .theme--dark.v-sheet{
      background: none;
    }
</style>

<script>
export default {
  data: () => ({
    coor: 'rgb(170, 92, 170)'
  })
}
</script>