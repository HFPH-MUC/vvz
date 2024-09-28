<template>
  <div>
    <div class="hero mb-5">
      <NavMini />
    </div>

    <b-button class="mb-3" type="is-hfph-gelb" @click="fetchSomething()">
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <b-table
      :data="modul_hbs"
      striped
      default-sort="n_m_bez_de"
      :show-detail-icon="false"
      style="width: 100%;"
    >
      <b-table-column
        v-slot="props"
        field="n_m_bez_de"
        label="Bez."
        width="140"
        sortable
        searchable
      >
        {{ props.row.n_m_bez_de }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="n_m_kuerzel"
        label="Kürzel"
        width="140"
        sortable
        searchable
      >
        {{ props.row.n_m_kuerzel }}
      </b-table-column>

    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      isLoading: false,
      isFullPage: true,
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
</style>

<style lang="scss" scoped>
</style>
