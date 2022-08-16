<template>
  <div class="container">
    <div class="need_login_div" v-if="!$root.store.username">
    <router-link class="need_login" to="/login" tag="button">Login to view this page</router-link>
    </div>
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
              <div>Number of servings: {{ recipe.servings }}</div>
            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
                {{ r.original }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
              <div class="nutrition_signs">
                <div class="favorite_button" @click="FavoriteChange"> 
                <img v-if="!flag" src="../assets/not_favorite_icon.png" width="25" height="25" >
                <img v-if="flag" src="../assets/favorite_icon.png" width="25" height="25" >
                </div>
                  <img v-if="recipe.vegetarian==true || recipe.vegetarian=='true'" src="../assets/vegetarian_icon.png" width="25" height="25" >
                  <img v-if="recipe.vegan==true || recipe.vegan=='true'" src="../assets/vegan_icon.png" width="25" height="25" >
                  <img v-if="recipe.glutenFree==true || recipe.glutenFree=='true'" src="../assets/gluten_free_icon.png" width="25" height="25" >
              </div>
            <br>
            Instructions:
              <div v-for="(name, index) in recipe._instructions_names" :key="name">
                 <div v-if="name"> {{ name }} </div>
                <br>
                <ol> <div>
                  <li v-for="s in recipe._instructions[index]" :key="s.number">{{ s.step }}</li>
                </div></ol>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      flag: false
    };
  },
  methods: {
    async FavoriteChange() {
      let recipe_id = this.$route.params.recipeId
      let response;
      if(this.flag){
        this.flag = false;
        try {          
            response = await this.axios.delete(
          this.$root.store.server_domain +"/users/favorite",
          { withCredentials: true , data:{
            recipeId: recipe_id
          }},
        );
        } catch (error) {
          console.log("error.response.status", error.response.status);
          return;
        }
      }
      else{
        this.flag = true;
        try {        
            response = await this.axios.post(
            this.$root.store.server_domain +"/users/favorites",
                      {
            recipeId: recipe_id

          }
        );
        } catch (error) {
          console.log("error.response.status", error.response.status);
          return;
        }
  
      }
    }
  },
  async created() {
    try {
      if(!this.$root.store.username)
      {
        return;
      }
      let recipe_id = this.$route.params.recipeId
      let response;
      let favorite_response;
      try {
        favorite_response = await this.axios.get(
          this.$root.store.server_domain + "/users/get_favorites_ids", { withCredentials: true });
        if (favorite_response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.favorite_response.status", error.favorite_response.status);
        this.$router.replace("/NotFound");
        return;
      }
      for (let i = 0; i < favorite_response.data.length; i++) {
        if(favorite_response.data[i] == recipe_id)
        {
          this.flag = true;
        }
      }
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/ExpandeRecipeData?recipeID=" + recipe_id, { withCredentials: true });
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      } = response.data;
      let _instructions = analyzedInstructions
        .map((fstep) => {
          return fstep.steps;
        });

      let _instructions_names = analyzedInstructions
        .map((fstep) => {
          return fstep.name;
        });

      let _recipe = {
        _instructions,
        _instructions_names,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings
      };

      if(_recipe.image == undefined)
      {
        _recipe.image = "https://spoonacular.com/recipeImages/2225-556x370.jpg";
      }
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
h1{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px;
}

.favorite_button
{
  cursor: pointer;
}

.need_login{
  background-color: rgb(245, 234, 212);
  border-color: gray;
  box-shadow: 0 10px 15px 0 rgba(0,0,0,0.24), 0 30px 50px 0 rgba(0,0,0,0.19);
}

.need_login:hover
{
  transform: translateY(2px);
  box-shadow: 0 30px 30px 0 rgba(0,0,0,0.24), 0 30px 50px 0 rgba(0,0,0,0.19);
}

.need_login_div
{
  margin-top: 5%;
  justify-content: center;
  display: flex;
}
</style>
