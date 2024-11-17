import {TTest, TTestOrigin} from '@type/app/investType';
import {
  TTestOriginResponse,
  TTestResponse,
} from '@type/service/response/investResponseType';

const originParser = (data: TTestOriginResponse): TTestOrigin => {
  return {name: data?.name, url: data?.url};
};
export const testParser = (data: TTestResponse[]): TTest[] => {
  return data.map(item => ({
    id: item?.id,
    name: item?.name,
    status: item?.status,
    origin: originParser(item?.origin),
  }));
};

export const InvestParser = {
  testParser,
};
