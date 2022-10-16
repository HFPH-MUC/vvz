<template>
  <div class="hero mb-5">
    <h1 class="title">
      <NuxtLink to="/">
        Vorlesungsverzeichnis
      </NuxtLink>
      •
      <NuxtLink :to="(!$route.path.includes('/foyer')) ? '/rp' : '/rp/foyer'">
        Raumplan
      </NuxtLink>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'MiniNav'
}
</script>

<style lang="scss">
  .hero {
    h1, h1 * {
      color: $hfph-blau-light;
    }

    a.nuxt-link-exact-active {
      color: $hfph-blau;
    }
  }
</style>
