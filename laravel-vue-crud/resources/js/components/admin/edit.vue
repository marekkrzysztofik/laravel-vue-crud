<template> 
  <div class="container">
    <div class="card">
      <TabMenu :model="items"> </TabMenu>
      <router-view />
    </div>
    <div class="cards">
      
      <Card style="width: 25rem; margin-top: 2em">
              <template #title>
                  <h1>Add product</h1>
              </template>
              <template #content>
                
                  <h3>Name</h3>
            <InputText
              type="text"
              v-model="form.name" />
          
          <p></p><h4>Description</h4>
          <Textarea v-model="form.description" rows="7" cols="40" /> 
              </template>
          </Card>
          <Card class="card-2" style="width: 25rem; margin-top: 2em">
              
              <template #content>
                <p>
                  <h3>Type</h3>
            <InputText>
              type="text"
              v-model="form.type" </InputText> </p>
            
              <p>
                  <h3>Inventory</h3>
            <InputText
              type="text"
              v-model="form.quantity" /> </p>
              <p>
                  <h3>Price</h3>
            <InputText
              type="text"
              v-model="form.price" /> </p>
              <FileUpload mode="basic" :customUpload="true" :multiple="true" @uploader="uploadPhoto" />
              <p></p>
              <Button label="Save" @click="updateProduct()" class="p-button-rounded right"  />
            </template>
          </Card>
          
          
        
        </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
  id: '',
  name: '',
  description: '',
  photo: '',
  type: '',
  quantity: '',
  price: '',
});

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

const updatePhoto = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onloadend = file => {
    form.value.photo = reader.result;
  };
  reader.readAsDataURL(file);
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

  axios
    .patch(`/api/products/${form.value.id}`, formData)
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
        title: 'Product edited successfully',
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