import { useState, useEffect } from "react";
import AlbumsViewPage from "./components/AlbumsViewPage";
import AppHeader from "./components/AppHeader";
import SearchArtistsPage from "./components/SearchArtistsPage";
import FavouritesPage from "./components/FavouritesPage";
import { AlbumDataTypes } from "./utils/AlbumDataType";

//got both of these keys by signing up to spotify dev tools
const Client_Id = "514b68cdc0b64083a2c23276782ba390";
const Client_Secret = "83866f02e62f4cee8d8951e7fe0c66a5";

function App(): JSX.Element {
  const [page, setPage] = useState<string>("home");
  const [accessToken, setAccessToken] = useState<string>("");
  const [artistID, setArtistID] = useState<string>("");
  const [searchAlbums, setSearchAlbums] = useState<boolean>(false);
  const [favouriteAlbums, setFavouriteAlbums] = useState<[] | AlbumDataTypes[]>(
    []
  );

  useEffect(() => {
    //this is used to get the access token, which you can then use to search through spotify's API
    const AuthorisationParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        Client_Id +
        "&client_secret=" +
        Client_Secret,
    };
    fetch("https://accounts.spotify.com/api/token", AuthorisationParams)
      .then((result) => result.json())
      .then((jsonDataForAT) => setAccessToken(jsonDataForAT.access_token)); // AT = Access Token
  }, []);

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
