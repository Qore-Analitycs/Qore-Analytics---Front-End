export interface geracaoPromptrompt {
  projetoId: number;
  urlPullRequest: string;
  branch: string;
  commitSha: string;
  urlAlvo: string;
  prompt: string;
  githubToken: string;
}