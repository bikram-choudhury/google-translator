import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getAllLanguages, postToTranslate } from './http/handler';
import './App.css';
import { copyToClipboard } from './utils';

export default function App() {
  const [source, setSource] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [languages, setLanguages] = useState([]);
  const [output, setOutput] = useState('');
  const outputRef = useRef();

  const onChange = useCallback((evnt) => setSource(evnt.target.value), []);
  const onLangSelect = useCallback(
    (evnt) => setTargetLang(evnt.target.value),
    []
  );
  const handleClick = useCallback(async () => {
    setOutput('');
    const payload = { srcText: source, targetLang };
    try {
      const response = await postToTranslate(payload);

      const data = response.data;
      const translations = data.translations;
      const translatedText = translations[0].translatedText;

      // const { data: { translations: [{ translatedText } = {} ] = [] } = {} } = response ?? {};
      setOutput(translatedText);
    } catch (error) {
      console.error("translated error", error);
    }
  }, [source, targetLang]);

  const onResultClick = useCallback(() => copyToClipboard(outputRef.current), []);

  useEffect(() => {
    getAllLanguages()
      .then(res => {
        const { data: { languages } } = res.data;
        const modifiedLangs = languages.map(l => l.language);
        setLanguages(modifiedLangs);
      });
  }, []);

  return (
    <main className="wrapper">
      <section className="input-holder">
        <div className="form-control">
          <select onChange={onLangSelect}>
            <option value="">Please select a language</option>
            {
              languages.map(l => <option value={l}>{l.toUpperCase()}</option>)
            }

          </select>
        </div>
        <div className="form-control">
          <textarea
            value={source}
            rows={5}
            cols={50}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form-control">
          <button className="btn" onClick={handleClick}>
            Submit
          </button>
        </div>
      </section>
      <br />
      <br />
      <section className="output-holder">
        <strong>Result: </strong>
        <br />
        <pre className="output" onClick={onResultClick} ref={outputRef}>
          {output}
        </pre>
      </section>
    </main>
  );
}
