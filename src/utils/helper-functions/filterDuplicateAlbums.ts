import { AlbumDataTypes } from "../AlbumDataType";

export default function filterDuplicateAlbums(
  albums: AlbumDataTypes[]
): AlbumDataTypes[] {
  const uniqueNames: string[] = [];

  const uniqueAlbums = albums.filter((element) => {
    const isDuplicate = uniqueNames.includes(element.name);

    if (!isDuplicate) {
      uniqueNames.push(element.name);

      return true;
    }

    return false;
  });
  return uniqueAlbums;
}
