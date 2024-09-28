<template>
  <div>
    <div class="hero mb-5">
      <NavMini/>
    </div>

    <b-button class="mb-3" type="is-hfph-gelb" @click="fetchSomething()">
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true"/>

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
          class="panel-heading"
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
        <div class="panel-block">
          <b-tag type="is-info is-light" size="is-medium">
            {{ modul.n_m_kuerzel }}
          </b-tag>

          <h2 class="subtitle is-5" style="font-weight: 500">
            &nbsp;{{ modul.n_m_bez_de }}
          </h2>
        </div>

        <div class="card-content">
          <h5 class="subtitle is-5">Beschreibung</h5>
          <div v-html="modul.n_m_d_beschreibung"></div>
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
      string = string
        .replace(/(<p>&nbsp;<\/p>)/gi, '')
        .replace(/(<p><\/p>)/gi, '')
        .replace(/(style=".*;")/gi, '')

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
      await this.$axios.$get('/a5-modul-hb-api')
        .then((response) => {
          this.modul_hbs = response
          this.modul_hbs_reorganized = this.reorganizeDataByStudiumName(response)
        })
        .finally(() => (
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
  margin-bottom: 1rem;
}
</style>

<style lang="scss" scoped>
</style>
