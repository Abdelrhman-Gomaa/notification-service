import { Model } from 'objection';

export class Notification extends Model {
  static get tableName(): string {
    return 'notifications';
  }

  id!: number;
  userId!: number;
  parentId!: number;
  content!: string;
  thumbnail?: string;
  NotifyType?: string;
  notifyService?: string;

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'parentId', 'content', 'NotifyType'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        parentId: { type: 'integer' },
        content: { type: 'string' },
        thumbnail: { type: 'string' },
        NotifyType: { type: 'string', minLength: 1, maxLength: 255 },
        notifyService: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }
}