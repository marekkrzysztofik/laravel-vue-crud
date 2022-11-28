<template>
  <div class="container">
    <!-- <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view /> 
    </div> -->

    <DataTable  :value="products"  responsiveLayout="scroll">
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
        </template>
      </Toolbar>

      <template #header>Products </template>
      <Column  field="id"  header="ID" ></Column>
      <Column  field="photo"  header="Image">
        <template #body="slotProps" > 
          <img class="products__list__item--img" :src="ourImage(slotProps.data.photo)" />
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="type" header="Type"></Column>
      <Column field="quantity" header="Inventory"></Column> 

      <Column header="Actions">
        <template #body="slotProps">
          <button class="btn-icon btn-icon-success"
          @click="onEdit(slotProps.data.id)">
            <i class="pi pi-pencil"></i>
          </button>
          <button class="btn-icon btn-icon-danger" @click="deleteProduct(slotProps.data.id)">
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
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
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
const login = () => {
  router.push('/Login');
};
const getProducts = async () => {
  const response = await axios.get('/api/products');
  products.value = response.data;
};
const getPhoto = () => {
  let photo = '/upload/image.png';
  if (form.value.photo) {
    if (form.value.photo.indexOf('base64') != -1) {
      photo = form.value.photo;
    } else {
      photo = `/upload/${form.value.photo}`;
    }
  }
  return photo;
};
const ourImage = img => {
  console.log(img);
  return `/upload/${img}`;
};
const onEdit = id => {
  router.push(`/Admin/Edit/${id}`);
};
const deleteProduct = id => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You can't go back",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: 'red',
    cancelButtonText: 'No',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      axios
        .delete(`/api/products/${id}`)
        .then(() => {
          Swal.fire('Delete', 'Product delete successfully', 'success');
          getProducts();
        })
        .catch(() => {
          Swal.fire('Failed!', 'There was something wrong.', 'warning');
        });
    }
  });
};
</script>

<!-- <script>
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
</script> -->

