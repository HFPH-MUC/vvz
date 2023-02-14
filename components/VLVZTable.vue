<template>
  <div>
    <div class="hero mb-5">
      <NavMini />

      <b-field>
        <b-select
          v-model="selectSemester"
          placeholder="Semester"
          size="is-medium"
          class="is-hfph-blau"
          @input="fetchSomething()"
        >
          <option value="2023:2">
            Sommer 2023
          </option>
          <option value="2022:1">
            Winter 2022/2023
          </option>
          <option value="2022:2">
            Sommer 2022
          </option>
        </b-select>
      </b-field>
    </div>

    <b-button class="mb-3" type="is-hfph-gelb" @click="fetchSomething()">
      Neu laden
    </b-button>

    <b-loading v-model="isLoading" :is-full-page="isFullPage" :can-cancel="true" />

    <b-table
      :data="courses"
      striped
      default-sort="Angebotsnummer"
      detailed
      detail-key="Angebotsnummer"
      :show-detail-icon="false"
      style="width: 100%;"
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
        width="760"
        sortable
        searchable
      >
        <a @click="props.toggleDetails(props.row)">
          {{ props.row.Titel }}
        </a>
      </b-table-column>

      <b-table-column
        v-slot="props"
        field="kb_clsl_p_kurz"
        label="Dozent*in"
        width="240"
        sortable
        searchable
      >
        {{ props.row.kb_clsl_p_kurz }}
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
            <b-tabs type="is-boxed" position="is-centered" class="block">
              <b-tab-item label="Daten" style="background-color: $white;">
                <div class="content">
                  <ul>
                    <li v-if="props.row.kb_clsl_p_lang">
                      <b>Dozent*in: </b>{{ props.row.kb_clsl_p_lang }}
                    </li>
                    <!--<li v-if="props.row.Fach">
                      <b>Kurs: </b>{{ props.row.Fach }}
                    </li>-->
                    <li>
                      <b>Studiengang: </b>
                      <ul>
                        <li v-for="( item ) in splitStringToList( props.row.StudiengangModul, true )" :key="item">
                          {{ item }}
                        </li>
                      </ul>
                    </li>
                    <li v-if="props.row.nfd_sws">
                      <b>SWS: </b>{{ props.row.nfd_sws }}
                    </li>
                    <!--<li v-if="props.row.Raum">
                      <b>Raum: </b>{{ props.row.Raum }}
                    </li>
                    <li v-if="props.row.Uhrzeit_von">
                      <b>Von: </b>{{ props.row.Uhrzeit_von }}
                    </li>
                    <li v-if="props.row.Uhrzeit_bis">
                      <b>Bis: </b>{{ props.row.Uhrzeit_bis }}
                    </li>
                    -->
                    <li v-if="!!props.row.kb_v_comment">
                      <b>Hinweis: </b>
                      <ul v-if="!!props.row.kb_v_comment">
                        <li>
                          {{ stripStyles( props.row.kb_v_comment ) }}
                        </li>
                      </ul>
                    </li>
                    <li v-if="!!props.row.Termine_mit_Uhrzeit_und_Raum">
                      <b>Termine: </b>
                      <ul>
                        <li v-for="( item ) in splitStringToList( props.row.Termine_mit_Uhrzeit_und_Raum )" :key="item">
                          <span style="font-size: .93rem; font-family: 'Lucida Console', monospace">{{ item }}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </b-tab-item>
              <b-tab-item
                v-if="
                  !!props.row.nfd_ziele
                    || !!props.row.nfd_wissen
                    || !!props.row.nfd_beschreibung
                    || !!props.row.nfd_elearning
                    || !!props.row.nfd_vorbereitung
                    || !!props.row.nfd_kommentar
                    || (!!props.row.nfd_b && props.row.nfd_b != '{}')
                "
                label="Erläuterungen"
              >
                <h3
                  v-if="!!props.row.nfd_ziele"
                  class="is-size-5 mt-2 mb-1"
                >
                  Lernziele
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="stripStyles( props.row.nfd_ziele )" />
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_wissen"
                  class="is-size-5 mt-2 mb-1"
                >
                  Vorausgesetztes Wissen
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="stripStyles( props.row.nfd_wissen )" />
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_beschreibung"
                  class="is-size-5 mt-2 mb-1"
                >
                  Fachbeschreibung
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="stripStyles( props.row.nfd_beschreibung )" />
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_elearning"
                  class="is-size-5 mt-2 mb-1"
                >
                  E-Learning
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="stripStyles( props.row.nfd_elearning )" />
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_vorbereitung"
                  class="is-size-5 mt-2 mb-1"
                >
                  Vorbereitung
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-html="stripStyles( props.row.nfd_vorbereitung )" />
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_b && props.row.nfd_b != '{}'"
                  class="is-size-5 mt-2 mb-1"
                >
                  Literatur
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <ul v-if="!!props.row.nfd_b && props.row.nfd_b != '{}'" class="books">
                  <li v-for="( book ) in makeList (props.row.nfd_b)" :key="book.name">
                    {{ book.name }}
                    <a v-if="!!book.href" :href="book.href" target="_blank">
                      &emsp;<font-awesome-icon icon="book" size="xs" /> Link
                    </a>
                    <a v-if="!!book.isbn && ((!!book.href && !book.href.includes('hfph.bsz-bw.de')) || !book.href)" :href="'https://hfph.bsz-bw.de/cgi-bin/koha/opac-search.pl?idx=nb&weight_search=1&q=' + book.isbn" target="_blank">
                      &emsp;<font-awesome-icon icon="book-open-reader" size="xs" /> HFPH-OPAC
                    </a>
                    <a v-if="!book.isbn && !book.href" :href="'https://duckduckgo.com/?q=' + book.name" target="_blank">
                      &emsp;<font-awesome-icon icon="magnifying-glass" size="xs" /> Websuche
                    </a>
                  </li>
                </ul>
                <!--eslint-enable-->

                <h3
                  v-if="!!props.row.nfd_kommentar"
                  class="is-size-5 mt-2 mb-1"
                >
                  Kommentar
                </h3>
                <!-- eslint-disable vue/no-v-html -->
                <div v-if="!!props.row.nfd_kommentar" v-html="stripStyles( props.row.nfd_kommentar )" />
                <!--eslint-enable-->
              </b-tab-item>
            </b-tabs>
          </div>
        </article>
      </template>
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
      courses: [],
      selectSemester: '2022:1'
    }
  },
  mounted () {
    this.fetchSomething()
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
      await this.$axios.$get('/a5-vlvz-api' + '&Semester=' + this.selectSemester)
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

<style lang="scss">
  .b-tabs .tab-content {
    background-color: white;
  }

  .tabs li.is-active a,
  a {
    color: $hfph-blau;
  }
</style>

<style lang="scss" scoped>
  ul.books {
    list-style: disc;

    li {
      padding-left: .5rem;
      margin-left: 1.5rem;
    }
  }

/*
  section.tab-content div.tab-item *,
  section.tab-content :deep(span),
  section.tab-content :deep(span[style]) {
    font-family: $family-sans-serif !important;
    font-size: 16px;
  }
  */
</style>
