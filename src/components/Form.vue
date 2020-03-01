<template> 
  <div class="container">
  <h2>Submit Form</h2>
    <form @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.form.name.$error }">
        <label class="form__label">Name</label>
        <input class="form__input" v-model.trim="$v.form.name.$model"/>
      </div>
      <div class="error" v-if="!$v.form.name.required">Name is required</div>
      <div class="error" v-if="!$v.form.name.minLength"></div>
      
      <div class="form-group" :class="{ 'form-group--error': $v.form.email.$error }">
        <label class="form__label">Email</label>
        <input class="form__input" type="email" v-model.trim="$v.form.email.$model"/>
      </div>
      <div class="error" v-if="!$v.form.email.required">Email is required</div>
      <div class="error" v-if="$v.form.email.email">Please provide proper email address.</div>
      <!-- <pre>{{ $v }}</pre> -->
      
      <div class="form-group" :class="{ 'form-group--error': $v.form.subject.$error }">
        <label class="form__label">Subject</label>
        <textarea type="Subject" class="form__input" v-model.trim="$v.form.subject.$model"/>
        <small v-if="$v.form.subject.maxLength"> You have {{getCharactersLeft('subject')}} characters left.</small>
      </div>
      <div class="error" v-if="!$v.form.subject.required">Subject is required</div>
      <div class="error" v-if="!$v.form.subject.maxLength">Maximum length of character is 100</div>

      <div class="form-group" :class="{ 'form-group--error': $v.form.message.$error }">
        <label class="form__label">Message</label>
        <textarea type="Message" class="form__input" v-model.trim="$v.form.message.$model"/>
        <small v-if="$v.form.message.maxLength"> You have {{getCharactersLeft('message')}} characters left.</small>
      </div>
      <div class="error" v-if="!$v.form.message.required">Message is required</div>
      <div class="error" v-if="!$v.form.message.maxLength">Maximum length of character is 500</div>

      <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">SEND</button>
      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'SERVERERROR'">There is some server error. Please try again later</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>

    </div>
</template>

<script>
import { required, email, minLength, maxLength  } from 'vuelidate/lib/validators'
import axios from 'axios';
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export default {
  name: "Form",
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitStatus: ''      
    }
  },
  validations: {
    form : {
      name: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50)
      },

      email: {
        required,
        email
      },

      subject:{
        maxLength: maxLength(100)
      },

      message:{
        required,
        maxLength: maxLength(500)
      }
    }
    
  },
  methods: {
    submit() {
      this.$v.$touch()
      
      if (this.$v.form.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING';
        console.log('CON ',this.form);
        axios.post('https://5d9f7fe94d823c0014dd323d.mockapi.io/api', this.form).then(response => {
          console.log('response ',response)
           this.submitStatus = 'OK'
        }).catch(error => {
          console.log(error)
           this.submitStatus = 'SERVERERROR'
        });

      }
    },

    getCharactersLeft(field) {
      try {
        return this.getValidationField(field).$params.maxLength.max - this.form[field].length;
      } catch (error) {
        return 0;
      }
    },
    getValidationField(field) {
      if (this.$v.form[field]) {
        return this.$v.form[field];
      }
      throw Error('No validation for field ' + field);
    },
  }
};
</script>

<style src="./Form.scss" lang="scss" scoped></style>