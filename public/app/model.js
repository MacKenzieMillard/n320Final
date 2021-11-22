// ive been beating my head on this for hours i cannot figure this out im resigned to a bad grade tbh sorry

var MODEL = (function(){
    var homeContent = `<div class="home">
    <div class="pinkCircle">
      <p>Want to be a Jungle Cook? Go ahead and the kitchen is yours!</p>
    </div>
    <div class="yellowCircle">
      <h1>The Jungle Cook</h1>
      <h6>
        The home to various recipes of your choice. Add your own recipe
        today and fill the world with joy!
      </h6>
    </div>
  </div>
  `;
    var browseContent = `<div class="browse">
    <h1>Recipes: Try some today!</h1>
    <div class="gallery">
      <div class="pizza">
        <div class="pizzaImg"></div>
        <div class="description">
          <h3>Supreme Pizza</h3>
          <p>
            Make pizza night super duper out of this world with homemade
            pizza. This recipe is supreme with vegetables and two types of
            meat. Yum!
          </p>
          <div class="cookTime">
            <img src="images/time.svg" alt="" />
            <p>1h 24min</p>
          </div>
          <div class="servings">
            <img src="images/servings.svg" alt="" />
            <p>4 servings</p>
          </div>
        </div>
      </div>
      <div class="burger">
        <div class="burgerImg"></div>
        <div class="description">
          <h3>Classic Burger</h3>
          <p>
            Sink your teeth into a delicious restaurant-style, hamburger
            recipe made from lean beef. Skip the prepackaged patties and
            take the extra time to craft up your own, and that little extra
            effort will be worth it.
          </p>
          <div class="cookTime">
            <img src="images/time.svg" alt="" />
            <p>30 min</p>
          </div>
          <div class="servings">
            <img src="images/servings.svg" alt="" />
            <p>4 servings</p>
          </div>
        </div>
      </div>
      <div class="pilaf">
        <div class="pilafImg"></div>
        <div class="description">
          <h3>Chicken Biryani</h3>
          <p>
            Chicken Biryani is a bold and flavorful Indian dish with crazy
            tender bites of chicken with bell peppers in a deliciously
            spiced and fragrant rice.
          </p>
          <div class="cookTime">
            <img src="images/time.svg" alt="" />
            <p>1hr 15min</p>
          </div>
          <div class="servings">
            <img src="images/servings.svg" alt="" />
            <p>6 servings</p>
          </div>
        </div>
      </div>
      <div class="chowMein">
        <div class="chowImg"></div>
        <div class="description">
          <h3>Ch. Chow Mein</h3>
          <p>
            A great Chow Mein comes down to the sauce - it takes more than
            just soy sauce and sugar! Jam packed with a surprising amount of
            hidden vegetables, customize this Chicken Chow Mein recipe using
            your protein of choice!
          </p>
          <div class="cookTime">
            <img src="images/time.svg" alt="" />
            <p>20 min</p>
          </div>
          <div class="servings">
            <img src="images/servings.svg" alt="" />
            <p>4 servings</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
    var createRecipeContent = `<div class="createRecipe">
    <h1>Hey, create your recipe!</h1>
    <div class="recipeForm">
      <input id="attachFile" type="text" placeholder="Add Recipe Image" />
      <input type="text" placeholder="Recipe Name" />
      <input type="text" placeholder="Recipe Description" />
      <input type="text" placeholder="Recipe Total Time" />
      <input type="text" placeholder="Recipe Serving Size" />
      <p>Enter Ingredients:</p>
      <input type="text" placeholder="Ingredient #1" />
      <input type="text" placeholder="Ingredient #2" />
      <input type="text" placeholder="Ingredient #3" />
      <p>Enter Instructions:</p>
      <input type="text" placeholder="Instruction #1" />
      <input type="text" placeholder="Instruction #2" />
      <input type="text" placeholder="Instruction #3" />
      <input
        id=".createRecipeBtn"
        type="submit"
        name="submit"
        onclick="addMainList()"
        value="Create Recipe"
      />
      <div class="createRecipeAlert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
      Congrats! You've made a recipe!
      </div>
    </div>
  </div>
  `;
    var yourRecipesContent = `<div class="yourRecipes">
    <h1>Hey, here are your recipes!</h1>
    <div class="gallery">
      <div class="recipe">
        <div class="pizza">
          <div id="recipeThumb" class="pizzaImg">
            <a id="recipeDetails" href="recipeDetails.html">View</a>
          </div>
          <div class="description">
            <h3 id="recipeTitle">Supreme Pizza</h3>
            <p id="recipeDescription">
              Make pizza night super duper out of this world with homemade
              pizza. This recipe is supreme with vegetables and two types of
              meat. Yum!
            </p>
            <div class="cookTime">
              <img src="images/time.svg" alt="" />
              <p id="recipeTime">1h 24min</p>
            </div>
            <div class="servings">
              <img src="images/servings.svg" alt="" />
              <p id="recipeServings">4 servings</p>
            </div>
          </div>
        </div>
        <div class="buttonHolder">
          <div class="button">Edit Recipe</div>
          <div class="button">Delete</div>
        </div>
      </div>
    </div>
  </div>
  `;
    var editRecipeContent = `<div class="editRecipe">
    <h1>Hey Michael, edit your recipe!</h1>
    <div class="recipeForm">
      <input id="attachFile" type="text" placeholder="Edit Recipe Image" />
      <input type="text" placeholder="Supreme" />
      <input
        type="text"
        placeholder="Make pizza night super duper out of this…"
      />
      <input type="text" placeholder="1h 24 min" />
      <input type="text" placeholder="4 servings" />
      <p>Edit Ingredients:</p>
      <input type="text" placeholder="Ingredient #1" />
      <input type="text" placeholder="Ingredient #2" />
      <input type="text" placeholder="Ingredient #3" />
      <p>Edit Instructions:</p>
      <input type="text" placeholder="Instruction #1" />
      <input type="text" placeholder="Instruction #2" />
      <input type="text" placeholder="Instruction #3" />
    </div>
    <div class="addList">
      <input
        type="submit"
        name="submit"
        onclick="addMainList()"
        value="Add Recipe"
      />
    </div>
  </div>
  `;

  // i never figured out how to include other links into only one page when its not in the nav
    var recipeDetailsContent = `<div class="recipeDetails">
    <h1>supreme pizza</h1>
    <div class="description">
      <img src="images/recipe-pizza.jpg" alt="supreme pizza" />
      <div class="des">
        <h2>Description:</h2>
        <p>
          Make pizza night super duper out of this world with homemade
          pizza. This recipe is supreme with vegetables and two types of
          meat. Yum!
        </p>
        <h3>Total Time:</h3>
        <h4>1hr 24min</h4>
        <h3>Servings:</h3>
        <h4>4 servings</h4>
      </div>
    </div>
    <div class="ingredients">
      <h2>Ingredients:</h2>
      <p>1/4 batch pizza dough</p>
      <p>2 tablespoons Last-Minute Pizza Sauce</p>
      <p>10 slices pepperoni</p>
      <p>1 cup cooked and crumbled Italian sausage</p>
      <p>2 large mushrooms, sliced</p>
      <p>1/4 bell pepper, sliced</p>
      <p>1 tablespoon sliced black olives</p>
      <p>1 cup shredded mozzarella cheese</p>
    </div>
    <div class="instructions">
      <h2>Instructions:</h2>
      <p>
        1. Preheat the oven to 475°. Spray pizza pan with nonstick cooking
        or line a baking sheet with parchment paper.
      </p>
      <p>2. Flatten dough into a thin round and place on the pizza pan.</p>
      <p>3. Spread pizza sauce over the dough.</p>
      <p>4. Layer the toppings over the dough in the order listed.</p>
      <p>
        5. Bake for 8 to 10 minutes or until the crust is crisp and the
        cheese melted and lightly browned.
      </p>
    </div>
    <div class="editBtn">
      <a id="editRecipe" href="#">Edit Recipe</a>
    </div>
  </div>
  `;
    var logInContent = `<div class="account">
    <div class="logIn">
      <h1>Login Here!</h1>
      <input id="log-email" type="email" placeholder="Email Address" />
      <input id="log-pw" type="password" placeholder="Password" />
      <div class="submit">
        <input type="submit" name="submit" onclick="login()" value="Login" />
      </div>
    </div>
    <div class="createAccount">
      <p>don’t have an account?</p>
      <h1>Sign Up!</h1>
      <input name="fName" id="fName" type="text" placeholder="First Name" />
      <input name="lName" id="lName" type="text" placeholder="Last Name" />
      <input name="email" id="email" type="email" placeholder="Email Address" />
      <input name="password" id="pw" type="password" placeholder="Password" />
      <div class="submit">
        <input name="submit" type="submit" value="Sign Up" onclick="createAccount()" />
      </div>
    </div>
  </div>
  `;
  
  var _changePageContent = function(pageName){
    let contentName = pageName + "Content";
    $("#app").html(eval(contentName));
    
};
  
  return{
    changePageContent: _changePageContent,
}

})();