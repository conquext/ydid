import { RecordsWriteResponse, Web5, Web5ConnectOptions } from '@web5/api';
import { DidKeyCreateOptions, DidKeyMethod } from '@web5/dids';

export type DidMethod = 'key' | 'ion' | 'dht';
export type DidDataFormat = 'text/plain';

export type ProtocolDefinition = any;

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

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async registerProtocol(params: {
    did: string;
    web5: Web5;
    protocolDefinition: ProtocolDefinition;
    send?: boolean;
  }) {
    try {
      const { protocol, status } = await params.web5.dwn.protocols.configure({
        message: {
          definition: params.protocolDefinition,
        },
      });

      if (!params.send) {
        return { status, result: undefined };
      }

      // sends protocol to remote DWNs immediately (vs waiting for sync)
      const resp = await protocol?.send(params.did);
      return { result: resp, status };
    } catch (err) {
      console.log({ err });
    }
  },

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async writeToProtocol(params: {
    did: string;
    data: any;
    recipientDiD: string;
    schema: string;
    dataFormat: string;
    parentId?: string;
    contextId?: string;
    web5: Web5;
    path: string;
    protocolPath: string;
  }) {
    try {
      const { record: postRecord, status: createStatus } =
        await params.web5.dwn.records.create({
          data: params.data, // 'Hey this is my first post!',
          message: {
            recipient: params.recipientDiD,
            schema: params.schema, // 'https://social-media.xyz/schemas/postSchema',
            dataFormat: params.dataFormat || 'text/plain',
            protocol: params.protocolPath,
            ...(params.parentId && { parentId: params.parentId }),
            ...(params.contextId && { contextId: params.contextId }),
            protocolPath: params.path, // e.g 'data', 'data/username',
          },
        });
      return { record: postRecord, status: createStatus };
    } catch (err) {
      console.log({ err });
    }
  },

  // Check protocol installed on target DWN
  async checkConfiguredProtocols(params: {
    targetDiD: string;
    web5: Web5;
    protocolPath: string;
  }) {
    try {
      const { protocols } = await params.web5.dwn.protocols.query({
        from: params.targetDiD,
        message: {
          filter: {
            protocol: params.protocolPath,
          },
        },
      });
      // an array of protocol configurations on the DWN
      return protocols;
    } catch {}
  },

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async readFromProtocol(params: {
    targetDiD: string;
    schema?: string;
    web5: Web5;
    protocolPath: string;
  }) {
    try {
      const { records: data } = await params.web5.dwn.records.query({
        from: params.targetDiD,
        message: {
          filter: {
            protocol: params.protocolPath,
          },
        },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  },

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async readWithRecordId(params: {
    targetDiD: string;
    recordId: string;
    web5: Web5;
  }) {
    try {
      const { record: data } = await params.web5.dwn.records.read({
        // from: params.targetDiD,
        message: {
          filter: {
            recordId: params.recordId,
          },
        },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  },

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async deleteWithRecordId(params: {
    targetDiD: string;
    recordId: string;
    web5: Web5;
  }) {
    try {
      await params.web5.dwn.records.delete({
        message: {
          recordId: params.recordId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },

  // To use a protocol in your app, you’ll need to install that protocol to your DWN
  async readFromProtocolWithParentId(params: {
    did: string;
    data: any;
    recipientDiD: string;
    schema: string;
    dataFormat: string;
    parentId?: string;
    contextId?: string;
    web5: Web5;
    path: string;
    protocolPath: ProtocolDefinition;
  }) {
    try {
      const { records: data } = await params.web5.dwn.records.query({
        from: params.recipientDiD,
        message: {
          filter: {
            protocol: params.protocolPath,
          },
        },
      });
      return data;
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
