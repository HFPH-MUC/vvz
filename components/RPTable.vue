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
      default-sort=""
      detailed
      detail-key="Datum und Uhrzeit"
      :show-detail-icon="false"
      style="width: 100%;"
      :paginated="true"
      :per-page="15"
      :pagination-simple="true"
      :row-class="(row, index) => setDateIndicationStyleFade(row.timestamp_end) + ' ed_psid-' + row.ed_psid"
    >
      <b-table-column
        v-slot="props"
        field="timestamp_start"
        label="Datum und Uhrzeit"
        width="240"
        :searchable="foyer()"
        sortable
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_end)" class="nowrap">
          <code v-if="dateIsToday(props.row.timestamp_start) === true" class="heutespan">Heute</code>
          <code v-else>{{ $dayjs(props.row.timestamp_start).format('DD.MM.') }}</code>
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
        width="640"
        sortable
        :searchable="foyer()"
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_end)">
          <span :class="(props.row.ecet_id === '1') ? 'typ_id_' + props.row.ecet_id : ''">
            <span v-if="props.row.ed_psid === '8'">
              ENTFÄLLT:
            </span>
            <span v-if="props.row.ed_psid != '9'">
              {{ props.row.Bezeichnung }}
            </span>
            <span v-else>
              Interne Veranstaltung
            </span>
          </span>
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="kb_clsl_p_kurz"
        label="Dozent*in"
        width="200"
        sortable
        :searchable="foyer()"
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_end)">
          {{ props.row.kb_clsl_p_kurz | truncate(19, '…') }}
        </span>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="pr_name"
        label="Raum"
        width="120"
        :searchable="foyer()"
      >
        <span :class="setDateIndicationStyle(props.row.timestamp_end)">
          {{ props.row.pr_name }}
        </span>
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
      filterStart: dayjs().subtract(4, 'hour').format('YYYY-MM-DD HH'),
      selected: new Date(),
      loading: true,
      isLoading: false,
      isFullPage: true,
      timetable: []
    }
  },

  watch: {
    selected (val, oldVal) {
      this.filterStart = dayjs(val).format('YYYY-MM-DD')
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

    dateIsToday (timestamp) {
      let result = false

      if (dayjs(timestamp).isToday()) {
        result = true
      }

      return result
    },

    setDateIndicationStyle (timestamp) {
      let result = ''

      // per URL-Parameter werden Termine
      // immer erst ab dem heutigen Tag angezeigt
      // `.isBefore` darf also mit timestamp vergleichen
      if (dayjs().isBefore(timestamp, 'd')) {
        result = 'isBefore'
      } else if (dayjs().isAfter(timestamp, 'm')) {
        result = 'isAfter'
      } else {
        result = 'now'
      }

      // dayjs().diff(date, 'm')

      return result
    },

    setDateIndicationStyleFade (timestamp) {
      let result = ''
      const diff = dayjs().diff(timestamp, 'h')

      if (diff >= 4) {
        result = 'diff-4'
      } else if (diff === 3) {
        result = 'diff-3'
      } else if (diff === 2) {
        result = 'diff-2'
      } else if (diff === 1) {
        result = 'diff-1'
      } else if (diff >= 0) {
        result = 'diff-0'
      }

      // console.log(dayjs().subtract(6, 'hour'))

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

<style lang="scss">
  .ed_psid-8:not([class*=" diff"], [class^="diff-"]) * {
    color: #c90003;
  }
  .diff-4 {
    opacity: .50;
  }
  .diff-3 {
    opacity: .60;
  }
  .diff-2 {
    opacity: .75;
  }
  .diff-1 {
    opacity: .90;
  }
</style>

<style lang="scss" scoped>
  .nowrap {
    white-space: nowrap;
  }

  .heutespan {
    padding-right: 11px;
    padding-left: 11px;
  }

  .isAfter, .isAfter CODE {
    color: #777;
  }

  .isBefore, .isBefore CODE {
    color: #444;
  }

  .now {
    color: $hfph-blau;
    font-weight: 500;
    & CODE {
      color: $hfph-blau;
      background-color: $hfph-blau-light;
    }
  }

  .typ_id_3, .typ_id_6 {
    // css für externe und n-ö. Veranstaltungen
  }

</style>
