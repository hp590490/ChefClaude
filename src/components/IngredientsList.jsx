import React from "react";
import { Trash } from "lucide-react";

const IngredientsList = (props) => {
  return (
    <>
      <h2 className="text-lg font-semibold my-10">
        Ingrédients sous la main :
      </h2>

      <ul className="mb-10 list-disc list-inside text-gray-700">
        {props.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-4">
            <li>{ingredient} </li>
            <button
              onClick={() => props.removeIngredient(ingredient)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Supprimer ${ingredient}`}
            >
              🗑️
            </button>
          </div>
        ))}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="bg-gray-100 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Prêt à cuisiner ?
            </h3>
            <p className="text-sm text-gray-600">
              Génère une recette à partir de ta liste d'ingrédients !
            </p>
          </div>
          <button
            className="bg-[#141413] text-white 
             border border-transparent 
             hover:bg-white hover:text-[#141413] 
             hover:border-[#141413] 
             px-5 py-2 rounded-md text-sm font-medium 
             transition-colors duration-300 ease-in-out"
            onClick={props.getRecette}
          >
            {!props.showRecette ? "Obtenir ma recette" : "Cacher la recette"}
          </button>
        </div>
      )}
    </>
  );
};

export default IngredientsList;
