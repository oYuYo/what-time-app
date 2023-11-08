<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>What Time</h1>
      <nav>
        <RouterLink to="/" style="text-decoration: none;"><span class="button-green">Home</span></RouterLink>
        <RouterLink to="/about" style="text-decoration: none;"><span class="button-orange">About</span></RouterLink>
        <a href="https://github.com/oYuYo" target="_blank" rel="noopener" class="button-blue">Contact</a>
      </nav>
    </div>
  </header>

<RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 2rem;
}
header > div > h1{
  font-weight: bold;
}
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
.button-blue{
  padding: 5px 5px 5px 5px;
  background-color:#80CAFF;
  border-radius: 8px;
  margin-left: 5px;
  text-decoration: none;
}
.button-orange{
  padding: 5px 5px 5px 5px;
  background-color:#FFC470;
  border-radius: 8px;
  margin-left: 5px;
}
.button-green{
  padding: 5px 5px 5px 5px;
  background-color:#7cff70;
  border-radius: 8px;
}
/*
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>
