<template>
  <div class="container">
    <div class="card">
      <TabMenu :model="items" />
      <router-view />
    </div>
    <h1>Welcome to homepage</h1>
    
  </div>
</template>
<style>
.pasek {
  width: 100%;
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
</script>
<script>
export default {
  data() {
    return {
      active: 3,
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
