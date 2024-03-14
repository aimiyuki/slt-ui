import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  font-size: 1.1rem;
  line-height: 2rem;
`;

const AlgorithmImage = styled.img`
  width: 80%;
  margin: 2rem auto;
  display: block;
`;

export default function Algorithm() {
  return (
    <Container>
      <h1>Algorithm Overview</h1>
      <small>
        This page gives a high-level overview of the algorithm. A full
        description of the algorithm is available in my{" "}
        <a href="/bachelor-thesis.pdf">bachelor thesis</a>.
      </small>
      <p>
        The algorithm is mostly rule-based but uses pretrained models for
        tokenization, and dependency parsing, as well as for finding synonyms.
        The transformation happens using the following steps:
      </p>
      <ol>
        <li>Tokenization: tokenize our input into its token components</li>
        <li>
          Difficulty assessment: assess the difficulty of each token in the
          sentence{" "}
        </li>
        <li>
          Synonym search: search if there is an easier replacement for the given
          token
        </li>
        <li>
          Replacement range identification: look for the range of tokens that
          needs to be replaced
        </li>
        <li>
          Replacement denormalization: denormalize the replacement target to
          adapt features such as the tense to the initial token set
        </li>
        <li>
          Sentence reconstruction: reconstruct the original sentence using the
          tokens from the original sentences and the replaced ones
        </li>
      </ol>
      <p>
        Here is an overview diagram of the process below. This diagram uses the
        sentence "本日は友人とお食事したあとに、大学に参った", meaning "Today, I
        had a meal with my friends, after which I went to university" and show
        every transformation steps to finally become into
        "今日は友達と食べたあとに、 大学に行った".
      </p>
      <AlgorithmImage src="/algorithm-overview.png" alt="Algorithm diagram" />
      <p>
        There are several particularities of the original sentence that make it
        hard for a non-native speaker to understand. First, the word used for
        "today", "本日" is formal and typically not used in daily conversations.
        It is replaced by "今日", which is the most common way of saying "today"
        in Japanese. Next, the word "友人" is also rather formal and is replaced
        by its more regular counterparty, "友達". The next transformation of the
        verb "お食事する", meaning "to have a meal", is a little trickier: by
        itself, the token "食事" would translate into "meal", which is a noun.
        This makes this transformation context-sensitive: we need to look at not
        only the token itself but its part-of-speech, to be able to look for the
        correct replacement.
      </p>
      <p>
        The replacement found is the verb "食べる", meaning "to eat". To replace
        the verb, our algorithm identifies the dependencies of the "食事" token,
        namely "お" and "した" and marks it as the range of tokens to replace.
        Further, this verb is conjugated in the past tense, so a simple
        replacement using the lemma would modify the semantics of the sentence.
        We identify the tense of the verb and conjugate the replacement verb
        accordingly, resulting into the replacement tokens "食べた". The last
        replacement of "参った", being the polite form of "to go", is performed
        in a similar manner and results in "行った", which is the regular form
        of the same verb.
      </p>
    </Container>
  );
}
