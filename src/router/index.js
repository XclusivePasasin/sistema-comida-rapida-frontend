import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import UsersView from "@/views/UsersView.vue";
import CustomersView from "@/views/CustomersView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import TablesView from "@/views/TablesView.vue";

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
    path: "/categories",
    name: "Categories",
    component: CategoriesView,
  },
  {
    path: "/tables",
    name: "Tables",
    component: TablesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
