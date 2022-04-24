<template>
  <div>
    <v-btn class="btn__sort"
           depressed
           color="primary"
           @click="sortParam='title'"
    >
      Сортировать по названию
    </v-btn>
    <div>
      <v-text-field class="input__filter"
          placeholder="Введите автора"
          hide-details="auto"
          v-model="input"
      ></v-text-field>
    </div>
    <v-card v-for="post in sortedList "
            class="mx-auto news"
            max-width="344"
            @click="toPost(post.id)"
    >
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
      ></v-img>

      <v-card-title>
        {{ post.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ post.author}}
      </v-card-subtitle>

      <div>
        <v-divider></v-divider>

        <v-card-text>
          {{ post.text }}
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      posts:     [],
      sortParam: '',
      input:     ''
    }
  },
  created() {
    axios.get('https://blog-news-8d44d-default-rtdb.firebaseio.com/news.json', {
      mode:    'no-cors',
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      },
    })
        .then((response) => {
          for (let key in response.data) {
            let data = response.data[key].body;
            this.posts.push({
              title:  data.title,
              author: data.author,
              email:  data.email,
              text:   data.text,
              comments: [],
              id:     key
            })
          }
        })
  },
  computed: {
    sortedList() {
      let author = this.input.toLowerCase();
      let filterArr = new Array();


      filterArr = this.posts.filter(function (elem) {
        if (author === '') return true;
        else return elem.author.toLowerCase().indexOf(author) > -1;
      })
      if (this.sortParam) {
        switch (this.sortParam) {
          case 'title':
            return filterArr.sort(sortByTitle);
          case 'author':
            return filterArr.filter(sortByAuthor);
          default:
            return this.posts;
        }
      }

      return filterArr;
    }
  },
  methods:  {
    toPost(id) {
      this.$router.push(`/news/:${id}`);
    }
  }
}

let sortByTitle  = function (d1, d2) {
  return (d1.title.toLowerCase() > d2.title.toLowerCase()) ? 1 : -1;
};
let sortByAuthor = function (d1, d2) {
  return (d1.author.toLowerCase() > d2.author.toLowerCase()) ? 1 : -1;
};
</script>

<style>
.news {
  margin-top: 30px;
}

.btn__sort {
  margin: 20px 0 20px 20px;
}

.input__filter {
  border: 1px solid rgb(240, 239, 245);
  padding-left: 10px;
  border-radius: 3px;
  margin: 0 10px;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none !important;
}

</style>
