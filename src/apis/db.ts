import { getURL } from "@/utils/app";
import { RequestHelper } from "@/utils/http";

export const getAllTables = async (schema: string) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("db")}/${schema}/tables`,
  });

  return response;
};

export const getTablesMetadata = async ({
  schema,
  tables,
}: {
  schema: string;
  tables: string[];
}) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("db")}/${schema}/tables/metadata`,
    method: "POST",
    reqParams: { tables },
  });

  return response;
};

export const executeQuery = async (query: string) => {
  const response = await RequestHelper.makeRequest({
    url: `${getURL("db")}/execute`,
    method: "POST",
    reqParams: { query },
  });

  return response;
};

export const executeSingleQuery = async ({ queryKey }: { queryKey: any[] }) => {
  return executeQuery(queryKey[1]);
};
