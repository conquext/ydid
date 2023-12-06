import { RecordsWriteResponse, Web5, Web5ConnectOptions } from '@web5/api';
import { DidKeyCreateOptions, DidKeyMethod } from '@web5/dids';

export type DidMethod = 'key' | 'ion' | 'dht';
export type DidDataFormat = 'text/plain';

export const DidManager = {
  async connectWithCustomOption(options?: Web5ConnectOptions) {
    return await Web5.connect(options);
  },
  async connect(options: {
    endpoints?: Array<string>;
    agent: any;
    did: string;
    sync?: number;
  }) {
    let config = {
      // connect with existing dwn endpoint
      ...(options.endpoints && {
        techPreview: {
          dwnEndpoints: options.endpoints,
        },
      }),
      // connect with existing agent
      ...(options.agent && {
        agent: options.agent,
      }),
      // connect with existing did
      // when did is supplied, agent must also be provided
      ...(options.did && {
        connectedDid: options.did,
        agent: options.agent,
      }),
      // sync defaults to running every 2 minutes
      ...(options.sync && {
        sync: `${options.sync || 5}s`,
      }),
    };
    const resp = await Web5.connect(config);
    console.log('___CONNECTED', { resp });
    return resp;
  },

  async createDidWithMethod(method: DidKeyCreateOptions) {
    try {
      return await DidKeyMethod.create(method as DidKeyCreateOptions);
    } catch (e) {
      console.error('Unable to create dids', e);
    }
  },

  async getDocument(params: { did: string; web5: Web5 }) {
    try {
      return await params.web5.did.resolve(params.did);
    } catch {}
  },

  async createRecord(params: {
    did: string;
    web5: Web5;
    document: any;
    dataFormat: DidDataFormat;
    public?: boolean;
  }) {
    try {
      const resp = await params.web5.dwn.records.create({
        data: JSON.stringify(params.document),
        message: {
          dataFormat: params.dataFormat ?? 'text/plain',
          published: !!params.public,
          // datePublished: new Date().toISOString().replace(/\.\d{3}Z$/, '.000000Z')
        },
      });
      return resp;
    } catch {}
  },
  async readRecord(params: { record: RecordsWriteResponse }) {
    try {
      const data = await params.record.record?.data.text();
      if (data) {
        return JSON.parse(data);
      }
    } catch {}
  },
  async updateRecord(params: { record: RecordsWriteResponse; document: any }) {
    try {
      return await params.record.record?.update({
        data: JSON.stringify(params.document),
      });
    } catch {}
  },
  async deleteRecord(params: { record: RecordsWriteResponse }) {
    try {
      return await params.record.record?.delete();
    } catch {}
  },
};
