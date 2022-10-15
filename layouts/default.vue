<template>
  <div>
    <nav
      class="navbar header has-shadow is-hfph-gelb"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand has-text-weight-bold is-size-4">
        <a class="navbar-item is-hfph-blau" href="https://www.hfph.de" target="_blank" style="color: ;">
          HFPH
        </a>
      </div>
    </nav>

    <section class="main-content columns">
      <!--<aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <NuxtLink
              :to="item.to"
              exact-active-class="is-active"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside>-->

      <div class="container column is-10">
        <Nuxt />
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Ein Angebot der <strong>
            <a href="hfph.de" target="_blank">Hochschule für Philosophie München</a>
          </strong>
        </p>
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div class="flex justify-center pt-4 pb-4 space-x-2 is-size-4">
            <a href="https://www.hfph.de/" target="_blank" class="mr-4">
              <font-awesome-icon icon="arrow-up-right-from-square" />
            </a>
            <a href="https://www.facebook.com/hfph.muenchen/" target="_blank" class="mr-4">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </a>
            <a href="https://twitter.com/hfph_muc" target="_blank" class="mr-4">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="https://www.instagram.com/hfphmuc/" target="_blank" class="mr-4">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://www.linkedin.com/school/15094016" target="_blank" class="mr-4">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .navbar.is-hfph-gelb .navbar-brand > .navbar-item,
  .navbar.is-hfph-gelb .navbar-brand .navbar-link {
    color: $hfph-blau;
  }

  a svg {
    height: inherit;
  }
</style>
