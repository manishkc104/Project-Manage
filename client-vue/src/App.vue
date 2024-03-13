<template>
  <nav>
    <router-link to="/">Projects</router-link> |
    <router-link to="/client">Client</router-link> |
    <div class="cancellation-link">
      <router-link to="/cancellation">Cancellation List</router-link>
      <span class="count-chip">{{ projectListStore.count }}</span>
    </div>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { useProjectListStore } from './store';
const projectListStore = useProjectListStore()
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.cancellation-link {
  display: inline-block;
  position: relative;
}

.count-chip {
  position: absolute;
  top: -10px;
  right: -30px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 0.8em;
  min-width: 20px;
  text-align: center;
}
</style>
