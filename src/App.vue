<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 data-testid="title">What Time</h1>
      <nav>
        <RouterLink to="/" style="text-decoration: none">
          <span class="button-green">Home</span></RouterLink
        >
        <RouterLink to="/about" style="text-decoration: none">
          <span class="button-orange">About</span></RouterLink
        >
        <a
          href="https://github.com/oYuYo/what-time-app"
          target="_blank"
          rel="noopener"
          class="button-blue"
          >Contact</a
        >
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
header > div > h1 {
  font-weight: bold;
}
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}
.button-blue {
  padding: 5px 5px 5px 5px;
  background-color: #80caff;
  border-radius: 8px;
  margin-left: 5px;
  text-decoration: none;
}
.button-orange {
  padding: 5px 5px 5px 5px;
  background-color: #ffc470;
  border-radius: 8px;
  margin-left: 5px;
}
.button-green {
  padding: 5px 5px 5px 5px;
  background-color: #7cff70;
  border-radius: 8px;
}
</style>
