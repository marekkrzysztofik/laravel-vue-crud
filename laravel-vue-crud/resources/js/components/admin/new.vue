<template> 
  <div class="container">
    <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view />
    </div>
    
    <Toolbar>
        <template #start>
          
          <Button icon="pi pi-refresh" />
          <i class="pi pi-bars p-toolbar-separator mr-2" />
          <Button label="Log out" @click="logout" class="p-button-rounded" />
          <i class="pi pi-bars p-toolbar-separator mr-2" />
          
        </template>
      </Toolbar>
     
    <div class="cards" >
      
    <Card style="width: 32rem; margin-top: 1em">
      <h1>Add product</h1>
            <template #title>
                
            </template>
            <template #content="slotProps">
              
                <h3>Name</h3>
          <InputText
          class="width"
            type="text"
            v-model="form.name" />
        
        <p></p><h3>Description</h3>
        <Textarea v-model="form.description" rows="7" cols="55" /> 
        <!-- :auto="true" -->
        <FileUpload style="margin-top:5%;" :auto="true" :fileLimit="1" mode="basic" :customUpload="true" @uploader="uploadPhoto" />
            
         <!-- <img class="products__create__main--media--images--item--img" :src="getPhoto" />   -->
            </template>
        </Card>
        <Card class="card-2" style="width: 22.5rem; margin-top: 1em">
            
            <template #content>
              <p>
                <h3>Type</h3>
          <InputText
          class="width"
            type="text"
            v-model="form.type" /> 
          </p>
            <p>
                <h3>Inventory</h3>
          <InputText
          class="width"
            type="text"
            v-model="form.quantity" /> </p>
            <p>
                <h3>Price</h3>
          <InputText
          class="width"
            type="text"
            v-model="form.price" /> </p>
          
            <p></p>
        <Button style="display: table-footer-group; top: 50px; left:60%; padding:10px 30px 10px 30px;" label="Save" @click="saveProduct" class="p-button-rounded right"/>
        
            </template>
        </Card>
        
      </div>
    
  </div>
</template>
<style>
.width {
  width: 80%;
}
.cards{
  display: inline-flex;
}

.card-2 {
  margin-left: 2%;
}

</style>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  const file = e.files[0];
  const reader = new FileReader();
  reader.onloadend = file => {
    form.value.photo= reader.result;
  };
  reader.readAsDataURL(file);
  console.log(file);
  console.log(reader.result);
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
 
const saveProduct = () => {
  const formData = new FormData();

  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('photo', form.value.photo);
  formData.append('type', form.value.type);
  formData.append('quantity', form.value.quantity);
  formData.append('price', form.value.price);

  axios.post('/api/products', formData)
    .then(response => {
      (form.value.name = ''),
        (form.value.description = ''),
        (form.value.photo = ''),
        (form.value.type = ''),
        (form.value.quantity = ''),
        (form.value.price = ''),
        router.push('/Admin/');

      toast.fire({
        icon: 'success',
        title: 'Product add successfully',
      });
    })
    .catch(error => {
      Swal.fire(
        'Failed!',
        'There was something wrong. Check if you filled name of the product.',
        'warning'
      );
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
