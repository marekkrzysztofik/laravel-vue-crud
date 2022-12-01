<template>
  <div class="container">
    <Home></Home>
    <Toolbar>
      <template #start>

        <Button icon="pi pi-refresh" />
        <i class="pi pi-bars p-toolbar-separator mr-2" />
        <Button label="Log out" @click="logout" class="p-button-rounded" />
        <i class="pi pi-bars p-toolbar-separator mr-2" />
 
      </template>
    </Toolbar>
    <div class="cards">
 
      <Card style="width: 32rem; margin-top: 1em">
        <h1>Add product</h1>
        <template #title>

        </template>
        <template #content="slotProps">
          <h3>Name</h3>
          <InputText class="width" type="text" v-model="form.name" />

          <p></p>
          <h3>Description</h3>
          <Textarea v-model="form.description" rows="7" cols="55" />
          <FileUpload mode="basic" accept="image/*" @select="uploadPhoto" />
          <img class="products__create__main--media--images--item--img" :src="getPhoto()" />
        </template>
      </Card>

      <Card class="card-2" style="width: 22.5rem; margin-top: 1em">

        <template #content="slotProps">
          <p>
          <h3>Type</h3>
          <InputText class="width" type="text" v-model="form.type" />
          </p>
          <p>
          <h3>Inventory</h3>
          <InputText class="width" type="text" v-model="form.quantity" />
          </p>
          <p>
          <h3>Price</h3>
          <InputText class="width" type="text" v-model="form.price" />
          </p>

          <p></p>
          <Button class="p-button-rounded right"
            style="display: table-footer-group; top: 50px; left:60%; padding:10px 30px 10px 30px;" label="Save"
            @click="updateProduct" />
        </template>
      </Card>

    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {  usePhoto } from './composable.js'

const { uploadPhoto, form } = usePhoto();

const logout = (event, index) => {
  localStorage.removeItem('token');
  router.push('/Login');
};
onMounted(async () => {
  getSingleProduct();
});

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});
const router = useRouter();

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


const getSingleProduct = async () => {
  const response = await axios.get(`/api/products/${props.id}`);
  form.value = response.data;
};

const updateProduct = () => {
  const formData = new FormData();


  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('photo', form.value.photo);
  formData.append('type', form.value.type);
  formData.append('quantity', form.value.quantity);
  formData.append('price', form.value.price);
  //console.log(form.value.photo);

  //{...form.value}
  axios.patch(`/api/products/${form.value.id}`, { ...form.value })
    .then(response => {
      (form.value.name = ''),
        (form.value.description = ''),
        (form.value.photo = ''),
        (form.value.type = ''),
        (form.value.quantity = ''),
        (form.value.price = ''),
        router.push('/Admin/');

      // toast.fire({
      //   icon: 'success',
      //   title: 'Product edited successfully',
      // });
    })
  // .catch(error => {
  //   Swal.fire(
  //     'Failed!',
  //     'There was something wrong. Check if you filled name of the product.',
  //     'warning'
  //   );
  // });
};
</script>

<style scoped>
.width {
  width: 80%;
}

.cards {
  display: inline-flex;
}

.card-2 {
  margin-left: 2%;
}
</style>