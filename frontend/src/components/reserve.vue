<template>

<v-row id="background" justify="center">
    <v-dialog v-model="reserva" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#a52a2a" x-large class="ma-10 white--text" min-width="30vh" dark v-on="on">Reserve Agora</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Formulário Reserva</span>
        </v-card-title>
        <v-card-text>
          <v-container>
                <v-row>

<!--======================Campos formulario ===================================-->

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Nome" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Sobrenome" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="CPF" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Telefone" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field type="number" label="Nº pessoas" required></v-text-field>
                    </v-col>

<!--=========================Botão Data =======================================-->

                    <v-col cols="12" sm="6" md="4">
                        <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            v-model="date"
                            label="Data"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                        </v-date-picker>
                        </v-menu>
                    </v-col>

<!--===========================================================================-->
                </v-row>
          </v-container>
          <small>*Regras da Reserva</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reserva = false">Sair</v-btn>
          <v-btn color="blue darken-1" text @click="reserva = false">Salvar</v-btn>
        </v-card-actions>

      </v-card> 
    </v-dialog>

<!--============================CONSULTA RESERVA================================-->

    <v-dialog v-model="consulta" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="#a52a2a" x-large class="ma-10 white--text" min-width="30vh" dark v-on="on">Consultar Reserva</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Formulário Consulta</span>
        </v-card-title>
        <v-card-text>
          <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field label="Digite aqui o cpf" required></v-text-field>
                    </v-col>
                </v-row>
          </v-container>
          <small>*Regras da Reserva</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="consulta = false">Sair</v-btn>
          <v-btn color="blue darken-1" text @click="consulta = false">Consultar</v-btn>
        </v-card-actions>

      </v-card> 
    </v-dialog>
</v-row>
    
</template>

<script>
  export default {
    data: () => ({
      reserva: false,
      consulta: false,
    }),
  }

</script>

<style>


    #background{
        margin: 10vh 0;
    }
    
</style>

