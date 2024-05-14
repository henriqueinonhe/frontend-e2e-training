import Main from "@/views/layouts/Main";
import NotesPreview from "@/views/components/NotesPreview";
import { Route, Switch } from "react-router-dom";
import { AddNote } from "../components/AddNote";
import { EditNote } from "../components/EditNote";
import { Login } from "../components/Login";
import { useUser } from "../hooks/useUser";

export const Root = () => {
  const { isLoggedIn, userIsLoading } = useUser();

  if (userIsLoading) {
    return <>Loading...</>;
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Main>
      <NotesPreview />

      <Switch>
        <Route path="/notes/add">
          <AddNote />
        </Route>

        <Route path="/notes/:id">
          <EditNote />
        </Route>
      </Switch>
    </Main>
  );
};

export default Root;
