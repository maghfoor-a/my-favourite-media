import { useEffect, useState } from "react"
import { AlbumDataTypes } from "../utils/AlbumDataType"


//got both of these keys by signing up to spotify dev tools
const Client_Id = "514b68cdc0b64083a2c23276782ba390"
const Client_Secret = "83866f02e62f4cee8d8951e7fe0c66a5"

export default function MainContent(): JSX.Element {

    const [searchBarText, setSearchBarText] = useState<string>("")
    const [accessToken, setAccessToken] = useState<string>("")
    const [albumsList, setAlbumbsList] = useState<AlbumDataTypes[]| []>([]);


    useEffect(() => {
        //this is used to get the access token, which you can then use to search through spotify's API
        const AuthorisationParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + Client_Id + '&client_secret=' + Client_Secret
        }
        fetch('https://accounts.spotify.com/api/token', AuthorisationParams)
        .then(result => result.json())
        .then(jsonDataForAT => setAccessToken(jsonDataForAT.access_token)) // AT = Access Token

    }, [])

    //now that we have the accessToken, we can search for stuff in the spotify API

    const handleSearchButton = async () => {
        //Gonna use the search input to search a value and obtain artist ID
        const searchParamsforArtistsAndAlbums = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
            }
        }
        const ArtistID = await fetch('https://api.spotify.com/v1/search?q=' + searchBarText + '&type=artist', searchParamsforArtistsAndAlbums)
        .then(result => result.json())
        .then(jsonBodyResult => { return (jsonBodyResult.artists.items[0].id)}) /* from this response, spotify gives us a list of artists names, we select the top one as artist ID */

        //now we are gonna use the ArtistID to get a list of all of their albums

        await fetch(`https://api.spotify.com/v1/artists/${ArtistID}/albums?include_groups=album&market=GB&limit=50`, searchParamsforArtistsAndAlbums)
        .then(result => result.json())
        .then(jsonResult => setAlbumbsList(jsonResult.items))
    }

    return (
        <div>
            <h1>Search below!</h1>
            <hr/>
            <input className="searchBar" value={searchBarText} onChange={e => setSearchBarText(e.target.value)}></input>
            <button className="SearchButton" onClick={handleSearchButton}>Search</button>
            <hr/>
            <div className="AllTheAlbums">
                {albumsList
                .filter(album => album.name)
                .map(album => {
                    return (
                        <div className="EachAlbum" key={album.id}>
                            <img src={album.images[0].url} alt="Album Cover" />
                            <p>{album.name}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}