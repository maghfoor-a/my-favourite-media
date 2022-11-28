import { useState } from "react";
import { ArtistDataType } from "../utils/ArtistDataType";
import SearchBar from "./SearchBar";
// import { AlbumDataTypes } from "../utils/AlbumDataType";
import "./SearchArtistsPage.css";

interface AlbumsViewPageProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
  passAccessToken: string;
  getArtistID: React.Dispatch<React.SetStateAction<string>>;
  passSetSearchAlbums: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchArtistsPage(
  props: AlbumsViewPageProps
): JSX.Element {
  const [artistsList, setArtistsList] = useState<ArtistDataType[] | []>([]);

  // await fetch(
  //   `https://api.spotify.com/v1/artists/${ArtistID}/albums?include_groups=album&market=GB&limit=50`,
  //   searchParamsforArtistsAndAlbums
  // )
  //   .then((result) => result.json())
  //   .then((jsonResult) => setAlbumbsList(jsonResult.items));

  const handleArtistClick = (artistIDValue: string) => {
    props.passSetPage("albums");
    props.getArtistID(artistIDValue);
    props.passSetSearchAlbums(true);
  };

  return (
    <div className="body">
      <SearchBar
        passAccessToken={props.passAccessToken}
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
                onClick={() => handleArtistClick(artist.id)}
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
