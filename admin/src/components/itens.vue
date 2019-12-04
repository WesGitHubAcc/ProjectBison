<template >
  <v-data-table :headers="headers" :items="menu" sort-by="id" :search="search" class="elevation-1" dark>
    <template v-slot:top>
      <v-toolbar flat dark>
        <v-toolbar-title>LISTA DE ITENS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
                  v-model="search"
                  append-icon="fas fa-search"
                  label="Search"
                  single-line
                  hide-details
                  color="#ff5252"
                ></v-text-field>
                <v-spacer></v-spacer>
        <v-btn color="#ff5252" dark class="mb-2" @click="dialog = true">Novo Item</v-btn>

        <v-dialog v-model="dialog" max-width="500px">

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="name" label="Nome" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="price" label="Preço" prefix="$" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="category" label="Categoria" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="description" label="Descrição" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-file-input label="Imagem" accept="image/*" v-model="image"></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#ff5252" text @click="close">Finalizar</v-btn>
              <v-btn color="#ff5252" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        
      </v-toolbar>
      <div class="text-center">
                <v-snackbar v-model="snackbar" class="white--text" :timeout="timeout" :color="color">
                  {{ message }}
                  <v-btn dark text @click="snackbar = false" class="white--text">Close</v-btn>
                </v-snackbar>
        </div>
    </template>

    <template v-slot:item.action="{ item }">
      <div class="mx-2">
        <v-icon small @click="editItem(item)" class="iconsList">fas fa-edit</v-icon>
        <v-icon small @click="deleteItem(item)" class="iconsList" >fas fa-trash-alt</v-icon>
      </div>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>

    
  </v-data-table>
</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    search: '',
    dialog: false,

    message: '',
    timeout: 3000,
    snackbar: false,
    color: '',

    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
    image: [],
    imageBase64: "",

    itemsPerPage: 10,

    saveOrEdit: 0,
    editedIndex: -1,
    menu: [],

    headers: [
      { text: "id", value: "id", align: "left" },
      { text: "Nome", value: "name" },
      { text: "Preço", value: "price" },
      { text: "Categoria", value: "itemCategory" },
      { text: "Descrição", value: "description" },
      { text: "Ações", value: "action", sortable: false }
    ],

    editedItem: {
      id: "",
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    },

    defaultItem: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    }, 
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Alterar Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
  },

  image(val) {
      var file = val;
      var reader = new FileReader();
      reader.onloadend = ()=> {
        console.log("RESULT", reader.result);
        this.imageBase64 = reader.result
      };
      reader.readAsDataURL(file);
    }
  },

  created() {
    this.initialize();
  },

  methods: {
   
    editItem(item) {
      this.name = item.name;
      this.price = item.price;
      this.description = item.description;
      this.category = item.itemCategory;
      this.image = item.imageBase64;
      this.editedIndex = item.id;

      this.dialog = true;
      this.saveOrEdit = 1;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    initialize() {
      axios
        .get("http://localhost:3000/menu/")
        .then(response => {
          this.menu = response.data.sucess;
        })
        .catch(e => {
          console.log(e.response.data.error);
        });
    },

    deleteItem(item) {
      const index = this.menu.indexOf(item);
      //indexOfRetorna o primeiro índice em que o elemento pode ser encontrado no array, retorna -1 caso o mesmo não esteja presente.
      const condition = confirm("Voce tem certeza que deseja apagar este item?") && this.menu.splice(index, 1);
      //Splice Altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
      if(condition){
        axios
          .delete(`http://localhost:3000/menu/${item.id}`)
          .then(res => {
            this.message = res.data.sucess;
            this.color="green"
            this.snackbar = true; 
          })
          .catch(e => {
            console.log(e.response.data.error);
            this.message = e.response.data.error;
            this.color="green"
            this.snackbar = true; 
          });
      }else{
        console.log("cancelado")
      } 
    },

    save() {
      if (this.saveOrEdit == 0) {
        axios
          .post("http://localhost:3000/menu/", {
            name: this.name,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.imageBase64
          })
          .then(res => {
            this.message = res.data.sucess;
            this.snackbar = true;
            this.color="green" 
            this.initialize();
          })
          .catch(e => {
            console.log(e.response.data.error);
            this.message = e.response.data.error;
            this.snackbar = true;
            this.color = "red"
          });
      } else {
        axios
          .patch(`http://localhost:3000/menu/${this.editedIndex}`, {
            name: this.name,
            price: this.price,
            description: this.description,
            category: this.category,
            image: this.imageBase64
          })
          .then(res => {
            console.log("Item Alterado");
            this.dialog = false;
            this.editedIndex = -1;
            this.saveOrEdit = 0;
            this.initialize();
            this.message = res.data.sucess;
            this.color="green"
            this.snackbar = true;
          })
          .catch(e => {
            console.log(e.response.data.error);
          });
      }
    }
  }
};
</script>

<style scoped>

.iconsList{
  margin: 5px;
}

.theme--dark.v-sheet {
    background-color: #0a0a0a;
}

.theme--dark.v-data-table {
    background-color: #191919;
    color: #FFFFFF;
}

</style>
