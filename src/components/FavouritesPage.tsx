import { AlbumDataTypes } from "../utils/AlbumDataType";
import filterDuplicateAlbums from "../utils/helper-functions/filterDuplicateAlbums";

interface FavouritesProps {
  passFavouriteAlbums: [] | AlbumDataTypes[];
}

export default function FavouritesPage(props: FavouritesProps): JSX.Element {
  const filteredFavourites = filterDuplicateAlbums(props.passFavouriteAlbums);

  return (
    <>
      <h1>FAVOURITE ALBUMS</h1>
      <div className="AllTheArtists">
        {filteredFavourites.map((album) => {
          return (
            <div className="EachArtist" key={album.id}>
              <img src={album.images[1]?.url} alt="album Cover" />
              <p>{album.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
