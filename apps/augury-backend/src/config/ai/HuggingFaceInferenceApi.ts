import { HfInference } from '@huggingface/inference';
import AbstractAiApi from './AiApiInterface';

class HuggingFaceInferenceApi implements AbstractAiApi {
  private client: HfInference;

  public constructor() {
    this.client = new HfInference(process.env.HUGGINGFACE_API_KEY);
  }

  public generateResponse(input: string): Promise<string> {
    // Taken from inference completion example, using Mixtral to give better responses
    return this.client
      .chatCompletion({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'user',
            content: input.trim(),
          },
        ],
        max_tokens: 500,
      })
      .then((chatCompletion) => {
        return chatCompletion.choices[0].message.content;
      });
  }
}

export default HuggingFaceInferenceApi;
