const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const recipes = [
    {
        id: 1,
        name: "tomato and cheese pasta",
        image: 'https://via.placeholder.com/150',
        calories: 500,
        ingrdients: ["Tomatoes","Cheese"],
        instructions:"1. boil Pasta. \n2. stir fry tomatoes \n3. mix them all well. \n4. ENJOY!! ",
    },
    {
        id: 2,
        name: "chiken stir fry",
        image: 'https://via.placeholder.com/150',
        calories: 800,
        ingrdients: ["Chicken","Broccoli","Carrots"],
        instructions:"1. Cook chicken\n2. Add vegetables\n3. Stir-fry until done\n4. ENJOY!!",
    }
]

//calories
pp.get('/api/recipes', (req, res) => {
    const { calorieGoal, ingredients } = req.query;
    const calorieGoalInt = parseInt(calorieGoal) || Infinity;
    const ingredientList = ingredients ? ingredients.split(',').map(i => i.trim()) : [];

    const filteredRecipes = recipes.filter(recipe => {
        const calorieMatch = recipe.calories <= calorieGoalInt;
        const ingredientMatch = ingredientList.length === 0 || 
            ingredientList.every(ingredient => recipe.ingredients.includes(ingredient));
        return calorieMatch && ingredientMatch;
    });

    res.json(filteredRecipes);
});

// instructions
app.get('/api/recipes/:id', (req, res) => {
    const recipeId = parseInt(req.params.id);
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ error: 'Recipe not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});