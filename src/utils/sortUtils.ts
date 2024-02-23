import { orderBy } from 'lodash';

export type Order = 'asc' | 'desc';

// The function to handle sorting in the front-end, later on, when BE is able to return API
// with sorted data, we can remove this function and use the BE's API instead in the main component.
// BE's API with have the form like this api/user/all-users?order=asc&orderByKey=name&page=1&limit=10

export interface Query {
  order?: Order;
  orderByKey?: string | null;
  page?: number;
  limit?: number;
}

interface ITableHandler {
  query: Query;
  data: {
    _id: string;
    [key: string]: any;
  }[];
}

export function tableHandler({ query, data }: ITableHandler) {
  const { order, orderByKey, page } = query;
  let newData = data;
  const limit = 10;
  if (order && orderByKey) newData = orderBy(data, orderByKey, order);
  else newData = data;
  if (page && limit) newData = newData.slice((page - 1) * limit, page * limit);
  return newData;
}
