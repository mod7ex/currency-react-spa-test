import { RouterProvider } from "react-router-dom";
import router from "~/router";

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
