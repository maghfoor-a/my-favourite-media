import { useEffect, useState } from "react";
import { ArtistDataType } from "../utils/ArtistDataType";
import SearchBar from "./SearchBar";
// import { AlbumDataTypes } from "../utils/AlbumDataType";
import "./SearchArtistsPage.css";

interface AlbumsViewPageProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
}

//got both of these keys by signing up to spotify dev tools
const Client_Id = "514b68cdc0b64083a2c23276782ba390";
const Client_Secret = "83866f02e62f4cee8d8951e7fe0c66a5";

export default function SearchArtistsPage(
  props: AlbumsViewPageProps
): JSX.Element {
  const [accessToken, setAccessToken] = useState<string>("");
  const [artistsList, setArtistsList] = useState<ArtistDataType[] | []>([]);

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

  console.log(artistsList);

  // await fetch(
  //   `https://api.spotify.com/v1/artists/${ArtistID}/albums?include_groups=album&market=GB&limit=50`,
  //   searchParamsforArtistsAndAlbums
  // )
  //   .then((result) => result.json())
  //   .then((jsonResult) => setAlbumbsList(jsonResult.items));

  return (
    <div className="body">
      <SearchBar
        passAccessToken={accessToken}
        passSetArtistsLists={setArtistsList}
      />
      <hr />
      <div className="AllTheArtists">
        {artistsList
          .filter((artist) => artist.name)
          .map((artist) => {
            return (
              <div
                className="EachArtist"
                key={artist.id}
                onClick={() => props.passSetPage("albums")}
              >
                <img src={artist.images[1]?.url} alt="artist Cover" />
                <p>{artist.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
