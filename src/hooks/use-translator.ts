import { useState } from "react";
import { SLT_API_URL } from "../constants";
import { Sentence } from "../types";

type TranslationResult = {
  oldSentence: Sentence;
  newSentence: Sentence;
};

export default function useTranslator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translationResult, setTranslationResult] =
    useState<TranslationResult | null>(null);

  const translate = async (text: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(SLT_API_URL, {
        method: "POST",
        body: JSON.stringify({ sentence: text }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setTranslationResult({
        oldSentence: result.old_sentence,
        newSentence: result.new_sentence,
      });
      setError(null);
      // eslint-disable-next-line
    } catch (error: any) {
      setError(`An error occured: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setTranslationResult(null);
    setError(null);
    setIsLoading(false);
  };

  return { isLoading, error, translationResult, translate, reset };
}
