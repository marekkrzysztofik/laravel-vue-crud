<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light pasek">
        
        <router-link to="/" class="navbar-brand"> Home page</router-link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
            <router-link to='/Register' class="nav-link">Register</router-link>
            </li>
</ul>
<span class="navbar-text">
    No siema
  </span>
</nav>
    <div class="login">
        <div class="loginp">
        <form @submit.prevent="register">
            <input class="inp form-label" type="name" placeholder="Enter your name" v-model="form.name"/>
            <br>
            <input class="inp" type="email" placeholder="Enter your email" v-model="form.email"/>
            <br>
            <input class="inp" type="password" placeholder="Enter your password" v-model="form.password"/>
            <br>
            <input class="inp" type="password" placeholder="Confirm your password" v-model="form.c_password"/>
            <br>
            <input class="inp sub" type="submit" value="Register" @click="register()"/>
        </form>
        <p class="text-danger" v-for="error in errors" :key="error">
                <span v-for="err in error" :key="err">{{ err }} </span>
            </p>    
    </div>
    </div>
</div>
</template>

<style>
.inp:hover{
    background-color: azure;
}
.inp:focus{
    background-color: azure;
}
.sub{
    background-color: azure;
    cursor: pointer;
    margin: 2em 0 0 5.5em;
    width: 10em;
}
.sub:hover{
    background-color: rgb(161, 211, 255); 
}
.sub:focus{
    background-color: rgb(14, 142, 255); 
}

.text-danger{
    color: red;
    font-size: 16px;
}
</style>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
 
const router= useRouter()

const form= reactive({
    name:'',
    email: '',
    password: '',
    c_password: '',
})

const errors = ref([])

const register = async() =>{
    
    await axios.post('/api/register', form)
        .then(response=>{
            if(response.data.success) {
                localStorage.setItem('token', response.data.data.token)
                router.push('/')
            } 


            }) .catch(e=> {
                errors.value = e.response.data.message;
        })
}


</script>

