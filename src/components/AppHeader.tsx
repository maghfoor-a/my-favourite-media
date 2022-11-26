interface AppHeaderProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppHeader(props: AppHeaderProps): JSX.Element {
  return (
    <>
      <h1>ALBUM FINDER BY ARTIST</h1>
      <button className="Button" onClick={() => props.passSetPage("favourite")}>
        FAVOURITES
      </button>
      <button className="Button" onClick={() => props.passSetPage("home")}>
        HOME
      </button>
    </>
  );
}
