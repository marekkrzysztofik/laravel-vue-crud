<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router= useRouter()

let form= reactive({
    email: '',
    password: '',
})
  
let error = ref('')

const login = async() =>{
    await axios.post('/api/login', form)
        .then(response=>{
            if(response.data.success) {
                localStorage.setItem('token', response.data.data.token)
                router.push('/Admin/')
            } else {
                error.value = response.data.message;
            }
        })
}

</script>

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
    Log in to access app
  </span>
</nav>
    <div class="login">
        <div class="loginp">
            <p class="text-danger" v-if="error">{{ error }}</p>
        <form @submit.prevent="login">
            <input class="inp" type="email" placeholder="Enter your email" v-model="form.email"/>
            <br>
            <input class="inp" type="password" placeholder="Enter your password" v-model="form.password"/>
            <br>
            <input class="inp sub" type="submit" value="Login"/>
        </form>
        </div>
    </div>
    </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
}
.login{
    
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    }
.loginp{
    
    width: 22.8em;
    height: 55em;
    border-radius: 15%;
    padding: 20px;
    display: flex;
    margin: 0 auto 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    
}
.inp{
    
    border: none;
    padding: 1.25rem;
    width: 20em;
    margin: 0.5em;
    font-size: 16px;
}
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