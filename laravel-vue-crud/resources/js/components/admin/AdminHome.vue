<template>
  <div class="container">
    <Home></Home>
    <DataTable :value="products" responsiveLayout="scroll">
      <Toolbar>
        <template #start>
          <Button icon="pi pi-refresh" />
          <i class="pi pi-bars p-toolbar-separator mr-2" />
          <Button label="Log out" @click="logout" class="p-button-rounded" />
          <i class="pi pi-bars p-toolbar-separator mr-2" />
          <Button
            label="Add Product"
            @click="newProduct"
            class="p-button-rounded" />
          <Toast />
          <ConfirmDialog></ConfirmDialog>
        </template>
      </Toolbar>

      <template #header>Products </template>
      <Column field="id" header="ID"></Column>
      <Column field="photo" header="Image">
        <template #body="slotProps">
          <img
            class="products__list__item--img"
            :src="ourImage(slotProps.data.photo)" />
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="quantity" header="Inventory"></Column>

      <Column header="Actions">
        <template #body="btn">
          <button
            class="btn-icon btn-icon-success"
            @click="onEdit(btn.data.id)">
            <i class="pi pi-pencil"></i>
          </button>
          <button
            class="btn-icon btn-icon-danger"
            @click="confirm2(btn.data.id)">
            <i class="pi pi-ban"></i>
          </button>
        </template>
      </Column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </DataTable>
  </div>
</template>

<style>
h1 {
  text-align: center;
  margin-top: 3%;
  font-weight: 700;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

const confirm = useConfirm();
const confirm2 = id => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Record deleted',
        life: 3000,
      });
      deleteProduct(id);
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'You have rejected',
        life: 3000,
      });
    },
  });
};

const toast = useToast();

const router = useRouter();
const logout = (event, index) => {
  localStorage.removeItem('token');
  router.push('/Login');
};
const products = ref([]);
onMounted(async () => {
  getProducts();
});
const newProduct = () => {
  router.push('/Admin/New');
};

const getProducts = async () => {
  const response = await axios.get('/api/getProducts'); 
  products.value = response.data;
};

const ourImage = img => {
  console.log(img);
  return `/upload/${img}`;
};
const onEdit = id => {
  router.push(`/Admin/Edit/${id}`);
};
const deleteProduct = id => {
  axios.get(`/api/deleteProduct/${id}`).then(() => {
    getProducts();
  });
};
</script>

<style scoped>
.flex {
  width: 100%;
  height: 100%;
}
</style>
