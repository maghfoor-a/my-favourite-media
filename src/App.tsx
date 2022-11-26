import { useState } from "react";
import AlbumsViewPage from "./components/AlbumsViewPage";
import AppHeader from "./components/AppHeader";
import SearchArtistsPage from "./components/SearchArtistsPage";

function App(): JSX.Element {
  const [page, setPage] = useState<string>("home");

  return (
    <>
      <AppHeader />
      <hr />
      {page === "home" && <SearchArtistsPage passSetPage={setPage} />}
      {page === "albums" && <AlbumsViewPage passSetPage={setPage} />}
    </>
  );
}

export default App;
