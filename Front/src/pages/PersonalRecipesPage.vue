<template>
  <b-container>
 <h1 class="title">My Recipes</h1>
 
      <div class="div_center">
        <b-row>
          <b-col v-for="r in recipes" :key="r.id" >
            <RecipePreview class="recipePreview" :recipe="r" />
          </b-col>
        </b-row>
      </div>

      <div v-if="recipes.length==0" class="center_div">
          <h2>
            You don't have any personal recipe,<br>and you are more than welcome to add one!
          </h2>
      </div>
  </b-container>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.personalRecipes();
  },
  methods: {
    async personalRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/get_personal_recipe", { withCredentials: true }

        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
  
  background-color: rgb(245, 234, 212);
}

h1{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px;
}
h2
{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    font-size: 30px;
    padding: 20px;
}
.btn {
  border: none;
  outline: none;
  padding: 10px 16px;
  background-color: #f1f1f1;
  cursor: pointer;
}
.active, .btn:hover {
  background-color: #666;
  color: white;
}
#search-input {
  margin-left: 20px; 
  width: 500px; 
}

.div_center
{
  margin: 0 auto;
  margin-left: 7%; 
}
</style>