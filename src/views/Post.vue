<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
      ></v-img>

      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-title>
        {{ author }}
      </v-card-title>

      <v-card-subtitle>
        {{ email }}
      </v-card-subtitle>

      <div>
        <v-divider></v-divider>

        <v-card-text>
          {{ text }}
        </v-card-text>
      </div>
      <div>
        <v-divider></v-divider>
        <v-card-title>
          Комментарии
        </v-card-title>


        <v-card-text v-if="comments.length <= 0">
          Комментариев пока нет.
        </v-card-text>
        <v-card-text v-else v-for="(comment, index) in comments" :key="comment.text">
          {{ comment.author }}
          <v-divider></v-divider>
          {{ comment.text }}
        </v-card-text>
      </div>
    </v-card>
    <v-form ref="form" class="form__custom" lazy-validation>
      <v-text-field class="custom model-edit"
                    hide-details="auto"
                    placeholder="ФИО"
                    v-model="name"
      ></v-text-field>
      <v-text-field class="custom model-edit"
                    hide-details="auto"
                    placeholder="Введите комментарий"
                    v-model="comment"
      ></v-text-field>
      <v-btn class="btn__submit"
             depressed
             color="primary"
             @click="addComment"
             :disabled="disabled"
      >
        Добавить
      </v-btn>
    </v-form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Post',
  computed: {
    disabled () {
      return !(this.name && this.comment);
    }
  },
  data() {
    return {
      title:    '',
      author:   '',
      text:     '',
      email:    '',
      comments: [],
      comment:  '',
      name:     ''
    }
  },
  mounted() {
    const self = this;
    let id     = self.$route.params.id.substring(1)
    axios.get(`https://blog-news-8d44d-default-rtdb.firebaseio.com/news/${id}.json`, {
      mode:    'no-cors',
      headers: {
        'Access-Control-Allow-Origin':  '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      },
    })
        .then((response) => {
          let data    = response.data.body;
          this.title  = data.title;
          this.author = data.author;
          this.email  = data.email;
          this.text   = data.text;

          if(response.data.body.comments) {
          for (let key in response.data.body.comments) {
            let com = response.data.body.comments[key];
            if (com.body.author) {
              this.comments.push({
                author: com.body.author,
                text:   com.body.text,
              })
            }
          }}
        })
  },
  methods: {
    async addComment() {
      let comment = {
        author: this.name,
        text:   this.comment
      }
      const self  = this;
      let id      = self.$route.params.id.substring(1)
      await axios.post(`https://blog-news-8d44d-default-rtdb.firebaseio.com/news/${id}/body/comments.json`, {
        mode:    'no-cors',
        method:  'POST',
        body:    comment,
        headers: {
          'Access-Control-Allow-Origin':  '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        },
      }).then((data) => {
        this.title   = '';
        this.name    = '';
        this.comment = '';
      })
      this.$router.go(0);
    }
  }
}
</script>

<style>
.form__custom {
  width: 60%;
  margin: 0 auto;
}

.custom .v-text-field__slot input {
  border: 1px solid rgb(240, 239, 245);
  padding-left: 10px;
  border-radius: 3px;
}


.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none !important;
}

.btn__submit {
  margin: 20px 0;
}

</style>
