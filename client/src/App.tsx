import { BrowserRouter, Route, Switch } from "react-router-dom";
import Root from "@/views/pages/Root";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { theme } from "./views/theme";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route path="/">
              <Root />
            </Route>
          </Switch>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
