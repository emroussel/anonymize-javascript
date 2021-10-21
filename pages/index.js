import React, { useState, useEffect } from "react";
import { Head } from "../components/Head";
import { Spinner } from "../components/Spinner";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] =
    useState(`function secretFunction(sneaky, classified) {
  return sneaky + classified;
}

const undercoverVariable = secretFunction(1, 2);
console.log(undercoverVariable);`);
  const [wordType, setWordType] = useState("");
  const [shouldUsePrettier, setShouldUsePrettier] = useState(true);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isToastTextVisible, setIsToastTextVisible] = useState(false);
  const [isClipboardSupported, setIsClipboardSupported] = useState(false);

  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    setIsClipboardSupported(
      !!(navigator.clipboard && navigator.clipboard.writeText)
    );
  }, []);

  const anonymize = async () => {
    try {
      setError("");
      setIsSubmitting(true);

      const response = await fetch("/api/anonymize", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          code: input,
          wordType,
          shouldUsePrettier,
        }),
      });

      const res = await response.json();

      if (res.errorKey || res.errorMessage) {
        throw res;
      }

      if (!res.code || response.status !== 200) {
        throw new Error();
      }

      const newHistoryIndex = historyIndex + 1;
      setHistory((prevhistory) => [
        ...prevhistory.slice(0, newHistoryIndex),
        { input, output: res.code, shouldUsePrettier, wordType },
      ]);
      setHistoryIndex(newHistoryIndex);

      setResult(res.code);
      setIsSubmitting(false);
    } catch (e) {
      setError(e);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (input) {
      anonymize();
    }
  }, []);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto sm:px-8 px-4 min-h-screen flex flex-col justify-between">
        <Head description="Rename variables, functions, classes, and more while keeping code functional. Great for anonymizing private code in order to share it publicly on the internet!" />

        <main className="sm:pt-16 pt-8">
          <h1 className="sm:text-5xl md:text-6xl text-3xl font-extrabold sm:pb-8 pb-4 text-center tracking-tighter">
            Anonymize JavaScript 🕵️
          </h1>
          <p className="text-gray-600 sm:text-lg text-base text-center max-w-4xl mx-auto">
            Rename variables, functions, classes, and more while keeping code
            functional. Great for sanitizing private code in order to share it
            publicly on the internet!
          </p>
          <div className="w-full sm:pt-20 pt-16">
            {error ? (
              <div
                className="bg-red-600 text-white py-4 px-6 rounded-lg mb-8 font-medium"
                role="alert"
              >
                <h2 className="font-bold text-xl pb-2">
                  {error?.errorKey === "BABEL_PARSE_ERROR"
                    ? "Error parsing code"
                    : "Uh oh, something went wrong 😬"}
                </h2>
                <p>
                  {error?.errorMessage || (
                    <span>
                      Make sure the code in the input is valid or{" "}
                      <a
                        href="https://github.com/emroussel/anonymize-javascript/issues/new"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-90"
                      >
                        open an issue
                      </a>{" "}
                      if you think there&#39;s a problem with this tool.
                    </span>
                  )}
                </p>
              </div>
            ) : null}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="relative inline-block">
                  <label
                    htmlFor="word-type"
                    className="absolute -top-6 text-gray-600 text-sm"
                  >
                    Replace with
                  </label>
                  <select
                    value={wordType}
                    onChange={(event) => {
                      if (!isSubmitting) {
                        setWordType(event.target.value);
                      }
                    }}
                    id="word-type"
                    className="appearance-none py-1 pr-16 pl-2 border-gray-300 border-2 rounded-lg bg-white"
                  >
                    <option value="">Any words</option>
                    <option value="animals">Animals</option>
                    <option value="dinosaurs">Dinosaurs</option>
                    <option value="fruits">Fruits</option>
                  </select>
                  <span className="inline-block w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-600 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="flex mt-0.5 sm:mt-0 sm:items-center absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:transform">
                <button
                  className="text-gray-500 hover:text-blue-700 p-1 mr-1 disabled:text-gray-300 disabled:cursor-not-allowed border-gray-300 hover:border-blue-700 disabled:border-gray-300 border-2 rounded-lg bg-white"
                  onClick={() => {
                    const newHistoryIndex = historyIndex - 1;
                    setInput(history[newHistoryIndex].input);
                    setResult(history[newHistoryIndex].output);
                    setWordType(history[newHistoryIndex].wordType);
                    setShouldUsePrettier(
                      history[newHistoryIndex].shouldUsePrettier
                    );
                    setHistoryIndex(newHistoryIndex);
                  }}
                  disabled={historyIndex <= 0}
                  aria-label="Previous"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  className="text-gray-500 hover:text-blue-700 p-1 ml-1 disabled:text-gray-300 disabled:cursor-not-allowed border-gray-300 hover:border-blue-700 disabled:border-gray-300 border-2 rounded-lg bg-white"
                  onClick={() => {
                    const newHistoryIndex = historyIndex + 1;
                    setInput(history[newHistoryIndex].input);
                    setResult(history[newHistoryIndex].output);
                    setWordType(history[newHistoryIndex].wordType);
                    setShouldUsePrettier(
                      history[newHistoryIndex].shouldUsePrettier
                    );
                    setHistoryIndex(newHistoryIndex);
                  }}
                  disabled={historyIndex >= history.length - 1}
                  aria-label="Next"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center sm:justify-end pt-3 sm:pt-0">
                <input
                  checked={shouldUsePrettier}
                  onChange={(event) => {
                    if (!isSubmitting) {
                      setShouldUsePrettier(event.target.checked);
                    }
                  }}
                  id="prettier-checkbox"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="prettier-checkbox">
                  Format output with prettier
                </label>
              </div>
            </div>
          </div>
          <div className="w-full flex pt-2 sm:flex-row flex-col">
            <div className="flex-1 sm:mr-3">
              <label htmlFor="input" className="text-gray-600 text-sm">
                Input
              </label>
              <textarea
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                className="w-full border-gray-300 border-2 py-2 px-2 sm:px-4 font-mono rounded-lg mt-1"
                rows={15}
                id="input"
                readOnly={isSubmitting}
              />
            </div>
            <div className="flex-1 sm:ml-3 mt-4 sm:mt-0">
              <label htmlFor="output" className="text-gray-600 text-sm">
                Output
              </label>
              <div className="relative mt-1">
                <textarea
                  value={result}
                  readOnly
                  className="w-full border-gray-300 border-2 py-2 px-2 sm:px-4 font-mono rounded-lg"
                  rows={15}
                  id="output"
                />
                {isClipboardSupported && result ? (
                  <button
                    className="text-gray-500 hover:text-blue-700 w-10 h-10 absolute p-2 rounded-lg border-gray-300 hover:border-blue-700 border-2 right-2 top-2 bg-white"
                    type="button"
                    aria-label="Copy to clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      setIsToastVisible(true);
                      setIsToastTextVisible(true);
                      setTimeout(() => {
                        setIsToastVisible(false);

                        setTimeout(() => {
                          setIsToastTextVisible(false);
                        }, 400); // Transition duration of toast
                      }, 5000);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              anonymize();
            }}
            className="bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80 text-white py-4 px-6 rounded-lg w-full max-w-sm font-medium hover:bg-blue-600 disabled:bg-blue-700 mx-auto block mt-10 relative text-lg"
            type="button"
            disabled={isSubmitting || !input}
          >
            Anonymize
            {isSubmitting ? (
              <span
                className={`absolute right-8 top-1/2 transform -translate-y-1/2 ${styles.spinner}`}
              >
                <Spinner />
              </span>
            ) : null}
          </button>
        </main>

        <footer className="flex sm:flex-row flex-col justify-between w-full py-12 mt-8 text-gray-600">
          <div className="sm:max-w-lg">
            Code is processed with{" "}
            <a
              href="https://github.com/emroussel/babel-plugin-anonymize"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              babel-plugin-anonymize
            </a>{" "}
            by a{" "}
            <a
              href="https://github.com/emroussel/anonymize-javascript/tree/main/pages/api/anonymize.js"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              serverless function
            </a>{" "}
            hosted on{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              Vercel
            </a>
            . It&#39;s never stored or shared with anyone.
          </div>
          <div className="sm:text-right whitespace-nowrap sm:ml-12 mt-6 sm:mt-0">
            <ul>
              <li>
                <a
                  href="https://github.com/emroussel/anonymize-javascript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-800"
                >
                  View source on Github
                </a>
              </li>
            </ul>
            <p>
              Made by{" "}
              <a
                href="https://emroussel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-800"
              >
                Emmanuel Roussel
              </a>
            </p>
          </div>
        </footer>
      </div>
      <div
        className={`fixed top-4 mx-4 text-center motion-safe:transition-all duration-400 ease-in-out -right-80 ${
          isToastVisible ? `${styles["toast-visible"]} visible` : "invisible"
        }`}
      >
        {isToastTextVisible ? (
          <div
            role="alert"
            aria-live="assertive"
            className="inline-block py-4 px-6 bg-gray-900 text-white rounded-lg shadow-lg font-medium"
          >
            Code copied to clipboard!
          </div>
        ) : null}
      </div>
    </>
  );
}
