import { createHash } from "crypto";

export class MerkleTree {
  private leaves: string[];
  private layers: string[][];

  constructor(data: string[]) {
    this.leaves = data.map((value) => this.hash(value));
    this.layers = this.buildTree();
  }

  private hash(data: string): string {
    return createHash("sha256").update(data).digest("hex");
  }

  private buildTree(): string[][] {
    const layers: string[][] = [this.leaves];

    while (layers[layers.length - 1].length > 1) {
      const currentLayer = layers[layers.length - 1];
      const nextLayer: string[] = [];

      for (let i = 0; i < currentLayer.length; i += 2) {
        const left = currentLayer[i];
        const right = currentLayer[i + 1] ?? left;
        nextLayer.push(this.hash(left + right));
      }

      layers.push(nextLayer);
    }

    return layers;
  }

  getRoot(): string {
    return this.layers[this.layers.length - 1]?.[0] ?? "";
  }

  getProof(index: number): string[] {
    const proof: string[] = [];
    let currentIndex = index;

    for (let i = 0; i < this.layers.length - 1; i += 1) {
      const layer = this.layers[i];
      const isRightNode = currentIndex % 2 === 1;
      const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;

      if (layer[siblingIndex]) {
        proof.push(layer[siblingIndex]);
      }

      currentIndex = Math.floor(currentIndex / 2);
    }

    return proof;
  }

  static verify(leaf: string, proof: string[], root: string): boolean {
    let hash = createHash("sha256").update(leaf).digest("hex");

    for (const proofElement of proof) {
      const combined = hash < proofElement ? hash + proofElement : proofElement + hash;
      hash = createHash("sha256").update(combined).digest("hex");
    }

    return hash === root;
  }
}
