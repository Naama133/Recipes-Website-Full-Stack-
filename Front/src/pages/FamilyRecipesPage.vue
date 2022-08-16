<template>
  <b-container>
 <h1 class="title">Family Recipes</h1>

    <div>
       <b-container>
                <div v-if="recipes.length==0" class="center_div">
                  <h2>
                      You don't have any family-recipe...
                 </h2>
                </div>
              <b-row >
                <b-col v-for="r in recipes" :key="r.id" >
                  <FamilyRecipePreview style="width: 270px; height:273px" class="recipePreview" :recipe="r" />
                </b-col>
              </b-row>
      </b-container>
   </div>

  </b-container>
</template>

<script>
import FamilyRecipePreview from "../components/FamilyRecipePreview.vue";
export default {
  components: {
    FamilyRecipePreview
  },
  data() {
    return {
      user_id: "",
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
          this.$root.store.server_domain + "/users/family_recipes", { withCredentials: true }
        );
        const user_id = response.data.user_id;
        this.user_id = user_id;
        
        this.recipes = [];
        this.recipes.push(response.data[0].recipe_1);
        this.recipes.push(response.data[0].recipe_2);
        this.recipes.push(response.data[0].recipe_3);
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

/* Style the active class (and buttons on mouse-over) */
.active, .btn:hover {
  background-color: #666;
  color: white;
}
#search-input {
  margin-left: 20px; 
  width: 
  500px; 
}
</style>

