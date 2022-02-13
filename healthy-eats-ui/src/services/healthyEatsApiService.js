import HttpService from "./httpService";

class _HealthyEatsApiService {

  async getSavedRecipes(userId) {

    const recipeIds = await HttpService.get(`/api/savedRecipes/userId/${userId}`, null);

    return recipeIds;
  }

  async createSavedRecipes(userId, recipeId) {

    const res = HttpService.post('/api/savedRecipes', null, { 'userId': userId, 'recipeId': recipeId })

    return res;
  }

  async deleteSavedRecipes(userId, recipeId) {

    const res = HttpService.delete('/api/savedRecipes', { 'userId': userId, 'recipeId': recipeId })

    return res;
  }

  async getLikedRecipes(userId) {

    const recipeIds = await HttpService.get(`/api/likedRecipes/userId/${userId}`, null);

    return recipeIds;
  }

  async createLikedRecipes(userId, recipeId) {

    const res = HttpService.post('/api/likedRecipes', null, { 'userId': userId, 'recipeId': recipeId })

    return res;
  }

  async deleteLikedRecipes(userId, recipeId) {

    const res = HttpService.delete('/api/likedRecipes', { 'userId': userId, 'recipeId': recipeId })

    return res;
  }
}

const HealthyEatsApiService = new _HealthyEatsApiService();
export default HealthyEatsApiService;