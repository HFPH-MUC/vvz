<template>
  <div>
    <h1 class="title">
      Vorlesungsverzeichnis
    </h1>
    <p class="subtitle">
      Wintersemester 2022/23
    </p>

    <b-button class="mb-3" type="is-primary" @click="fetchSomething()">
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <div>
      <b-table
        :data="courses"
        striped
        default-sort="Titel"
        detailed
        detail-key="Angebotsnummer"
        :show-detail-icon="false"
      >
        <b-table-column
          v-slot="props"
          field="Angebotsnummer"
          label="Nr."
          width="140"
          sortable
          searchable
        >
          {{ props.row.Angebotsnummer }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="Titel"
          label="Titel"
          sortable
          searchable
        >
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.Titel }}
          </a>
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="Dozentin_kurz"
          label="Dozent*in"
          width="240"
          sortable
          searchable
        >
          {{ props.row.Dozentin_kurz }}
        </b-table-column>

        <b-table-column
          v-slot="props"
          field="Veranstaltungstyp"
          label="Veranstaltungstyp"
          width="160"
          sortable
          searchable
        >
          {{ props.row.Veranstaltungstyp }}
        </b-table-column>

        <template #detail="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <ul>
                  <li><b>Dozent*in: </b>{{ props.row.Dozentin_lang }}</li>
                  <li><b>Fach: </b>{{ props.row.Fach }}</li>
                  <li>
                    <b>Studiengang: </b>
                    <ul>
                      <li v-for="( item ) in splitStringToList( props.row.StudiengangModul )" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </li>
                  <li><b>SWS: </b>{{ props.row.nfd_sws }}</li>
                  <li><b>Raum: </b>{{ props.row.Raum }}</li>
                  <li><b>Von: </b>{{ props.row.Uhrzeit_von }}</li>
                  <li><b>Bis: </b>{{ props.row.Uhrzeit_bis }}</li>
                  <li><b>Beginn: </b>{{ props.row.Datum_Start }}</li>
                  <li><b>Termine: </b>{{ props.row.Termine }}</li>
                </ul>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>

    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="flex justify-center pt-4 pb-4 space-x-2 text-xl">
        <a href="https://www.facebook.com/hfph.muenchen/" target="_blank" class="mr-2">
          <b-icon pack="fab" icon="facebook" :opacity=".7" />
        </a>
        <a href="https://twitter.com/hfph_muc" target="_blank" class="mr-2">
          <font-awesome-icon :icon="['fab', 'twitter']" :opacity=".7" />
        </a>
        <a href="https://www.instagram.com/hfphmuc/" target="_blank" class="mr-2">
          <font-awesome-icon :icon="['fab', 'instagram']" :opacity=".7" />
        </a>
        <a href="https://www.linkedin.com/school/15094016" target="_blank" class="mr-2">
          <font-awesome-icon :icon="['fab', 'linkedin']" :opacity=".7" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      isLoading: false,
      isFullPage: true,
      courses: []
    }
  },
  mounted () {
    this.fetchSomething()
  },
  methods: {
    splitStringToList (str) {
      return str.split(',')
    },

    async fetchSomething () {
      this.isLoading = true
      await this.$axios.$get('/a5-vlvz-api')
        .then((response) => {
          this.courses = response
        })
        .finally(() => (
          setTimeout(() => { this.isLoading = false }, 200) // a few ms to prevent blitz
        ))
    }
  }
}
</script>
