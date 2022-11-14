<template>  
<div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light pasek">
    <router-link to="/" class="navbar-brand"> Home page</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
    <router-link to='/Login' class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
    <router-link to='/Register' class="nav-link">Register</router-link>
          </li>
      </ul>
          <span class="navbar-text">
          Log in to access app
          </span>
  </nav>
          <h1>Welcome to homepage</h1>
</div>
</template>
  <style>
    .pasek {
    padding: 1%;
    width: 100%;
    opacity: 0.8;
    }
  </style>