<template>
  <div>
    <div class="hero mb-5">
      <NavMini />

      <b-datepicker
        v-if="displayStyle != 'foyer'"
        v-model="selected"
        :show-week-number="true"
        :locale="'de-DE'"
        placeholder="Startdatum auswählen"
        icon="calendar-today"
        :icon-right="selected ? 'close-circle' : ''"
        icon-right-clickable
        trap-focus
        @icon-right-click="clearDate"
      />
    </div>

    <b-button
      v-if="displayStyle != 'foyer'"
      class="mb-3"
      type="is-hfph-gelb"
      @click="fetchRP()"
    >
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <b-table
      :data="timetable"
      striped
      default-sort="Datum und Uhrzeit"
      detailed
      detail-key="Datum und Uhrzeit"
      :show-detail-icon="false"
      style="width: 100%;"
      :paginated="true"
      :per-page="15"
      :pagination-simple="true"
    >
      <b-table-column
        v-slot="props"
        field="timestamp_start"
        label="Datum und Uhrzeit"
        width="280"
        :searchable="foyer()"
        sortable
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_start)">
          <code>{{ $dayjs(props.row.timestamp_start).format('DD.MM.') }}</code>
          &ensp;
          <code>{{ $dayjs(props.row.timestamp_start).format('HH:mm') }}</code>
          <span class="has-text-grey">›</span>
          <code>{{ $dayjs(props.row.timestamp_end).format('HH:mm') }}</code>
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="Bezeichnung"
        label="Veranstaltung"
        width="600"
        sortable
        :searchable="foyer()"
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_start)">
          {{ props.row.Bezeichnung }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="Raum"
        label="Raum"
        width="80"
        :searchable="foyer()"
      >
        {{ props.row.pr_name }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    displayStyle: {
      type: String,
      default: '',
      required: false
    }
  },

  data () {
    return {
      filterStart: dayjs().format('YYYY-MM-DD'),
      selected: new Date(),
      loading: true,
      isLoading: false,
      isFullPage: true,
      timetable: []
    }
  },

  watch: {
    selected (val, oldVal) {
      console.log(val, oldVal)
      this.filterStart = dayjs(val).format('YYYY-MM-DD')
      console.log(this.filterStart)
      this.fetchRP()
    }
  },

  mounted () {
    this.fetchRP()
  },

  methods: {
    clearDate () {
      this.selected = new Date()
    },

    foyer () {
      return (this.displayStyle !== 'foyer')
    },

    setDateIndicationStyle (timestamp) {
      let result = ''

      // per URL-Parameter werden Termine
      // immer erst ab dem heutigen Tag angezeigt
      // `.isBefore` darf also mit timestamp vergleichen
      if (dayjs().isBefore(timestamp)) {
        result = 'isBefore'
      } else if (dayjs().isAfter(timestamp, 'h')) {
        result = 'isAfter'
      } else {
        result = 'now'
      }

      // dayjs().diff(date, 'm')

      return result
    },

    async fetchRP () {
      this.isLoading = true

      await this.$axios.$get('/a5-rp-api' + '&earliest=' + this.filterStart)
        .then((response) => {
          this.timetable = response
          // const filtered = response.filter(([key, value]) => typeof value === 'string')
          // console.log(response)
        })
        .finally(() => (
          setTimeout(() => { this.isLoading = false }, 100) // a few ms to prevent blitz
        ))
    }
  }
}
</script>

<style lang="scss" scoped>
  .isAfter, .isAfter CODE {
    color: #7e0000;
  }

  .isBefore, .isBefore CODE {
    color: #393939;
  }

  .now, .now CODE {
    color: $hfph-blau;
  }

</style>
