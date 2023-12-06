import { SCHEMA_TLD } from '../constants';
import { schemas } from './common';

const permissionSet = (_attribute: string) => {
  const permissionStruct = {
    $actions: [
      {
        who: 'recipient',
        of: 'data',
        can: 'read',
      },
      {
        who: 'author',
        can: 'write',
        of: 'data',
      },
      {
        who: 'author',
        can: 'delete',
        of: 'data',
      },
    ],
  };

  return permissionStruct;
};

export const sessionProtocolDefinition = {
  protocol: `${SCHEMA_TLD}`,
  published: true,
  types: {
    data: {
      schema: schemas.sessionSchema,
      dataFormats: ['application/json'],
    },
    website: {
      schema: 'website',
      dataFormats: ['text/plain'],
    },
    userId: {
      schema: 'userId',
      dataFormats: ['text/plain'],
    },
    status: {
      schema: 'status',
      dataFormats: ['text/plain'],
    },
  },
  structure: {
    data: {
      $actions: permissionSet('data'),
      website: permissionSet('website'),
      userId: permissionSet('userId'),
      status: permissionSet('status'),
    },
  },
};
