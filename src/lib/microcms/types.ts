import type {
  GetListRequest as MicroCMSGetListRequest,
  GetObjectRequest as MicroCMSGetObjectRequest,
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSObjectContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'
import type { Work } from '@/types'

// Endpoint Specific Types
interface Self {
  picture: MicroCMSImage
  introduction: string
}

type Works = Work & MicroCMSListContent

interface Endpoints {
  object: {
    self: Self
  }
  list: {
    works: Works
  }
}

// MicroCMS Types
interface GetQueries<TField> extends Omit<MicroCMSQueries, 'fields'> {
  fields?: Array<TField>
}

interface GetListRequest<
  TListEndpoints extends keyof Endpoints['list'],
  TSchema extends Endpoints['list'][TListEndpoints],
  TField extends keyof TSchema,
> extends Omit<MicroCMSGetListRequest, 'endpoint' | 'queries'> {
  endpoint: TListEndpoints
  queries?: GetQueries<TField>
}

interface GetListResponse<TSchema, TField extends keyof TSchema> extends Omit<
  MicroCMSListResponse<TSchema>,
  'contents'
> {
  contents: Array<Pick<TSchema, TField>>
  totalCount: number
  offset: number
  limit: number
}

interface GetObjectRequest<
  TObjectEndpoints extends keyof Endpoints['object'],
  TSchema extends Endpoints['object'][TObjectEndpoints],
  TField extends keyof TSchema,
> extends Omit<MicroCMSGetObjectRequest, 'endpoint' | 'queries'> {
  endpoint: TObjectEndpoints
  queries?: GetQueries<TField>
}

type  GetObjectResponse<TSchema, TField extends keyof TSchema> = MicroCMSObjectContent & Pick<TSchema, TField>

export type {
  GetQueries,
  GetListRequest,
  GetListResponse,
  GetObjectRequest,
  GetObjectResponse,
  Endpoints,
  Works,
}
