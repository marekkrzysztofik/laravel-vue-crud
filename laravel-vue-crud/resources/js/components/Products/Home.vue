<template>
  <TabMenu :model="items"> </TabMenu>
  
</template>
<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const toast = useToast();

    const showSuccess = () => {
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        life: 3000,
      });
    };
    const showInfo = () => {
      toast.add({
        severity: 'info',
        summary: 'Info Message',
        detail: 'Message Content',
        life: 3000,
      });
    };
    const showWarn = () => {
      toast.add({
        severity: 'warn',
        summary: 'Warn Message',
        detail: 'Message Content',
        life: 3000,
      });
    };
    const showError = () => {
      toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Message Content',
        life: 3000,
      });
    };
    const showTopLeft = () => {
      toast.add({
        severity: 'info',
        summary: 'Info Message',
        detail: 'Message Content',
        group: 'tl',
        life: 3000,
      });
    };
    const showBottomLeft = () => {
      toast.add({
        severity: 'warn',
        summary: 'Warn Message',
        detail: 'Message Content',
        group: 'bl',
        life: 3000,
      });
    };
    const showBottomRight = () => {
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        group: 'br',
        life: 3000,
      });
    };
    const showSticky = () => {
      toast.add({
        severity: 'info',
        summary: 'Sticky Message',
        detail: 'Message Content',
      });
    };
    const showMultiple = () => {
      toast.add({
        severity: 'info',
        summary: 'Message 1',
        detail: 'Message 1 Content',
        life: 3000,
      });
      toast.add({
        severity: 'info',
        summary: 'Message 2',
        detail: 'Message 2 Content',
        life: 3000,
      });
      toast.add({
        severity: 'info',
        summary: 'Message 3',
        detail: 'Message 3 Content',
        life: 3000,
      });
    };
    const showTemplate = () => {
      toast.add({
        severity: 'warn',
        summary: 'Are you sure?',
        detail: 'Proceed to confirm',
        group: 'bc',
      });
    };
    const onConfirm = () => {
      toast.removeGroup('bc');
    };
    const onReject = () => {
      toast.removeGroup('bc');
    };
    const clear = () => {
      toast.removeAllGroups();
    };

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
      showSuccess,
      showInfo,
      showWarn,
      showError,
      showTopLeft,
      showBottomLeft,
      showBottomRight,
      showSticky,
      showMultiple,
      showTemplate,
      onConfirm,
      onReject,
      clear,
    };
  },
});
</script>

