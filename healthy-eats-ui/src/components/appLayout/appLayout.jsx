import { Route, Routes, useNavigate, NavLink } from "react-router-dom";
// import { OrderHistoryPage } from "../../pages/orderHistory/orderHistoryPage";
import { HomePage } from "../../pages/home/homePage";
import { LoginPage } from "../../pages/login/loginPage";
import { RecipesPage } from "../../pages/recipes/recipesPage";
import { SavedRecipes } from "../../pages/saved/savedRecipes";
import { SearchPage } from "../../pages/search/searchPage";
import { AuthenticationGuard } from "../authenticationGuard";
import { ShoppingList } from "../../pages/shoppingList/shoppingList";
import './appLayout.scss'


function AppNavLink({ to, children }) {
  return <NavLink className={({ isActive }) => {
    return (isActive ? "activeRoute" : "");
  }} to={to} >
    {children}
  </NavLink>

}
export function AppLayout({ children }) {
  const navigate = useNavigate();
  return <div className="app-layout">
    <div className="app-layout-navigation">
      <AppNavLink to="/" >{sessionStorage.sessionUserFullName}</AppNavLink>
      <AppNavLink to="/search" >Search</AppNavLink>
      <AppNavLink to="/recipes">My Recipes</AppNavLink>

      <AppNavLink to="/savedRecipes" >Saved</AppNavLink>
      <AppNavLink to="/shoppingList" >Shopping List</AppNavLink>
      {!sessionStorage.sessionUserFullName && <AppNavLink to="/login" >Login</AppNavLink>}

      {sessionStorage.sessionUserFullName && <a href="/login" onClick={(e) => {
        e.preventDefault();
        sessionStorage.sessionUserFullName = '';
        sessionStorage.sessionUserId = 0;
        navigate('/')
      }} >Logout</a>}

    </div>
    <div className="app-layout-content">
      <Routes>
        <Route path='/'
          element={<AuthenticationGuard>
            <HomePage />
          </AuthenticationGuard>} />

        <Route path='/login'
          element={<LoginPage />} />


        <Route path='/search'
          element={<AuthenticationGuard>
            <SearchPage />
          </AuthenticationGuard>} />


        <Route path='/recipes'
          element={<AuthenticationGuard>
            <RecipesPage />
          </AuthenticationGuard>} />



        <Route path='/savedRecipes'
          element={<AuthenticationGuard>
            <SavedRecipes />
          </AuthenticationGuard>} />

        <Route path='/shoppingList'
          element={<AuthenticationGuard>
            <ShoppingList />
          </AuthenticationGuard>} />



      </Routes >
    </div >
  </div >
}