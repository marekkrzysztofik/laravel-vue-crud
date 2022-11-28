<template>
  <div>
      <TabMenu :model="items"> </TabMenu>
    </div>
    <router-view />
</template>
<style>
.pasek {
  padding: 1%;
  width: 100%;
  opacity: 0.8;
}
</style>

<script>
import { ref } from 'vue';
export default {

  setup() {
          
          const items = ref([
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
            to: '/settings' }
          ]);
          return { items }
        }
      
  }
</script>
