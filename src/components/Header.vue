<template>
  <div class="header">
    <div class="header__logo-container">
      <router-link to="/"><img src="../assets/logo.png" class="header__logo"></router-link>
      <div class="header__logo-headline">El Archivo de dSong</div>
    </div>

    <ul class="header__menu">
      <li class="header__menu--item"><router-link :to="{ name: 'about' }">Acerca de</router-link></li>
      <li class="header__menu--item"><router-link :to="{ name: 'archive' }">Archivo</router-link></li>
      <li class="header__menu--item"><router-link :to="{ name: 'lucky' }"><img src="../assets/dices.png" alt="Dados" class="header__menu--dices"> ¡Suerte!</router-link></li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default { }
</script>

<style lang="scss">
@import "../styles/components/Header.scss";
</style>
