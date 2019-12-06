
<template>


        <div class="background">
        <v-card
            :color="brown"

          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  
                >Quem somos</v-card-title>

                <v-card-subtitle> Somos um bar e restaurante focado em trazer o melhor da gastronomia americana. Nosso objetivo é dar outro significado para o sentido de bar<br>
        Nossos hambúrgueres são 100% artesanais, com opções vegetarianas.<br>
 
 
            Nossa carta de bebidas conta com drinks de características peculiares e intensos sabores, nossas cervejas artesanais possuem sabores tanto leves quanto intensos, ideais para harmonizar com qualquer tipo de prato.<br> 
                Música todas as noites com o melhor do rock and roll, blues e folks.</v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                witdh="500"
                tile
              >
              </v-avatar>
            </div>
          </v-card>
        </div>
</template>

<style scoped>
    .background{
        background-color: brown;
        height: 250px;
    }

    .headline{
        margin: 5vw;
    }
</style>