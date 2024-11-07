import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import UsersView from "@/views/UsersView.vue";
import CustomersView from "@/views/CustomersView.vue";
import DishesView from "@/views/DishesView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import TablesView from "@/views/TablesView.vue";
import OrdersView from "@/views/OrdersView.vue";
import OrdersPendingView from "@/views/OrdersPendingView.vue";
import OrdersDeliveredView from "@/views/OrdersDeliveredView.vue";
import OrdersAllView from "@/views/OrdersAllView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView,
  },
  {
    path: "/customers",
    name: "Customers",
    component: CustomersView,
  },
  {
    path: "/dishes",
    name: "Dishes",
    component: DishesView,
  },
  {
    path: "/categories",
    name: "Categories",
    component: CategoriesView,
  },
  {
    path: "/tables",
    name: "Tables",
    component: TablesView,
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersView,
  },
  {
    path: "/ordersPending",
    name: "OrdersPending",
    component: OrdersPendingView,
  },
  {
    path: "/ordersDelivered",
    name: "OrdersDelivered",
    component: OrdersDeliveredView,
  },
  {
    path: "/ordersAll",
    name: "OrdersAll",
    component: OrdersAllView,
  },
    
    
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
