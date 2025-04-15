import BranchList from "../Pages/Branch/BranchList";
import LoginPage from "../Pages/Login/LoginPage";
import Main from "../Pages/Main/Main";
import ProductEditor from "../Pages/Product/ProductEditor";

const routes = [
    {
        path: '/',
        page: Main,
        isHideHeader: false
    },
    {
        path: '/dashboard',
        page: Main,
        isHideHeader: false
    },
    {
        path: '/login',
        page: LoginPage,
        isHideHeader: true
    },
    {
        path: '/signup',
        page: LoginPage,
        isHideHeader: true
    },
    {
        path: '/branch-list',
        page: BranchList,
        isHideHeader: false
    },
    {
        path: '/product-list',
        page: BranchList,
        isHideHeader: false
    },
    {
        path: '/add-product',
        page: ProductEditor,
        isHideHeader: false
    },
    {
        path: '/edit-product',
        page: ProductEditor,
        isHideHeader: false
    }
]

export default routes;