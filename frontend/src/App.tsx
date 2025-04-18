import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import Title from "./components/header/Title";
import {
  Agent,
  AgentProfile,
  CreateProperties,
  AllProperties,
  EditProperties,
  PropertyDetail,
  Message,
  Home,
  Review,
} from "./pages/index";
import Face3Icon from "@mui/icons-material/Face3";
import { ThemedLayoutV2 } from "./components/layout";
import {
  ErrorComponent,
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import { Login } from "./pages/login";
import { parseJwt } from "./utils/parse-jwt";
import {
  ApartmentOutlined,
  Create,
  DashboardOutlined,
  DomainOutlined,
  MapsHomeWorkOutlined,
  MessageOutlined,
  RateReviewOutlined,
  VillaOutlined,
} from "@mui/icons-material";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("https://dashboard-mern-oils.onrender.com/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id
            })
          );
        }
        localStorage.setItem("token", `${credential}`);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://dashboard-mern-oils.onrender.com/api/v1")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "home",
                    list: "/home",
                    icon: <VillaOutlined />,
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "properties",
                    list: "/properties",
                    icon: <ApartmentOutlined />,
                    create: "/properties/create",
                    show: "/properties/show/:id",
                    edit: "/properties/edit/:id",
                    
                  },
                  {
                    name: "agents",
                    list: "/agent",
                    icon: <MapsHomeWorkOutlined />,
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "reviews",
                    list: "/reviews",
                    icon: <RateReviewOutlined />,
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "messages",
                    list: "/messages",
                    icon: <MessageOutlined />,
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "my profile",
                    list: "/profile",
                    icon: <Face3Icon />,
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "pEBPHl-ZIF6P7-mjTM9R",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Title={({ collapsed }) => (
                            <Title collapsed={collapsed} />
                          )}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="home" />}
                    />
                    <Route path="/home">
                      <Route index element={<Home />} />
                    </Route>
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperties />} />
                      <Route path="show/:id" element={<PropertyDetail />} />
                      <Route path="edit/:id" element={<CreateProperties />} />
                    </Route>
                    <Route path="/agents">
                      <Route index element={<Agent />} />
                    </Route>
                    <Route path="/reviews">
                      <Route index element={<Review />} />
                    </Route>
                    <Route path="/messages">
                      <Route index element={<Message />} />
                    </Route>
                    <Route path="/profile">
                      <Route index element={<AgentProfile />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
