<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Patrocinador" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="sponsor.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="Escreva o nome"
                required
              />
            </div>
            <div class="form-group">
              <select
                id="sltType"
                class="form-control form-control-lg"
                v-model="sponsor.animal"
                required
              >
                <option value>Escolha um animal</option>
                <option v-for="animal of animals" :key="animal.id">{{
                  animal.name
                }}</option>
              </select>
            </div>
            <div class="form-group">
              <select
                id="sltGroup"
                class="form-control form-control-lg"
                v-model="sponsor.category"
                required
              >
                <option value="" selected>Selecione uma categoria</option>
                <option
                  v-for="(label, value) in categories"
                  :value="value"
                  :key="value"
                >
                  {{ label }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="Escreva uma breve descrição"
                cols="30"
                rows="10"
                v-model="sponsor.description"
                required
              ></textarea>
            </div>
            <div class="button-group">
              <button
                type="button"
                class="btn btn-outline-clear"
                @click="removeComments()"
              >
                <i class="fas fa-edit"></i> Limpar Todos os Campos
              </button>

              <button type="submit" class="btn btn-outline-success">
                <i class="fas fa-edit"></i> ATUALIZAR
              </button>

              <router-link
                :to="{ name: 'listSponsors' }"
                tag="button"
                class="btn btn-outline-danger"
              >
                <i class="fas fa-window-close"></i> CANCELAR
              </router-link>
            </div>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      sponsor: {},
      animals: [],
      categories: {
        Promotional: "Promocional",
        "Recurring donation": "Doação Recorrente",
        "One-off donation": "Doação Única",
        Other: "Outros"
      }
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorById", "getMessage"]),
    ...mapGetters("animal", ["getAnimals"])
  },
  methods: {
    removeComments() {
      this.sponsor.name = "";
      this.sponsor.animal = "";
      this.sponsor.category = "";
      this.sponsor.description = "";
      this.$alert(
        "Comentários removidos, clique em atualizar!",
        "Comentários!",
        "success"
      );
    },
    update() {
      alert("Atualizado");
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.$data.sponsor).then(
        () => {
          this.$alert(this.getMessage, "Patrocinador atualizado!", "success");
          router.push({
            name: "listSponsors"
          });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    fetchAnimals() {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
        () => {
          this.animals = this.getAnimals;
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.sponsor = this.getSponsorById(this.$route.params.sponsorId);
    if (!this.sponsor.animal) {
      this.sponsor.animal = "";
    }
    this.fetchAnimals();
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>
<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}

.btn-outline-clear {
  background-color: transparent;
  border: 1px solid var(--purple);
  color: var(--purple);
}

.btn-outline-clear:hover {
  background-color: var(--purple);
  color: var(--white);
}

.button-group {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2fr 1fr 1fr;
}

.button-group .btn {
  text-transform: uppercase;
  font-weight: normal;
  font-size: 1rem;

  width: 100%;
}

@media screen and (max-width: 768px) {
  .button-group {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .button-group .btn-outline-clear {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .button-group .btn-outline-danger {
    grid-column-start: 1;
  }

  .button-group .btn-outline-success {
    grid-column-start: 2;
    grid-column-end: 4;
  }
}
</style>
