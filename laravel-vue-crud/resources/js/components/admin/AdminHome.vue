<template>
  <div class="container">
    <div class="card">
      <TabMenu :model="items">
        
      </TabMenu> 
      <router-view />
    </div>

    <DataTable :value="products" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">
          Products <button @click="logout">siema</button>
          <Button icon="pi pi-refresh" />
        </div>
      </template>
       
      <Column header="Image">
        <template #body="slotProps">
          <img
            src="ourImage(item.photo)"
            :alt="slotProps.data.image"
            v-if="item.photo"
            class="products__list__item--img" />
        </template>
      </Column>
      <Column field="name" header="Name">{{ item.name }}</Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.rating"
            :readonly="true"
            :cancel="false" />
        </template>
      </Column>
      <Column header="Status">
        <template #body="slotProps">
          <span
            :class="
              'product-badge status-' +
              slotProps.data.inventoryStatus.toLowerCase()
            "
            >{{ slotProps.data.inventoryStatus }}</span
          >
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
const router = useRouter();

const logout = () => {
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
        .get(`/api/products/${id}`)
        .then(() => {
          Swal.fire('Delete', 'Product delete successfully', 'success');
          getProducts();
        })
        .catch(() => {
          Swal.fire('Failed!', 'There was something wrong.', 'Warning');
        });
    }
  });
};
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
          to: '/',
          
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
<!--
<script>

import ProductService from './service/ProductService';

export default {
    setup() {
        onMounted(() => {
            productService.value.getProductsSmall().then(data => products.value = data);
        })

        const products = ref();
        const productService = ref(new ProductService());

        const formatCurrency = (value) => {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        };

        return { products, formatCurrency }
    }
}
</script>  -->
