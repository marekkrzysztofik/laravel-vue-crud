<template>
  <div class="container">
    <Home></Home>
    <h1>Create your account</h1>
    <div class="login">
      <h2>Register</h2>
      <div class="loginp">
        <p>
          <InputText
            class="inp"
            type="text"
            placeholder="Enter your name"
            v-model="form.name" />
        </p>
        <p>
          <InputText
            class="inp"
            type="text"
            placeholder="Enter your email"
            v-model="form.email" />
          <!-- :style="{ marginLeft: '2.5em' }" -->
        </p>
        <p>
          <InputText
            class="inp"
            type="password"
            placeholder="Enter your password"
            v-model="form.password" />
        </p>
        <p>
          <InputText
            class="inp"
            type="password"
            placeholder="Confirm your password"
            v-model="form.c_password" />
        </p>
       <p> <Button label="Register" @click="register()" class="p-button-rounded" /> </p>
        
        <p class="text-danger" v-for="error in errors" :key="error">
          <span v-for="err in error" :key="err">{{ err }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: '',
  c_password: '',
});

const errors = ref([]);

const register = async () => {
  await axios
    .post('/api/register', form)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        router.push('/');
      }
    })
    .catch(e => {
      errors.value = e.response.data.message;
    });
};
</script>
