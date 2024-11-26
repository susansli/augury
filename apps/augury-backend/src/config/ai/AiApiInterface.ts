abstract class AbstractAiApi {
  abstract generateResponse(input: string): Promise<string>;
}

export default AbstractAiApi;
