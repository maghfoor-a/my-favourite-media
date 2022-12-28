import { useState } from "react";
import AlbumsViewPage from "./components/AlbumsViewPage";
import AppHeader from "./components/AppHeader";
import SearchArtistsPage from "./components/SearchArtistsPage";
import FavouritesPage from "./components/FavouritesPage";
import { AlbumDataTypes } from "./utils/AlbumDataType";
import { useGetAccessToken } from "./utils/custom-hooks/getAccessToken";

function App(): JSX.Element {
  const [page, setPage] = useState<string>("home");
  const [artistID, setArtistID] = useState<string>("");
  const [searchAlbums, setSearchAlbums] = useState<boolean>(false);
  const [favouriteAlbums, setFavouriteAlbums] = useState<[] | AlbumDataTypes[]>(
    []
  );
  const accessToken = useGetAccessToken();

  return (
    <>
      <AppHeader passSetPage={setPage} />
      <hr />
      {page === "home" && (
        <SearchArtistsPage
          passSetPage={setPage}
          passAccessToken={accessToken}
          getArtistID={setArtistID}
          passSetSearchAlbums={setSearchAlbums}
        />
      )}
      {page === "albums" && (
        <AlbumsViewPage
          passSetPage={setPage}
          passAccessToken={accessToken}
          passArtistID={artistID}
          passSearchAlbums={searchAlbums}
          passSetFavouriteAlbums={setFavouriteAlbums}
          passFavouriteAlbums={favouriteAlbums}
        />
      )}
      {page === "favourite" && (
        <FavouritesPage passFavouriteAlbums={favouriteAlbums} />
      )}
    </>
  );
}

export default App;
