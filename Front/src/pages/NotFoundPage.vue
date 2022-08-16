<template>
  <div>
    <div class="container" id="not_found_page">
      <br><br><br><br><br><br>
      <h1>Sorry, we can't find this page</h1>
      <br><br><br><br><br><br>
    </div>
      <router-link to="/" exact id="backhome">Back to Home</router-link>
  </div>
</template>
<style>
h1{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px;
}

#not_found_page
{
 background-image: url("../assets/diy-food-photography-backgrounds.jpg");
}

#backhome
{
  display: block;
  text-align: center;
  color: black;
}
</style>