import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/users/favorites",
    name: "favorites",
    component: () => import("./pages/FavoriteRecipePage"),
  },
  {
    path: "/users/family_recipes",
    name: "familyRecipe",
    component: () => import("./pages/FamilyRecipesPage"),
  },
  {
    path: "/users/family_recipe_page",
    name: "familyRecipePage",
    component: () => import("./pages/FamilyRecipeFullPage"),
  },
  {
    path: "/users/get_personal_recipe",
    name: "personalRecipes",
    component: () => import("./pages/PersonalRecipesPage"),
  },
  {
    path: "/users/personal_recipe_view/:recipeId",
    name: "personal_recipe_view",
    component: () => import("./pages/PersonalRecipeView"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/users/add_personal_recipe",
    name: "addPersonalRecipes",
    component: () => import("./pages/addPersonalRecipePage"),
  },



  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
