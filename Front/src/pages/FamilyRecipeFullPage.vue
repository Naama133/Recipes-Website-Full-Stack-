<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.recipe_name }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
       <h2>The recipe belongs to:<br>{{ recipe.recipe_owner }} </h2>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
                <div>When do we usually use the recipe?: {{ recipe.when_used }}</div>

            </div>
            Ingredients:
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients.split(',')"
                :key="index + '_' + r">
                {{ r }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <br>
            Instructions:
            <ol>
              <li v-for="(s, index) in recipe.analyzedInstructions.split(';')" :key="index + '_' + s">
                {{ s }}
              </li>
            </ol>
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
    };
  },
  async created() {
    try {
      this.recipe = this.$route.params.recipe_data;
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

h2{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    padding: 16px;
}

.favorite_button
{
  cursor: pointer;
}

</style>
