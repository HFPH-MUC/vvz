<template>
  <div>
    <NavMini />

    <b-button class="mb-3" type="is-hfph-gelb" @click="fetchRP()">
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <b-table
      :data="timetable"
      striped
      default-sort="Datum"
      detailed
      detail-key="Datum"
      :show-detail-icon="false"
      style="width: 100%;"
    >
      <b-table-column
        v-slot="props"
        field="Name"
        label="Bezeichnung"
        width="340"
        sortable
        searchable
      >
        {{ props.row.Bezeichnung }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="Datum"
        label="Datum"
        width="180"
        searchable
        sortable
      >
        {{ props.row.Datum }}
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="Von Bis"
        label="Von Bis"
        width="180"
        searchable
      >
        {{ $dayjs(props.row.timestamp_start).format('HH:mm') }}
        ›
        {{ $dayjs(props.row.timestamp_end).format('HH:mm') }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      loading: true,
      isLoading: false,
      isFullPage: true,
      timetable: []
    }
  },
  mounted () {
    this.fetchRP()
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

    async fetchRP () {
      this.isLoading = true
      await this.$axios.$get('/a5-rp-api')
        .then((response) => {
          this.timetable = response
          // const filtered = response.filter(([key, value]) => typeof value === 'string');

          console.log(response)
          console.log(dayjs().format())
        })
        .finally(() => (
          setTimeout(() => { this.isLoading = false }, 100) // a few ms to prevent blitz
        ))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
