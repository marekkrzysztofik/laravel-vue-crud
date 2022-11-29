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
          <!-- <InputText class="width" type="text" v-model="firstName" />
          <InputText class="width" type="text" v-model="lastName" />
          <p>{{concatNames}}</p> -->

          <h3>Name</h3>
          <br>
          <InputText class="width" type="text" v-model="form.name" />

          <p></p>
          <br>
          <h3>Description</h3>
          <br>
          <Textarea v-model="form.description" rows="7" cols="55" />
          <!-- :auto="true" -->
          <FileUpload mode="basic" accept="image/*" @select="uploadPhoto" />

          <img class="products__create__main--media--images--item--img" :src="getPhoto()" />
        </template>
      </Card>
      <Card class="card-2" style="width: 23rem; margin-top: 1em">

        <template #content>
          <p>
          <h3>Type</h3>
          <br>
          <InputText class="width" type="text" v-model="form.type" />
          </p> <br>
          <p>
          <h3>Inventory</h3>
          <br>
          <InputText class="width" type="text" v-model="form.quantity" />
          </p>
          <br>
          <p>
          <h3>Price</h3>
          <br>
          <InputText class="width" type="text" v-model="form.price" />
          </p>

          <p></p>
          <Button style="display: table-footer-group; top: 50px; left:60%; padding:10px 30px 10px 30px;" label="Save"
            @click="showSuccess" class="p-button-rounded right" />

        </template>
      </Card>
      <Toast/>
    </div>
 
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//import upload from '../../mixin/upload.js';
import { useToast } from 'primevue/usetoast';
// wstęp do computed
const firstName = ref("");
const lastName = ref("");
// wywołuje się przy każdej zmianie na stronie
const concatNamesFun = () => {
  console.log("function")
  return `${firstName.value} ${lastName.value}`
}
// wywołuje się tylko przy zmianie parametów wewnętrznych w tym przypadku firstName i lastName
const concatNames = computed(() => {
  console.log("computed")
  return `${firstName.value} ${lastName.value}`
})


const form = ref({
  name: '',
  description: '',
  photo: '',
  type: '',
  quantity: '',
  price: '',
});
 
const router = useRouter();
const logout = (event, index) => {
  localStorage.removeItem('token');
  router.push('/Login');
};
 const uploadPhoto = e => {
  // console.log(e)
  const file = e.files[0];
  const reader = new FileReader();
  reader.onloadend = file => {
    form.value.photo = reader.result;
  };
  reader.readAsDataURL(file);
  // console.log(file);
  // console.log(reader.result);
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
//const saveProduct = (isUpdated)
const saveProduct = () => {
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('photo', form.value.photo);
  formData.append('type', form.value.type);
  formData.append('quantity', form.value.quantity);
  formData.append('price', form.value.price);
  axios.post('/api/products', formData)
    .then((response) => {
      form.value.name = ''
      form.value.description = ''
      form.value.photo = ''
      form.value.quantity = ''
      form.value.price = ''
      form.value.type = ''
      router.push('/Admin/');
    })
     .catch(error => {
      showError();
     });
};
</script>
<style scoped>
.width {
  width: 80%;
}

.cards {
  display: inline-flex;
  margin-left:1%;
}

.card-2 {
  margin-left: 2%;
}
</style>
