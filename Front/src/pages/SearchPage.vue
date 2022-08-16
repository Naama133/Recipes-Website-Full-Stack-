<template>
  <div class="container">
    <h1 class="title">Search for our recipes..</h1>

      <div class="input-query">
        <input size="50" type="text" placeholder="What recipes would you like to explore?" v-model="LastQuery" required @keyup="SearchAction">
      </div>
      <div v-if="!this.is_query" class="error_search">
        <p>You must enter a query..</p>
      </div>
      
      <div class="search_filters">
        <b-form-select class="options" v-model="form.results_number" :options="number_options"></b-form-select><br>
        <b-form-select class="options" v-model="form.cuisine" :options="cuisine_options"></b-form-select><br>
        <b-form-select class="options" v-model="form.diet" :options="diet_options"></b-form-select><br>
        <b-form-select class="options" v-model="form.intolerance" :options="intolerance_options"></b-form-select>
      </div>
      <br>

      <b-button class="reset_button" variant="outline-info" @click="onReset">Reset Filters</b-button>
      <div class="search_button">
      <div @click="onSearch"> <img src="../assets/search_icon.png" width="25" height="25" ></div>
      </div>

      <div v-if="this.is_search_return">
          <div class="sort_button" v-if="!search_results.length==0"> 
            <b-dropdown size="sm" id="dropdown-1" text="Sort recipes by" class="m-md-2">
              <b-dropdown-item @click="TimeSort">Cooking Time</b-dropdown-item>
              <b-dropdown-item @click="PopularitySort">Popularity</b-dropdown-item>
            </b-dropdown>
          </div>
      </div>
      
      <b-row v-if="this.is_search_return">
        <b-col v-for="r in search_results" :key="r.id">
          <RecipePreview style="width: 450px; height:273px; text-align:center;"  class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>

      <div v-if="this.is_search_return">
            <div class="center_error" v-if="search_results.length==0">
              <h2>Unfortunately we do not have any result matching to your search...<br>Please try again</h2>
          </div>
      </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "Search",
  components: {
    RecipePreview
  },
  data() {
    return {
      search_results: [],
      cuisine_options: [{ value: "", text: 'Cusine', disabled: true}],
      diet_options: [{ value: "", text: 'Diet', disabled: true}],
      number_options: [5, 10, 15],
      intolerance_options: [{ value: "", text: 'Intolerance', disabled: true}],
      form: {
        results_number: 5,
        cuisine: "",
        diet: "",
        intolerance: "",
        submitError: undefined
      },
      LastQuery: sessionStorage.getItem("LastQuery"),
      is_query: true,
      is_search_return: false,
    };
  },
  async created() {
      try {
        let response;
        response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/search_filtering_options", { withCredentials: true });
        if (response.status !== 200) this.$router.replace("/NotFound");
        this.cuisine_options.push(...response.data[0][0].split(","));
        this.diet_options.push(...response.data[1][0].split(","));
        this.intolerance_options.push(...response.data[2][0].split(","));
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async onSearch() {
      this.is_search_return = false;
      let response;
      if(this.LastQuery == null || this.LastQuery == undefined || this.LastQuery == "")
      {
        this.is_query = false;
        return;
      }
      this.is_query = true;
      try {
        response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search?query=" + this.LastQuery + "&number=" + this.form.results_number
          + "&cuisine='" + this.form.cuisine + "'&diet=" + this.form.diet + "&intolerance=" + this.form.intolerance, { withCredentials: true });
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.is_search_return = true;
      const recipes = response.data;
      this.search_results = [];
      this.search_results.push(...recipes);
      sessionStorage.setItem("LastQuery", this.LastQuery);
    },
    onReset() {
        this.form.results_number = 5;
        this.form.cuisine = "";
        this.form.diet = "";
        this.form.intolerance = "";
    },
    TimeSort() {
      this.search_results.sort((recipe_1, recipe_2) => {
          return recipe_1.readyInMinutes - recipe_2.readyInMinutes;
        });
    },
    PopularitySort() {
      this.search_results.sort((recipe_1, recipe_2) => {
          return recipe_2.aggregateLikes - recipe_1.aggregateLikes;
        });
    },
    SearchAction()
    {
      if(!this.is_query)
      {
        if(this.LastQuery != "")
        {
          this.is_query = true;
        }
      }
    }
    }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 60%;
  text-align: center;

}

.input-query
{
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
h1{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px;
}

.search_button
{
  width: 5%;
  display: flex;
  justify-content: center;
  margin: 0 0 10px;
  cursor: pointer;
  flex-direction: row;
  margin: 5px auto;
  margin-bottom: 15px;
}

.search_button:hover
{
  transform: translateY(-2px);
}

.error_search
{
  color: red;
}
.options
{
  justify-content: center;
  display: flex;
  width: 21%;
  margin: 5px auto;
}

.search_filters
{
  justify-content: center;
  display: flex;
  flex-direction: row;
}
.center_error
{
  display: flex;
  justify-content: center;
  font-size: 20px;
}
.title
{
  margin: 0 0 20px;
}

.reset_button
{
    margin: 0 0 20px;
}

.reset_button:hover
{
  transform: translateY(-2px);
}

h2{
    text-align:center;
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    font-size: 20px;
    padding: 20px;
    margin: 0 0 20px;
}
</style>
