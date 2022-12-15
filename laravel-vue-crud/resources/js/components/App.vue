<template>
    <router-view />
</template>
<script setup>
import { provide, ref } from "vue"
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const form  = ref({
    name: '',
    description: '',
    photo: '',
    type: '',
    quantity: '',
    price: '',
  });

const toast = useToast();

const showSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success !!!',
    detail: 'Product added successfully',
    life: 1000,
  });
  setTimeout(function (){
    saveProduct()}, 1000);
};

const showError = () => {
    toast.add({severity:'error', summary: 'Error', detail:'Saving product has failed!', life: 3000});
} 

const saveProduct = async () => {
  await axios.post('/api/createOrUpdateProduct', { ...form.value }) 
    .then(() => {
      // Object.keys(form.value) => ['name','description','photo','type','quantity','price']
      Object.keys(form.value).forEach(key => form.value[key] = "")
      router.push('/Admin/');
    })
     .catch(error => {
      showError();
     });
};

provide('key', {
   toast, showSuccess, saveProduct, form
})
</script>


