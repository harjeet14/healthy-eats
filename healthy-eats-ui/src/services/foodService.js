import HttpService from "./httpService";

class _FoodService {
    async getRecipes(searchClause) {
        const res = await HttpService.get('https://www.themealdb.com/api/json/v1/1/search.php', { s: searchClause });
        return res?.meals ?? [];
    };
}

const FoodService = new _FoodService();
export default FoodService;