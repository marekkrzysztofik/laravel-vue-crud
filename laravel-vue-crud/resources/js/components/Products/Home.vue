<template>
  <div class="container">
    <Toast />
    <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view />
    </div>
    <h1>Welcome to homepage</h1>
    
    <Button @click="showSuccess" label="Success" class="p-button-success"></Button>
    
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

<script setup>
import { useToast } from 'primevue/usetoast';


const toast = useToast();
  const showSuccess = () => {
            toast.add({ severity:'info', summary: 'Success', life: 3000 });
        };

        


const items= [
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
      ]
</script>

