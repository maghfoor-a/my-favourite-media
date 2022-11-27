interface AppHeaderProps {
  passSetPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppHeader(props: AppHeaderProps): JSX.Element {
  return (
    <div className="AppHeaderBody">
      <h1>MY FAVOURITE MEDIA</h1>
      <button className="Button" onClick={() => props.passSetPage("favourite")}>
        FAVOURITES
      </button>
      <button className="Button" onClick={() => props.passSetPage("home")}>
        HOME
      </button>
    </div>
  );
}
