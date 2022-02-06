import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { HistoryPage } from "../../pages/history/historyPage";
import { HomePage } from "../../pages/home/homePage";
import { LoginPage } from "../../pages/login/loginPage";
import { OrderPage } from "../../pages/order/orderPage";
import { RecipesPage } from "../../pages/recipes/recipesPage";
import { SearchPage } from "../../pages/search/searchPage";
import { AuthenticationGuard } from "../authenticationGuard";

import './appLayout.scss'

export function AppLayout({ children }) {
    const navigate = useNavigate();
    return <div className="app-layout">
        <div className="app-layout-navigation">
            <Link to="/" >Home</Link>
            <Link to="/search" >Search</Link>
            <Link to="/order" >Order</Link>
            <Link to="/recipes" >Recipes</Link>
            <Link to="/history" >History</Link>
            {!sessionStorage.logedIn && <Link to="/login" >Login</Link>}

            {sessionStorage.logedIn && <a href="/login" onClick={(e) => {
                e.preventDefault();
                sessionStorage.logedIn = '';
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


                <Route path='/order'
                    element={<AuthenticationGuard>
                        <OrderPage />
                    </AuthenticationGuard>} />

                <Route path='/recipes'
                    element={<AuthenticationGuard>
                        <RecipesPage />
                    </AuthenticationGuard>} />

                <Route path='/history'
                    element={<AuthenticationGuard>
                        <HistoryPage />
                    </AuthenticationGuard>} />

            </Routes>
        </div>
    </div>
}