import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import AdminEditCard from './admin/AdminEditCard';
import AdminList from './admin/AdminList';
import CartPage from './CartPage';
import Footer from './Footer';
import Header from './Header';
import ItemPage from './ItemPage';
import MainCatalogue from './MainCatalogue';


const HeaderAndFooter = () => (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
)

export const AppRouter = () => (
    <HashRouter >
        <Routes>
            <Route element={<HeaderAndFooter/>}>
                <Route
                    path='/'
                    element={<MainCatalogue />}
                />
                <Route
                    path='/cart'
                    element={<CartPage />}
                />
                <Route 
                    path='/:barcode'
                    element={<ItemPage />}
                />
            </Route>
            <Route 
                path='/admin'
                element={<AdminList />}
            />
            <Route 
                path='/admin/edit/:barcode'
                element={<AdminEditCard />}
            />
        </Routes>
    </HashRouter>
)
