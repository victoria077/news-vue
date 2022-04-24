<template>
  <div>
    <v-row
        align="center"
        justify="end"
        class="buttons"
    >
      <v-btn-toggle
          id="btnGroup"
          borderless
          dense
          group
      >
      <v-btn text>
        <router-link to="/" active-class="active" class="nav__btn" exact tag="button">
          Новости
        </router-link>
      </v-btn>
      <v-btn  text  active-class="active">
        <router-link to="/addPost" active-class="active" class="nav__btn" tag="button">
          Добавить новость
        </router-link>
      </v-btn>
      </v-btn-toggle>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:    'Header',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.buttons {
  padding: 20px;
  background: royalblue;
  color: white;
  margin-bottom: 30px;
}

.active {
  border-bottom: solid;
  border-color: white;
}

.nav__btn {
  color: white;
}
</style>
