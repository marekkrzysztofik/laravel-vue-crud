import { ref } from 'vue';

export function usePhoto()  {
  const form  = ref({
    name: '',
    description: '',
    photo: '',
    type: '',
    quantity: '',
    price: '',
  });
  function uploadPhoto(e) {
    const file = e.files[0];
    const reader = new FileReader();
  
  reader.onloadend = file => {
    form.value.photo = reader.result;
  };
  reader.readAsDataURL(file);
};
  return {uploadPhoto, form};
};