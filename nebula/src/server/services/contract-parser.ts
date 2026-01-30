export type ContractExtraction = {
  parties: Array<{
    role: string;
    name: string;
    clauseRef?: string;
  }>;
  obligations: Array<{
    title: string;
    description: string;
    clauseRef?: string;
    confidence: number;
  }>;
  milestones: Array<{
    name: string;
    description: string;
    dueDate?: string;
  }>;
};

export async function parseContract(
  documentText: string
): Promise<ContractExtraction> {
  return {
    parties: [
      {
        role: "owner",
        name: "Placeholder Party",
        clauseRef: "N/A"
      }
    ],
    obligations: [
      {
        title: "Manual Review Needed",
        description: `AI parsing is disabled in Nebula Lite. Manual review required.\n\nExcerpt:\n${documentText.slice(
          0,
          240
        )}`,
        clauseRef: "N/A",
        confidence: 0.0
      }
    ],
    milestones: [
      {
        name: "Baseline Review",
        description: "Confirm obligations manually before activating workflows."
      }
    ]
  };
}
