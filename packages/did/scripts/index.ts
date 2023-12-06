import { DidManager } from '../DidManager';

export const scripts = async () => {
  console.log('___Running scripts___');
  await DidManager.createDids();
};

scripts();
