(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23712140"],{"2f1d":function(e,t,s){},6619:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container"},[e.$root.store.username?e._e():i("div",{staticClass:"need_login_div"},[i("router-link",{staticClass:"need_login",attrs:{to:"/login",tag:"button"}},[e._v("Login to view this page")])],1),e.recipe?i("div",[i("div",{staticClass:"recipe-header mt-3 mb-4"},[i("h1",[e._v(e._s(e.recipe.title))]),i("img",{staticClass:"center",attrs:{src:e.recipe.image}})]),i("div",{staticClass:"recipe-body"},[i("div",{staticClass:"wrapper"},[i("div",{staticClass:"wrapped"},[i("div",{staticClass:"mb-3"},[i("div",[e._v("Ready in "+e._s(e.recipe.readyInMinutes)+" minutes")]),i("div",[e._v("Likes: "+e._s(e.recipe.aggregateLikes)+" likes")]),i("div",[e._v("Number of servings: "+e._s(e.recipe.servings))])]),e._v(" Ingredients: "),i("ul",e._l(e.recipe.extendedIngredients,(function(t,s){return i("li",{key:s+"_"+t.id},[e._v(" "+e._s(t.original)+" ")])})),0)]),i("div",{staticClass:"wrapped"},[i("div",{staticClass:"nutrition_signs"},[i("div",{staticClass:"favorite_button",on:{click:e.FavoriteChange}},[e.flag?e._e():i("img",{attrs:{src:s("72bc"),width:"25",height:"25"}}),e.flag?i("img",{attrs:{src:s("4295"),width:"25",height:"25"}}):e._e()]),1==e.recipe.vegetarian||"true"==e.recipe.vegetarian?i("img",{attrs:{src:s("9315"),width:"25",height:"25"}}):e._e(),1==e.recipe.vegan||"true"==e.recipe.vegan?i("img",{attrs:{src:s("06ef"),width:"25",height:"25"}}):e._e(),1==e.recipe.glutenFree||"true"==e.recipe.glutenFree?i("img",{attrs:{src:s("5f79"),width:"25",height:"25"}}):e._e()]),i("br"),e._v(" Instructions: "),e._l(e.recipe._instructions_names,(function(t,s){return i("div",{key:t},[t?i("div",[e._v(" "+e._s(t)+" ")]):e._e(),i("br"),i("ol",[i("div",e._l(e.recipe._instructions[s],(function(t){return i("li",{key:t.number},[e._v(e._s(t.step))])})),0)])])}))],2)])])]):e._e()])},r=[],a={data(){return{recipe:null,flag:!1}},methods:{async FavoriteChange(){let e,t=this.$route.params.recipeId;if(this.flag){this.flag=!1;try{e=await this.axios.delete(this.$root.store.server_domain+"/users/favorite",{withCredentials:!0,data:{recipeId:t}})}catch(s){return void console.log("error.response.status",s.response.status)}}else{this.flag=!0;try{e=await this.axios.post(this.$root.store.server_domain+"/users/favorites",{recipeId:t})}catch(s){return void console.log("error.response.status",s.response.status)}}}},async created(){try{if(!this.$root.store.username)return;let t,s,i=this.$route.params.recipeId;try{s=await this.axios.get(this.$root.store.server_domain+"/users/get_favorites_ids",{withCredentials:!0}),200!==s.status&&this.$router.replace("/NotFound")}catch(e){return console.log("error.favorite_response.status",e.favorite_response.status),void this.$router.replace("/NotFound")}for(let e=0;e<s.data.length;e++)s.data[e]==i&&(this.flag=!0);try{t=await this.axios.get(this.$root.store.server_domain+"/recipes/ExpandeRecipeData?recipeID="+i,{withCredentials:!0}),200!==t.status&&this.$router.replace("/NotFound")}catch(e){return console.log("error.response.status",e.response.status),void this.$router.replace("/NotFound")}let{analyzedInstructions:r,extendedIngredients:a,aggregateLikes:n,readyInMinutes:o,image:c,title:d,vegan:l,vegetarian:u,glutenFree:g,servings:p}=t.data,v=r.map(e=>e.steps),h=r.map(e=>e.name),_={_instructions:v,_instructions_names:h,analyzedInstructions:r,extendedIngredients:a,aggregateLikes:n,readyInMinutes:o,image:c,title:d,vegan:l,vegetarian:u,glutenFree:g,servings:p};void 0==_.image&&(_.image="https://spoonacular.com/recipeImages/2225-556x370.jpg"),this.recipe=_}catch(e){console.log(e)}}},n=a,o=(s("f6a9"),s("2877")),c=Object(o["a"])(n,i,r,!1,null,"75f67d00",null);t["default"]=c.exports},f6a9:function(e,t,s){"use strict";s("2f1d")}}]);
//# sourceMappingURL=chunk-23712140.c777b962.js.map