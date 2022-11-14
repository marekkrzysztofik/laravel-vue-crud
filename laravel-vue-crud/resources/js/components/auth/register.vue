<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router= useRouter()

let form= reactive({
    name:'',
    email: '',
    password: '',
    c_password: '',
})

let errors = ref([])

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

<template>
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