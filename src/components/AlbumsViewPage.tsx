interface AlbumsViewProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function AlbumsViewPage(props: AlbumsViewProps): JSX.Element {
  return (
    <>
      <h1>ALBUMS</h1>
      <button onClick={() => props.passSetPage("home")}>HOME</button>
    </>
  );
}
