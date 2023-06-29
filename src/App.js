import "./header.css";
import "./content.css";

import { Formik, Form, Field } from "formik";
import { useState } from "react";

function App() {
  const [fotos, setFotos] = useState([]);
  const open = (url) => window.open(url);

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
        {
          headers: {
            Authorization:
              "Client-ID M187bymX8zxwFwSCjdpGSZhwlp_WN1Ei21R55kxfYuI"
          }
        }
      );

      const data = await response.json();
      setFotos(data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <header>
        <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
          <Form>
            <Field name="search" />
            <button type="submit">Search</button>
          </Form>
        </Formik>
      </header>
      <div className="contenedor">
        <div className="center">
          {fotos.map((cadafoto) => (
            <article
              key={cadafoto.id}
              onClick={() => open(cadafoto.urls.regular)}
            >
              <img src={cadafoto.urls.regular} alt={cadafoto.description} />
              <p>
                {[cadafoto.description, cadafoto.alt_description].join(" - ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
