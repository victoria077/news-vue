<template>
  <div>
    <v-form ref="form" class="form__custom" lazy-validation>
      <v-text-field class="custom model-edit"
                    hide-details="auto"
                    placeholder="Загoловок"
                    v-model="title"
      ></v-text-field>
      <v-text-field class="custom model-edit"
                    hide-details="auto"
                    placeholder="ФИО"
                    v-model="author"
      ></v-text-field>
      <v-text-field class="custom model-edit"
                    hide-details="auto"
                    placeholder="Email"
                    v-model="email"
                    :rules="[v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' ]"
      ></v-text-field>
      <v-textarea
          solo
          class="textarea__custom"
          name="input-7-4"
          placeholder="Введите текст новости"
          v-model="text"
      ></v-textarea>
      <v-btn class="btn__delete"
             depressed
             color="primary"
             @click="addNews"
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
  name: 'AddPost',
  computed: {
    disabled () {
      return !(this.title && this.author && this.email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
    }
  },
  data() {
    return {
      title:  '',
      author: '',
      text:   '',
      email:  ''
    }
  },
  methods: {
    addNews() {
      let post = {
        author: this.author,
        text:   this.text,
        title:  this.title,
        email:  this.email,
        comments: []
      };
      axios.post('https://blog-news-8d44d-default-rtdb.firebaseio.com/news.json', {
        mode:    'no-cors',
        method:  'POST',
        body:    post,
        headers: {
          'Access-Control-Allow-Origin':  '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        },
      }).then((data) => {
            this.title = '',
            this.author = '',
            this.text = '',
            this.email = ''
      })
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

.textarea__custom {
  margin-top: 15px !important;
}
</style>
