export interface Rating extends Document {
  readonly _id: string;
  readonly overall?: number;
  readonly content?: number;
  readonly placement?: number;
  readonly faculty?: number;
  readonly doubt_solving?: number;
  readonly pros: string;
  readonly cons: string;
  readonly feedback: string;
  readonly created_by?: string;
  readonly self_declaration?: boolean;
  readonly anonymous?: boolean;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}
