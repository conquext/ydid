/**
 * TODO:
 * - First check if they have the protocol installed, else install it.
 * - Then service can fetch individual data
 */

import { Web5 } from '@web5/api';
import { usernameProtocolDefinition } from './protocols/UsernameProtocol';

export async function getUserRecord(userDID: string, web5: Web5) {
  try {
    const { records, status } = await web5.dwn.records.query({
      from: userDID,
      message: {
        filter: {
          dataFormat: 'application/json',
          protocol: usernameProtocolDefinition.protocol,
        },
      },
    });

    if (!records || records.length === 0) {
      throw new Error('Records not found');
    }

    // There are records, find the one that matches userDID
    // records.find(record => {
    //   return record.author
    // })

    records.forEach((record) => {
      console.log(record);
    });
  } catch (error: any) {
    throw new Error(`Error fetching user information:${error.message}`);
  }
}