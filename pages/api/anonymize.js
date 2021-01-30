import { transform } from "@codemod/core";
import babelPlugin from "babel-plugin-anonymize";

export default (req, res) => {
  if (req.method !== "POST") {
    res.status(400);
  }

  if (!req.body?.code) {
    res.status(400).json({ errorMessage: "No code in body" });
  }

  let result;

  try {
    result = transform(req.body.code, {
      plugins: [
        [
          babelPlugin,
          {
            wordType: req.body.wordType,
            seed: req.body.seed,
          },
        ],
      ],
      printer: req.body.shouldUsePrettier ? "prettier" : undefined,
    });
  } catch (error) {
    if (error?.code === "BABEL_PARSE_ERROR") {
      console.log(error);
      res.status(400).json({
        errorKey: "BABEL_PARSE_ERROR",
        // We're triming the error message for now because the encoding seems to get messed up on the next lines
        errorMessage: error.message.indexOf("\n")
          ? error.message.slice(0, error.message.indexOf("\n"))
          : error.message,
      });
    } else {
      res.status(500);
    }
  }

  res.status(200).json({ code: result.code });
};
