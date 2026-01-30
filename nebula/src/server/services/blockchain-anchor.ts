import { createHash } from "crypto";

export class BlockchainAnchorService {
  hashPayload(payload: object): string {
    const json = JSON.stringify(payload, Object.keys(payload).sort());
    return createHash("sha256").update(json).digest("hex");
  }

  async anchorEvent(eventHash: string, projectId: string): Promise<string> {
    console.info("[Nebula Lite] anchorEvent", { eventHash, projectId });
    return this.hashPayload({ eventHash, projectId, anchoredAt: Date.now() });
  }

  async anchorBatch(
    events: { hash: string; projectId: string }[]
  ): Promise<string> {
    console.info("[Nebula Lite] anchorBatch", { events });
    return this.hashPayload({ events, anchoredAt: Date.now() });
  }

  async anchorDailyRoot(
    merkleRoot: string,
    dayTimestamp: number,
    eventCount: number
  ): Promise<string> {
    console.info("[Nebula Lite] anchorDailyRoot", {
      merkleRoot,
      dayTimestamp,
      eventCount
    });
    return this.hashPayload({ merkleRoot, dayTimestamp, eventCount });
  }

  async verify(eventHash: string): Promise<boolean> {
    console.info("[Nebula Lite] verify", { eventHash });
    return false;
  }
}
