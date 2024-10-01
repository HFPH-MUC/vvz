<template>
  <div>
    <div class="hero mb-5">
      <NavMini />
    </div>

    <!--
    <b-button class="mb-3" type="is-hfph-gelb" @click="fetchSomething()">
      Neu laden
    </b-button>
    -->

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <b-collapse
      v-for="(modules, studiumName) in modul_hbs_reorganized"
      :key="studiumName"
      :open="isOpen"
      aria-id="contentIdForA11y2"
      class="panel"
      animation="slide"
    >
      <template #trigger>
        <div
          class="panel-heading title is-4"
          role="button"
          aria-controls="contentIdForA11y2"
          :aria-expanded="isOpen"
        >
          <strong>{{ studiumName }}</strong>
        </div>
      </template>

      <div
        v-for="modul in modules"
        :key="modul.n_m_kuerzel"
      >
        <div class="panel-block pt-3 pb-3">
          <b-tag type="is-info is-light" size="is-medium">
            {{ modul.n_m_kuerzel }}
          </b-tag>

          <h2 class="subtitle is-5">
            &nbsp;{{ modul.n_m_bez_de }}
          </h2>
        </div>

        <div class="card-content">
          <h5 class="subtitle is-5">
            Übersicht
          </h5>
        </div>

        <div class="card-content">
          <table class="table">
            <tr v-if="modul.C_p1_vorname_name">
              <td>Modulverantwortliche/r</td>
              <td>
                <b-tag rounded size="is-medium">
                  {{ modul.C_p1_vorname_name }}
                </b-tag>
              </td>
            </tr>
            <tr v-if="modul.GC_n_m_d_p_n_m_kuerzel">
              <td>Voraussetzungen für die Teilnahme</td>
              <td>
                <span v-for="(item, index) in modul.GC_n_m_d_p_n_m_kuerzel.split(',')" :key="index">
                  <b-tag rounded size="is-medium">{{ item.trim() }}</b-tag>
                </span>
              </td>
            </tr>
            <tr v-if="modul.GC_n_m_d_s_n_m_kuerzel">
              <td>Verwendbarkeit des Moduls</td>
              <td>
                <span v-for="(item, index) in modul.GC_n_m_d_s_n_m_kuerzel.split(',')" :key="index">
                  <b-tag rounded size="is-medium">{{ item.trim() }}</b-tag>
                </span>
              </td>
            </tr>
            <tr v-if="modul.n_m_d_sws">
              <td>Semesterwochenstunden</td>
              <td>
                <b-tag rounded size="is-medium">
                  {{ modul.n_m_d_sws }}
                </b-tag>
              </td>
            </tr>
            <tr v-if="modul.n_m_d_credits_max">
              <td>ECTS</td>
              <td>
                <b-tag rounded size="is-medium">
                  {{ modul.n_m_d_credits_max }}
                </b-tag>
              </td>
            </tr>
            <tr v-if="modul.GC_C_n_m_d_workl">
              <td>Arbeitsaufwand</td>
              <td>
                <span v-for="(item, index) in modul.GC_C_n_m_d_workl.split(';')" :key="index">
                  <b-tag rounded size="is-medium" style="margin: 0 .2rem .2rem 0;">{{ item.trim() }}</b-tag><br>
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div
          v-if="modul.n_m_d_beschreibung"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Inhalte
          </h5>
          <div v-html="modul.n_m_d_beschreibung" />
        </div>

        <div
          v-if="modul.n_m_d_ziele"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Lernziele
          </h5>
          <div v-html="modul.n_m_d_ziele" />
        </div>

        <div
          v-if="modul.n_m_d_elearning"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Lehr- und Lernformen, Turnus
          </h5>
          <div v-html="modul.n_m_d_elearning" />
        </div>

        <div
          v-if="modul.n_m_d_vorbereitung"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Studien- und Prüfungsleistungen
          </h5>
          <div v-html="modul.n_m_d_vorbereitung" />
        </div>

        <div
          v-if="modul.n_m_d_wissen"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Vorausgesetztes Wissen
          </h5>
          <div v-html="modul.n_m_d_wissen" />
        </div>

        <div
          v-if="modul.n_m_d_kommentar"
          class="card-content"
        >
          <h5 class="subtitle is-5">
            Kommentar
          </h5>
          <div v-html="modul.n_m_d_kommentar" />
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      isLoading: false,
      isFullPage: true,
      isOpen: false,
      modul_hbs: [],
      modul_hbs_reorganized: {}
    }
  },

  mounted () {
    this.fetchSomething()
  },

  created () {
    this.modul_hbs_reorganized = this.reorganizeDataByStudiumName(this.modul_hbs)
  },

  methods: {
    makeList (obj) {
      if (!obj || obj.trim().length === 0 || Object.keys(obj).length === 0) {
        return
      }

      const books = JSON.parse('[' + obj + ']')
      return books
    },

    stripStyles (string) {
      string = string.replace(/(<p>&nbsp<\/p>)/gi, '').replace(/(<p><\/p>)/gi, '').replace(/(style=".*")/gi, '')

      return string
    },

    splitStringToList (str, sort = false) {
      if (!str || str.trim().length === 0) {
        return
      }

      let arr = str.split(', ')

      if (sort === true) {
        arr = arr.sort()
      }

      return arr
    },

    async fetchSomething () {
      this.isLoading = true
      await this.$axios.$get('/a5-modul-hb-api').then((response) => {
        this.modul_hbs = response
        this.modul_hbs_reorganized = this.reorganizeDataByStudiumName(response)
      }).finally(() => (
        setTimeout(() => {
          this.isLoading = false
        }, 200) // a few ms to prevent blitz
      ))
    },

    reorganizeDataByStudiumName (data) {
      const result = {}

      data.forEach((item) => {
        let studiumNames
        if (!item.GC_studium_name) {
          studiumNames = [item.n_m_d_name]
        } else if (item.GC_studium_name.includes(',')) {
          studiumNames = item.GC_studium_name.split(',').map(name => name.trim())
        } else {
          studiumNames = [item.GC_studium_name]
        }

        studiumNames.forEach((name) => {
          if (!result[name]) {
            result[name] = []
          }
          result[name].push(item)
        })
      })

      return result
    }
  }
}
</script>

<style lang="scss">
.card-content p {
  margin-bottom: 1rem
}

h2.is-5 {
  font-weight: 700;
}

h5.is-5 {
  font-weight: 400
}

.card-content + .card-content {
  padding-top: 0;
}
</style>

<style lang="scss" scoped>
</style>
