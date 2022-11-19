<template>
  <div class="container">
    <div class="card">  
            <TabMenu :model="items"  />
            <router-view/>
        </div>
    <h1>Log in to continue</h1>
    <div class="login">
      <h2>Log in</h2>
      <div class="loginp">
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
        <Button label="Log in" @click="login()" class="p-button-rounded" />
        
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.login {
  display: block;
  margin: auto;
  width: 50%;
  padding-top: 5%;
}
.loginp {
  text-align: center;
  line-height: 120%;
  padding: 5%;
  overflow: hidden;
  
}

.inp:hover {
  background-color: azure;
}
.inp:focus {
  background-color: azure;
}
.sub {
  background-color: azure;
  cursor: pointer;
  margin: 2em 0 0 5.5em;
  
}
.sub:hover {
  background-color: rgb(161, 211, 255);
}
.sub:focus {
  background-color: rgb(14, 142, 255);
}

.text-danger {
  color: red;
  font-size: 16px;
}
</style>

<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const error = ref('');

const login = async () => {
  await axios.post('/api/login', form).then(response => {
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.token);
      router.push('/Admin/');
    } else {
      error.value = response.data.message;
    }
  });
};
</script>
<script>
export default {
  data() {
    return {
      
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          to: '/',
        },
        {
          label: 'Login',
          icon: 'pi pi-user',
          to: '/Login',
        },
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          to: '/Register',
        },
        {
          label: 'Documentation',
          icon: 'pi pi-fw pi-file',
          to: '/documentation',
        },
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          to: '/settings',
        },
      ],
    };
  },
};
</script>