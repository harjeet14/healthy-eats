import HttpService from "./httpService";


const foodApiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
const foodApiToken = '76b3fafbfa594974adeb92a81b9b3130';

class _FoodService {
    async getRecipes(searchClause) {
        const count = 25;
        const res = await HttpService.get(foodApiUrl, { number: count, minCalories: 0, apiKey: foodApiToken, query: searchClause });
        const product = res?.results;

        if (product instanceof Array) {
            return product.map(prd => {
                const cal = prd.nutrition.nutrients.find((it) => it.name === 'Calories');
                return {
                    foodId: prd.id,
                    foodTitle: prd.title,
                    foodImage: prd.image,
                    calories: cal?.amount ?? 0,
                };
            });
        }
        return [];
    };
}

const FoodService = new _FoodService();
export default FoodService;