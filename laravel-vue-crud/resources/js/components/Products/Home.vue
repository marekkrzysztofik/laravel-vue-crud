<template>
  <div class="container">
    <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view />
    </div>
    <h1>Welcome to homepage</h1>

    <h1>Log in or Register to continue</h1>
   </div>
</template>
<style>
h1{
  margin-top: 5%;
}
.pasek {
  width: 100%;
}
</style>

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

