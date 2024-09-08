import {
  AttestationResult,
  EvmChains,
  SignProtocolClient,
  SpMode,
} from "@ethsign/sp-sdk";
import { WalletClient } from "viem";

export default class SignClient {
  private readonly signClient: SignProtocolClient;

  constructor(walletClient: WalletClient) {
    this.signClient = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
      walletClient: walletClient,
    });
  }

  async createSchema() {
    try {
      const response = await this.signClient.createSchema({
        name: "Funding Receipt",
        data: [
          { name: "amount", type: "uint256" },
          { name: "project", type: "string" },
        ],
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  async attest({
    project,
    amount,
  }: {
    project: string;
    amount: number;
  }): Promise<AttestationResult> {
    try {
      const response = await this.signClient.createAttestation({
        schemaId: "0x1a2",
        data: {
          project,
          amount,
        },
        indexingValue: project,
      });

      return response;
    } catch (e) {
      throw e;
    }
  }
}
