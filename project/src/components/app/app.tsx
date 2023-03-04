import Main from '../../pages/main/main';

type AppProps = {
  placesFound: number;
}

function App({placesFound}: AppProps): JSX.Element {
  return (
    <Main placesFound={placesFound}/>
  );
}

export default App;
