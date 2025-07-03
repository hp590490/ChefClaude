import React, { useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecette from "./ClaudeRecette";

const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [showRecette, setShowRecette] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(""); // contenu de la recette qui va s'afficher
  const [loading, setLoading] = useState(false);

  const addIngredient = (e) => {
    e.preventDefault();

    if (newIngredient.trim().length < 2) {
      return;
    }

    if (ingredients.includes(newIngredient)) {
      // si newingredient est déjà dans ingredients on return
      return;
    }

    setIngredients([...ingredients, newIngredient.trim()]);
    setNewIngredient("");
  };

  const removeIngredient = (ingredientToRemove) => {
    //ingredienttotemove correspond à ingredient dans ingredientslist.jsx, celui qu'on supprime
    setIngredients(ingredients.filter((item) => item !== ingredientToRemove)); // on garde tous les items du tableau sauf ingredient qu'on veut supp
  };

  const getRecette = async () => {
    // si recette déjà générée on toggle juste l'affichage
    if (generatedRecipe) {
      setShowRecette(!showRecette);
      return;
    }

    try {
      setLoading(true);
      setShowRecette(true);

      const prompt = `Donne-moi une recette simple et savoureuse avec les ingrédients suivants : ${ingredients.join(
        ", "
      )}. Formate la réponse en français, avec un titre en gras et italique avec une taille de police plus grosse qui fait titre, une section "Ingrédients" (liste à puces), une section "Instructions" (étapes numérotées), et une phrase finale motivante.`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      setGeneratedRecipe(data.choices[0].message.content);
    } catch (error) {
      console.error("Erreur GPT :", error);
      setGeneratedRecipe("❌ Une erreur est survenue. Réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-10 px-16 pb-10">
      <form
        className="flex justify-center gap-12 h-[38px]"
        onSubmit={addIngredient}
      >
        <input
          type="text"
          placeholder="Oeufs, lait, tomates..."
          aria-label="Add ingredient"
          name="ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          className="rounded-lg border-2 border-solid border-[#D1D5DB] py-2 px-4 w-[300px] shadow-sm min-w-[150px] max-w-[400px]"
        />
        <button
          className="bg-[#141413] text-white 
             border border-transparent 
             hover:bg-white hover:text-[#141413] 
             hover:border-[#141413] 
             px-5 py-2 rounded-md text-sm font-medium 
             transition-colors duration-300 ease-in-out"
        >
          + Ajouter un ingrédient
        </button>
      </form>
      {ingredients.length < 4 && (
        <p className="text-center mt-4 text-xs italic">
          Ajoutez {4 - ingredients.length} ingrédients et générez une recette !
        </p>
      )}
      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          showRecette={showRecette}
          getRecette={getRecette}
          removeIngredient={removeIngredient}
        />
      )}
      {loading && (
        <div className="my-6 text-center text-gray-600 italic animate-pulse">
          🧑‍🍳 Chef Claude prépare votre recette...
        </div>
      )}

      {showRecette && generatedRecipe && (
        <ClaudeRecette content={generatedRecipe} />
      )}
    </main>
  );
};

export default Main;
