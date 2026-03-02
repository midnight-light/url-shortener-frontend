import { UrlShortenerForm } from '../features/url-shortener/components/url-shortener-form';

function App() {
  return (
    <>
      <div className="container-page text-center">
        <h1>Shortener & Preview</h1>
        <h2> Your URL</h2>
        <p>Введи URL для сокращения и получения метаданных ссылки</p>
        <div>
          <UrlShortenerForm />
        </div>
      </div>
    </>
  );
}

export default App;
