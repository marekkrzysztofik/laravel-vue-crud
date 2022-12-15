<template>
  <TabMenu :model="items"> </TabMenu>
</template>
<script>
import { ref } from 'vue';
import { defineComponent } from 'vue';
export default defineComponent({
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
        to: '/settings',
      },
    ]);
    return {
      items,
    };
  },
});
</script>

