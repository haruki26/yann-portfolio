import { createClient as _createClient } from 'microcms-js-sdk'
import type {
  MicroCMSClient,
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListContent,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'

import type {
  Endpoints,
  GetListRequest,
  GetListResponse,
  GetObjectRequest,
  GetObjectResponse,
  GetQueries,
} from './types'

const _queriesParser = <T>(queries: GetQueries<T>): MicroCMSQueries => ({
  ...queries,
  fields: queries.fields?.map((v) => String(v)),
})

export const createClient = (
  clientArg: MicroCMSClient = {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
) => {
  const client = _createClient(clientArg)

  const getList = <
    TListEndpoint extends keyof Endpoints['list'],
    TSchema extends Endpoints['list'][TListEndpoint] & MicroCMSListContent,
    TField extends keyof TSchema,
  >({
    endpoint,
    queries = {},
    ...args
  }: GetListRequest<TListEndpoint, TSchema, TField>): Promise<
    GetListResponse<TSchema, TField>
  > => {
    return client.getList<TSchema>({
      endpoint: String(endpoint),
      queries: _queriesParser(queries),
      ...args,
    })
  }

  const getListDetail = <
    TListEndpoints extends keyof Endpoints['list'],
    TSchema extends Endpoints['list'][TListEndpoints] &
      MicroCMSContentId &
      MicroCMSDate,
    TField extends keyof Endpoints['list'][TListEndpoints],
  >({
    endpoint,
    contentId,
    queries = {},
    ...args
  }: GetListRequest<TListEndpoints, TSchema, TField> & {
    contentId: string
  }): Promise<TSchema> => {
    return client.getListDetail<TSchema>({
      endpoint: String(endpoint),
      contentId,
      queries: _queriesParser(queries),
      ...args,
    })
  }

  const getObject = <
    TObjectEndpoints extends keyof Endpoints['object'],
    TSchema extends Endpoints['object'][TObjectEndpoints] &
      MicroCMSObjectContent,
    TField extends keyof TSchema,
  >({
    endpoint,
    queries = {},
    ...args
  }: GetObjectRequest<TObjectEndpoints, TSchema, TField>): Promise<
    GetObjectResponse<TSchema, TField>
  > => {
    return client.getObject<TSchema>({
      endpoint: String(endpoint),
      queries: _queriesParser(queries),
      ...args,
    })
  }

  return { ...client, getList, getListDetail, getObject }
}
