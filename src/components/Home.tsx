import { useState } from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

import useTranslator from "../hooks/use-translator";
import { Sentence, Status } from "../types";
import { sampleSentences } from "../constants";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const Header = styled.h1`
  color: #333;
  font-size: 2rem;
  text-align: center;
`;

const TextArea = styled.textarea`
  width: 60%;
  height: 150px;
  margin: 10px 0;
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

type ButtonProps = {
  $primary?: boolean;
};

const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  background-color: ${(props) => (props.$primary ? "#007bff" : "#5f758e")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$primary ? "#0056b3" : "#435364")};
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

const wordColors: Record<Status, string> = {
  added: "#32a852",
  removed: "#a83a32",
  unchanged: "inherit",
};

const Word = styled.span<{ $status: Status }>`
  padding: 0 0.1rem;
  color: ${(props) => wordColors[props.$status]};
`;

const Error = styled.div`
  color: red;
  font-size: 1rem;
`;

const SentenceHeader = styled.h3`
  margin: 0;
`;

const SentenceP = styled.p`
  margin-block-start: 0;
`;

type SentenceProps = {
  sentence: Sentence;
};

function SentenceText({ sentence }: SentenceProps) {
  return (
    <SentenceP>
      {sentence.map((word, index) => (
        <Word key={index} $status={word.status}>
          {word.surface}
        </Word>
      ))}
    </SentenceP>
  );
}

const Home = () => {
  const [text, setText] = useState("");
  const { translate, isLoading, error, reset, translationResult } =
    useTranslator();

  const setSampleSentence = () => {
    const randomIndex = Math.floor(Math.random() * sampleSentences.length);
    const randomSentence = sampleSentences[randomIndex];
    setText(randomSentence);
  };

  const resetAll = () => {
    setText("");
    reset();
  };

  return (
    <HomeContainer>
      <Header>
        日本語平易化システム
        <br />
        Simplify Japanese text
      </Header>
      {translationResult ? (
        <>
          <SentenceHeader>Original</SentenceHeader>
          <SentenceText sentence={translationResult.oldSentence} />
          <SentenceHeader>Translated</SentenceHeader>
          <SentenceText sentence={translationResult.newSentence} />
          <Button onClick={resetAll}>New translation</Button>
        </>
      ) : (
        <>
          <Button onClick={setSampleSentence}>Use sample sentence</Button>
          <TextArea
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            $primary={true}
            disabled={isLoading || text.length === 0}
            onClick={() => translate(text)}
          >
            {" "}
            {isLoading ? <Spinner /> : "Translate"}
          </Button>
          {error && <Error>{error}</Error>}
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
