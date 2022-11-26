import { useState } from "react";
import { ArtistDataType } from "../utils/ArtistDataType";

interface SearchBarProps {
    passAccessToken: string,
    passSetArtistsLists: React.Dispatch<React.SetStateAction<[] | ArtistDataType[]>>
}

export default function SearchBar(props: SearchBarProps): JSX.Element {

    const [searchBarText, setSearchBarText] = useState<string>("");

    
    //after getting accessToken, we can search for stuff in the spotify API
    const handleSearchValue = async () => {
        //Gonna use the search input to search a value and obtain artist ID
        const searchParamsforArtistsAndAlbums = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.passAccessToken,
          },
        };
        await fetch(
          "https://api.spotify.com/v1/search?q=" + searchBarText + "&type=artist",
          searchParamsforArtistsAndAlbums
        )
          .then((result) => result.json())
          .then((jsonBodyResult) => {
            props.passSetArtistsLists(jsonBodyResult.artists.items);
          }); /* from this response, spotify gives us a list of artists names, we select the top one as artist ID */
    
        //now we are gonna use the ArtistID to get a list of all of their albums
      };

    
    return (
        <>
            <div className="searchAndButton">
                <input
                    className="searchBar"
                    placeholder="Type your favourite artist's name"
                    value={searchBarText}
                    onChange={(e) => {
                        setSearchBarText(e.target.value);
                        searchBarText.length > 1 && handleSearchValue()
                        
                    }}
                ></input>
            </div>
        </>
    )
}