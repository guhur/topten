"use client";
import { useState } from "react";
import { openai_api_key } from "../lib/constants";

/**
 * Generate a prompt using GPT-like model
 */
export default function GenerateSentence() {
  const [sentence, setSentence] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log("OPEN API AI", openai_api_key);
  console.log("OPEN API AI");

  // Run a request to ChatGPT API
  const handleGenerate = async () => {
    try {
      setLoading(true);
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-4-1106-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Le jeu Top Ten est un jeu de société. Voici un résumé des règles. Les joueurs doivent répondre à divers thèmes ou questions en fonction du numéro (de 1 à 10) qu'ils reçoivent. Voici quelques exemples de questions : (1) 'Vous recevez une visite inattendue, qui vous ferait le plus plaisir, de 'Pas ravi du tout' à 'Quelle agréable surprise'. Par exemple, si vous avez la carte 1, vous pourriez dire "Votre contrôleur des impôts", et si vous avez la carte 10, vous pourriez choisir entre des célébrités comme Roger Federer ou Michelle Obama. Naufrage du Titanic : "Quel objet fallait-il avoir lors du naufrage du Titanic ? du moins utile au plus utile". Les réponses pourraient varier de "une bouée canard" (pour un numéro bas) à "une machine à remonter le temps" (pour un numéro élevé). Ces questions illustrent le concept du jeu où chaque réponse doit correspondre à une position sur une échelle de 1 à 10, le numéro 1 étant le moins intense ou le moins désirable, et le numéro 10 étant le plus intense ou le plus désirable. Propose 4 questions. Retourne uniquement les questions sans contexte ni exemples.`,
                },
              ],
            },
          ],
          max_tokens: 1000,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openai_api_key}`,
        },
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      setSentence(data.choices[0].message.content);
      setLoading(false);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      setSentence("Error occurred");
    }
  };

  return (
    <div>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Chargement..." : "Générer une phrase"}
      </button>
      <p>{sentence}</p>
    </div>
  );
}
