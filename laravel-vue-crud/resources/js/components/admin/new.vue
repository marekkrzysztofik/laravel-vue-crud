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
        <template #title> </template>
        <template #content>
          <h3>Name</h3>

          <InputText class="width" type="text" v-model="form.name" />

          <h3>Description</h3>

          <Textarea v-model="form.description" rows="7" cols="55" />
          <!-- :auto="true" -->
          <FileUpload mode="basic" accept="image/*" @select="uploadPhoto" />

          <img
            class="products__create__main--media--images--item--img"
            :src="getPhoto()" />
        </template>
      </Card>
      <Card class="card-2" style="width: 23rem; margin-top: 1em">
        <template #content>
          <h3>Type</h3>

          <InputText class="width" type="text" v-model="form.type" />

          <h3>Inventory</h3>

          <InputText class="width" type="text" v-model="form.quantity" />

          <h3>Price</h3>

          <InputText class="width" type="text" v-model="form.price" />

          <Button
            style="
              display: table-footer-group;
              top: 50px;
              left: 60%;
              padding: 10px 30px 10px 30px;
            "
            label="Save"
            @click="showSuccess"
            class="p-button-rounded right" />
        </template>
      </Card>
      <Toast />
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';
import { usePhoto } from './composable.js';

const { uploadPhoto } = usePhoto();

const { showSuccess, form, router } = inject('key');

const logout = (event, index) => {
  localStorage.removeItem('token');
  router.push('/Login');
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
// funkcja async / await w tym przypadku każe poczekać aż saveProduct zostanie wykonane aby 'działania' zostały wykonane w dobrej kolejności
// const testGun = async () => {
//   let a = 2
//   a = a * await saveProduct()
//   a =+ 2
//   console.log(a)
// }
</script>

<style scoped>
h3 {
  line-height: 3rem;
}
.width {
  width: 80%;
}

.cards {
  display: inline-flex;
  margin-left: 1%;
}

.card-2 {
  margin-left: 2%;
}
</style>

