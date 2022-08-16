<template>
    <div>
        <h2>Add Your Own Recipes!<br><br>
        <b-button v-b-modal.modal-prevent-closing squared variant="outline-secondary" b-button size="lg" ><b>Create New Recipe</b></b-button>
       </h2>
        <b-modal id="modal-prevent-closing" ref="modal" title="Submit Your Recipe Details" 
            @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
            
                <b-form-group label="Recipe title" label-for="title" invalid-feedback="Title is required" :state="titleState">
                    <b-form-input id="title" placeholder="Enter title" v-model="title" :state="titleState"
                        required></b-form-input>
                </b-form-group>

                <b-form-group label="Preparation time" label-for="time" invalid-feedback="Preparation time is required" :state="timeState">
                    <b-form-input id="time" type="number" v-model="time" :state="timeState"
                        required></b-form-input>
                </b-form-group>

                <label for="myCheck">Vegan</label> <input type="checkbox" id="vegan"><br>
                <label for="myCheck">  Vegetarian  </label> <input type="checkbox" id="vegetarian"><br>
                <label for="myCheck">  Gluten Free  </label> <input type="checkbox" id="glutenFree"><br><br>

                <b-form-group label="Number of servings:" label-for="servings" invalid-feedback="Number of serving is required" :state="servingsState">
                    <b-form-input id="servings" type="number" min=1 placeholder="Enter number of servings" v-model="servings"
                        :state="servingsState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Picture of the dish:" label-for="image" :state="imageState">
                    <b-form-input id="image" v-model="image"
                        :state="imageState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Enter ingredients" label-for="extendedIngredients"  invalid-feedback="Ingredients is required" :state="extendedIngredientsState">
                    <b-form-input id="extendedIngredients" placeholder="For exemple: 3 eggs, 1 cup of sugar.." v-model="extendedIngredients"
                        :state="extendedIngredientsState" required>
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Enter instructions" label-for="analyzedInstructions" invalid-feedback="Instructions is required" :state="analyzedInstructionsState">
                    <b-form-input id="analyzedInstructions" placeholder="For exemple: Mix it all up, Enjoy.." v-model="analyzedInstructions" :state="analyzedInstructionsState" required>
                    </b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>

import { BButton, BModal, VBModal } from "bootstrap-vue";
import { title } from 'process'
// ingredients
export default {
    components: {
        BButton,
        BModal,
        
    },
    directives: { 
            'b-modal': VBModal 
        },
    data() {
        return {
            componentKey: 0,
            submitError: undefined,
            title: '',
            titleState: null,
            time: '',
            timeState: null,
            vegan: false,
            vegetarian: false,
            glutenFree: false,
            servings: '',
            servingsState: null,
            analyzedInstructions: '',
            analyzedInstructionsState: null,
            imageState:null,
            aggregateLikes: "0",
            image: '',
            extendedIngredients: '',
            extendedIngredientsState: null,
        }
    },

    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            const StateObj = document.getElementById("title");
            if (!StateObj.checkValidity()) {
                this.titleState = false;
            }

            const timeStateObj = document.getElementById("time");
            if (!timeStateObj.checkValidity()) {
                this.timeState = valid;
            }

            const servingsStateObj = document.getElementById("servings");
            if (!servingsStateObj.checkValidity()) {
                this.servingsState = false;
            }

            const IngredientsObj = document.getElementById("extendedIngredients");
            if (!IngredientsObj.checkValidity()) {
                this.extendedIngredientsState = false;
            }


            const InstructionsObj = document.getElementById("analyzedInstructions");
            if (!InstructionsObj.checkValidity()) {
                this.analyzedInstructionsState = false;
            }

            return valid
        },
        resetModal() {
            this.title = ''
            this.titleState = null
            this.time = ''
            this.timeState = null
            this.servings = ''
            this.servingsState = null
            this.vegan=false
            this.vegetarian=false
            this.glutenFree=false
            this.image = 'https://spoonacular.com/recipeImages/2221-556x370.jpg'
            this.imageState = null
            this.analyzedInstructions = ''
            this.analyzedInstructionsState = null
            this.extendedIngredients = ''
            this.extendedIngredientsState = null
        },
        handleOk(bvModalEvent) {
            
            bvModalEvent.preventDefault()
            console.log('-------submit-------');
            this.handleSubmit()
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                        console.log("not")
            return
            }
            this.createMyRecipe();

            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })

        }, async createMyRecipe() {
            try {
                console.log('time: ',this.time );
                console.log('Likes: ',this.aggregateLikes );
                var vegan=document.getElementById("vegan");
                var vegetarian=document.getElementById("vegetarian");
                var glutenFree=document.getElementById("glutenFree");

               

                const response = await this.axios.post(
                    "https://allrecipes.cs.bgu.ac.il/users/add_personal_recipe",
    
                    {
                        title: this.title,
                        readyInMinutes: this.time,
                        image: this.image,
                        aggregateLikes: this.aggregateLikes,
                        vegan: vegan.checked,
                        vegetarian: vegetarian.checked,
                        glutenFree: glutenFree.checked,
                        servings: this.servings,
                        analyzedInstructions: this.analyzedInstructions,
                        extendedIngredients: this.extendedIngredients
                    }
                );

                console.log("Add personal recipe", response);

                this.componentKey += 1;
            } catch (err) {
                console.log("error123: ", err.response);
                this.submitError = err.response.data.message;
            }
        },
    }
}
</script>

<style>
h2
{
    text-align:center; 
    color: rgb(182, 99, 22);
    font-family:'Gill Sans', 'Gill Sans MT';
    background-color: rgb(245, 234, 212);
    font-size: 30px;
    padding: 20px;
}

.b-button{
  font-family: 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif;
  
  

}
</style>