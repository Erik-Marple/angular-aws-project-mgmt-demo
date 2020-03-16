import { IRequestAdd } from './request-add';

export interface IRequestEdit extends IRequestAdd {
   requestId: string;
}
