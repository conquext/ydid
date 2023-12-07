import { SCHEMA_TLD } from '../constants';
import { schemas } from './common';

export const permissionSet = (_attribute: string) => {
  const permissionStruct = {
    $actions: [
      {
        who: 'anyone',
        can: 'read',
      },
      {
        who: 'author',
        can: 'write',
        of: 'data',
      },
    ],
  };

  return permissionStruct;
};

export const usernameProtocolDefinition = {
  protocol: `${SCHEMA_TLD}`,
  published: true,
  types: {
    data: {
      schema: schemas.usernameSchema,
      dataFormats: ['application/json'],
    },
    dob: {
      schema: 'dob',
      dataFormats: ['text/plain'],
    },
    image: {
      schema: 'dob',
      dataFormats: ['image/png', 'jpeg', 'gif'],
    },
    firstname: {
      schema: 'firstname',
      dataFormats: ['text/plain'],
    },
    lastname: {
      schema: 'lastname',
      dataFormats: ['text/plain'],
    },
    username: {
      schema: 'username',
      dataFormats: ['text/plain'],
    },
    usertype: {
      schema: 'usertype',
      dataFormats: ['text/plain'],
    },
  },
  structure: {
    data: {
      ...permissionSet('data'),
      dob: permissionSet('dob'),
      image: permissionSet('image'),
      firstname: permissionSet('firstname'),
      lastname: permissionSet('lastname'),
      username: permissionSet('username'),
      usertype: permissionSet('usertype'),
    },
  },
};

// is this the equivalent of this json
//  {
//   "data": {
//     "username": "elon",
//     "firstname": "Elon",
//     "lastname": "Musk",
//     "usertype": "individual"
//   }
//  }
