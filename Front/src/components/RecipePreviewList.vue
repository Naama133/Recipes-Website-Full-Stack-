<template>
  <b-container>
    <h3>
      <h1>{{ title }}</h1>
      <b-col>
      <div class="div_center">
      <b-row  v-for="r in recipes" :key="r.id">
        <RecipePreview style="text-align:center;"  class="recipePreview" :recipe="r" />
      </b-row>  </div>
      
      <div>
        <b-button class="random_btn" pill variant="info" @click="updateRecipes">More recieps</b-button>
      </div>      
     </b-col>
      </h3>    
  </b-container>
</template>

<script>
import { thistle } from "color-name";
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random", { withCredentials: true }
        );

        // console.log(response);
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.container {
  max-height: 100px;
  max-width: 400px;
}
h3
{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 10px;
    

}
.random_btn
{
  margin-top: 40%;
  width: 90%;
  margin-left: 10%;
}
.random_btn:hover
{

  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.random_btn:active
{
  transform: translateY(1px);

}

h1
{
    text-align:center; 
    width: 400px;
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
}

</style>