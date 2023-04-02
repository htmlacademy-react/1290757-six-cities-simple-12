import Header from '../../components/header/header';

const Error = (): JSX.Element => (
  <div className="page">
    <Header isMain={false} />

    <main className="page__error">
      <div className="container">
        <h1>404. Page not found</h1>
      </div>
    </main>
  </div>
);

export default Error;
