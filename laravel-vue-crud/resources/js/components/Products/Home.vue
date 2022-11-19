<template>
  <div class="container">
    <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view />
    </div>
    <h1>Welcome to homepage</h1>

    <h1>Welcome to admin overview</h1>
    <div class="products__list table my-3 bg-grey">
      <div
        class="customers__titlebar dflex justify-content-between align-items-center">
        <div class="customers__titlebar--item">
          <h1 class="my-1">Products</h1>
        </div>
        <div class="customers__titlebar--item">
          <button class="btn btn-sec my-1" @click="newProduct">
            Add Product
          </button>
        </div>
        <div class="customers__titlebar--item">
          <button class="btn btn-sec my-1" @click="logout">Logout</button>
        </div>
      </div>

      <div
        class="table--heading mt-2 products__list__heading"
        style="padding-top: 20px; background: #fff">
        <!-- <p class="table--heading--col1">&#32;</p> -->
        <p class="table--heading--col1">image</p>
        <p class="table--heading--col2">Product</p>
        <p class="table--heading--col4">Type</p>
        <p class="table--heading--col3">Inventory</p>
        <!-- <p class="table--heading--col5">&#32;</p> -->
        <p class="table--heading--col5">actions</p>
      </div>

      <!-- product 1 -->
      <div
        class="table--items products__list__item"
        v-for="item in products"
        :key="item.id"
        v-if="products.length > 0">
        <div class="products__list__item--imgWrapper">
          <img
            class="products__list__item--img"
            :src="ourImage(item.photo)"
            style="height: 40px"
            v-if="item.photo" />
        </div>
        <a href="# " class="table--items--col2">
          {{ item.name }}
        </a>
        <p class="table--items--col2">
          {{ item.type }}
        </p>
        <p class="table--items--col3">
          {{ item.quantity }}
        </p>
        <div>
          <button class="btn-icon btn-icon-success" @click="onEdit(item.id)">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button
            class="btn-icon btn-icon-danger"
            @click="deleteProduct(item.id)">
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div class="table--items products__list__item" v-else>
        <p>Product not found</p>
      </div>
    </div>
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
import { onMounted } from 'vue';
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
});

const logout = () => {
  localStorage.removeItem('token');
  router.push('/');
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
const ourImage = img => {
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

