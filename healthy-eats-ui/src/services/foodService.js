import { getParsableDate } from "./calendarService";
import HttpService from "./httpService";

const foodApiUrl = "https://api.spoonacular.com/recipes/complexSearch";
const foodApiToken = "76b3fafbfa594974adeb92a81b9b3130";

class _FoodService {
  async getRecipes(searchClause) {
    const count = 25;
    const res = await HttpService.get(foodApiUrl, {
      number: count,
      minCalories: 0,
      apiKey: foodApiToken,
      query: searchClause,
    });
    const product = res?.results;

    if (product instanceof Array) {
      return product.map((prd) => {
        const cal = prd.nutrition.nutrients.find(
          (it) => it.name === "Calories"
        );
        return {
          foodId: prd.id,
          foodTitle: prd.title,
          foodImage: prd.image,
          calories: cal?.amount ?? 0,
        };
      });
    }
    return [];
  }

  async saveDayOrder(payload) {
    HttpService.post("/api/orders", payload);
  }

  async getOrderedItemsMap(startDate, endDate) {
    const userId = sessionStorage.sessionUserId;
    const res = await HttpService.get("/api/orders", {
      userId,
      startDate,
      endDate,
    });

    const map = (res ?? []).reduce((acc, item) => {
      var jsItem = {
        id: item.id,
        orderDate: new Date(item.order_date),
        userId: item.user_id,
        detail: item.detail.map((it) => ({
          id: it.id,
          calories: it.calories,
          foodId: it.food_id,
          foodImage: it.food_image,
          foodTitle: it.food_title,
          meal: it.meal,
        })),
      };

      const pDate = getParsableDate(jsItem.orderDate);

      acc[pDate] = jsItem;

      return acc;
    }, {});

    return map;
  }
}

const FoodService = new _FoodService();
export default FoodService;
