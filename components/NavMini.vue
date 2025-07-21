<template>
  <div class="hero mb-5">
    <h1 class="title">
      <NuxtLink
        v-if="!$route.path.includes('/foyer')"
        to="/"
      >
        Vorlesungsverzeichnis
      </NuxtLink>

      <span v-if="!$route.path.includes('/foyer')">•</span>

      <NuxtLink :to="(!$route.path.includes('/foyer')) ? '/rp' : '/rp/foyer'">
        Raumplan
        <span
          v-if="$route.path.includes('/foyer')"
          class="tag is-light is-medium has-text-weight-light"
        >
          zuletzt aktualisiert am {{ $dayjs().format('DD.MM. [um] HH:mm') }}
        </span>
        <span
          v-if="$route.path.includes('/foyer')"
          class="tag is-info is-light is-medium"
        >
          raumplan.hfph.de
        </span>
      </NuxtLink>

      <span v-if="!$route.path.includes('/foyer')">•</span>

      <NuxtLink
        v-if="!$route.path.includes('/foyer')"
        to="/modul-hb"
      >
        Modulhandbücher
      </NuxtLink>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'MiniNav'
}
</script>

<style lang="scss" scoped>
  .hero h1.title span.tag {
    float: right;
    margin-left: .5rem;
  }
</style>

<style lang="scss">
  .hero {
    h1, h1 * {
      color: darken($hfph-grau-light, 10%);
    }

    a.nuxt-link-exact-active {
      color: $hfph-grau;
    }
  }
</style>
