import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients, isLoading, error } = useSelector(
    (state) => state.ingredients
  );
  const { id } = useParams<{ id: string }>();
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-medium pt-10'>
        Ингредиент не найден
      </div>
    );
  }

  if (error) {
    return (
      <div className='text text_type_main-medium pt-10 text_color_error'>
        Ошибка: {error}
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
