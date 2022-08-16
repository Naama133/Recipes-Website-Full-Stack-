<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <h2 class="subTitles">
      <RecipePreviewList title="Explore this recipes" class="RandomRecipes center" />
    </h2>
   <div>
    <h5 class="subTitles">
      <b-container class="need_login" v-if="!$root.store.username" >
        <h1 class="title"><br>Login</h1>
        <div class="h1LG">
          <b-form @submit.prevent="onLogin">
            <b-form-group style="font-family:'Gill Sans', 'Gill Sans MT'; " id="input-group-Username" label-cols-sm="3" label="Username:" label-for="Username">
            <b-form-input style="font-family:'Gill Sans', 'Gill Sans MT'; " id="Username" v-model="$v.form.username.$model" type="text" :state="validateState('username')"></b-form-input>
            <b-form-invalid-feedback>Username is required</b-form-invalid-feedback></b-form-group>
            
            <b-form-group style="font-family:'Gill Sans', 'Gill Sans MT'; " id="input-group-Password" label-cols-sm="3" label="Password:" label-for="Password">
            
            <b-form-input id="Password" type="password" v-model="$v.form.password.$model" :state="validateState('password')"></b-form-input>
            <b-form-invalid-feedback>Password is required</b-form-invalid-feedback></b-form-group>
              
            <b-button type="submit" variant="primary" style="width:100px;display:block;color:rgb(245, 234, 212); background-color: rgb(175, 129, 38);" class="mx-auto w-100">Login</b-button>
      
            <div class="mt-2"  style="font-family:'Gill Sans', 'Gill Sans MT';">Do not have an account yet?
              <router-link to="register"> Register in here</router-link>
            </div>
          </b-form>

          <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>Login failed: {{ form.submitError }}</b-alert>
        </div>
        </b-container>

       <b-container v-if="$root.store.username">
        <h3 class="title"><br>Last Viewed Recipes</h3>
                <div v-if="recipes.length==0" class="center_div">
                    You have not yet viewed any recipes on our website...
                </div>
                 <b-col >
                  <b-row v-for="r in recipes" :key="r.id" >
                  <RecipePreview  style="width: 500px; height:300px;" class="recipePreview" :recipe="r" />
                </b-row>
                </b-col>
              
      </b-container>
    </h5>
   </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import RecipePreviewList from "../components/RecipePreviewList";
import RecipePreview from "../components/RecipePreview.vue";
export default {
  components: {
    RecipePreviewList,
    RecipePreview
   },
  data() {
    return {
      recipes: [],
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
   validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  mounted() {
    this.LastThreeViewes();
    
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        
        const response = await this.axios.post(
          this.$root.store.server_domain +"/Login",
          {
            username: this.form.username,
            password: this.form.password
          }
        );
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.username);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async LastThreeViewes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/getThreeLastViewedRecipes", { withCredentials: true }
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
      } catch (error) {
        console.log(error);
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");
      this.Login();
    }
  }
  
};
</script>

<style lang="scss" scoped>
h5
{
position:absolute;
  left: 760px;
  right: 180px;
  top:220px;
  height: 1307px;

  background-color: rgb(245, 234, 212);
}
.RandomRecipes {
  margin: 10px 0 50px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;

}
h1
{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px; 
}
h3
{
  font-size: 40px;
  text-align:center; 
  color: rgb(182, 99, 22);
  font-family:'Gill Sans', 'Gill Sans MT';
  background-color: rgb(245, 234, 212);
  margin-top: 45px;
  margin-bottom: 25px;
 
}
h2
{
    text-align:center;
    color: rgb(108, 84, 61);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 50px;
    margin: 20px 0 10px;
    height: 1300px;
    width: 550px;
    top:900px;

}

.need_login{

  border-color: gray;
  color: rgb(113, 68, 17);
  box-shadow: 0 10px 15px 0 rgba(0,0,0,0.24), 0 30px 50px 0 rgba(0,0,0,0.19);
  font-size: 20px;
  top:100px;
  height: 1300px;
}

.need_login:hover
{
  transform: translateY(2px);
  box-shadow: 0 30px 30px 0 rgba(0,0,0,0.24), 0 30px 50px 0 rgba(0,0,0,0.19);
}

.center_div {
  display: flex;
  justify-content: center;
  font-size: 20px;
}

.containerLG {
  max-width: 400px;
}
.h1LG{
    text-align:center; 
    color: rgb(217, 191, 166);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    padding: 20px;
    
}
</style>