import HttpService from "./httpService";

class _UserService {
  async authenticateUser(email, password) {
    const data = await HttpService.post("/api/users/authenticate", {
      email,
      password,
    });

    if (data?.user) {
      return {
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        id: data.user.id,
      };
    }

    return null;
  }
}

const UserService = new _UserService();
export default UserService;
