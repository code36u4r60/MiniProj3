<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />

      <b-row class="mb-2 d-flex justify-content-end">
        <b-col cols="w-100">
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
          </router-link>
        </b-col>
      </b-row>

      <!--TABLE-->
      <table class="table table-striped table-responsive-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col" class="w-100">
              NOME
              <i
                class="fas fa-arrow-up"
                v-if="sortType === 1"
                @click="sort()"
              ></i>
              <i class="fas fa-arrow-down" v-else @click="sort()"></i>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sponsor of sponsors" :key="sponsor.id">
            <td class="pt-4 w-100">{{ sponsor.name }}</td>
            <td class="d-flex justify-content-end align-items-center">
              <button
                @click="viewSponsor(sponsor.id)"
                type="button"
                class="btn btn-outline-info btn-md mr-2 custom-btn"
              >
                <i class="fas fa-search"></i> VER
              </button>
              <router-link
                :to="{
                  name: 'editSponsor',
                  params: { sponsorId: sponsor.id }
                }"
                tag="button"
                class="btn btn-outline-success btn-md mr-2 custom-btn"
              >
                <i class="fas fa-edit"></i> EDITAR
              </router-link>
              <button
                @click="removeSponsor(sponsor._id)"
                type="button"
                class="btn btn-outline-danger btn-md custom-btn"
              >
                <i class="fas fa-trash-alt"></i> REMOVER
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </section>
</template>

<script>
import {
  FETCH_SPONSORS,
  REMOVE_SPONSOR
} from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { mapGetters } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue";
export default {
  name: "ListSponsors",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sponsors: [],
      animals: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"]),
    ...mapGetters("animal", ["getAnimals"])
  },
  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).then(
        () => {
          this.sponsors = this.getSponsors;
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
    },
    sort() {
      this.sponsors.sort(this.compareNames);
      this.sortType *= -1;
    },
    compareNames(q1, q2) {
      if (q1.name > q2.name) return 1 * this.sortType;
      else if (q1.name < q2.name) return -1 * this.sortType;
      else return 0;
    },
    viewSponsor(id) {
      const sponsor = this.sponsors.find(sponsor => sponsor.id === id);

      this.$fire({
        title: sponsor.name,
        html: this.generateTemplate(sponsor)
      });
    },

    generateTemplate(sponsor) {
      return `
            <h4>${sponsor.category}</h4>
            <p>${sponsor.description}</p> 
          `;
    },
    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o Patrocinador?",
        "warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar"
        }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(
            () => {
              this.$alert(this.getMessage, "Patrocinador removido!", "success");
              this.fetchSponsors();
            },
            err => {
              this.$alert(
                `${err.message}`,
                "Não foi possível remover o Patrocinador.",
                "error"
              );
            }
          );
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchSponsors();
    this.fetchAnimals();
  }
};
</script>

<style scoped>
.custom-btn {
  min-width: 120px;
}
</style>
