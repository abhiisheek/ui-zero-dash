import { useMutation, useQueries } from "@tanstack/react-query";

import { getAllTables, getTablesMetadata, executeQuery } from "@/apis/db";

export const useTables = () => useMutation({ mutationFn: getAllTables });
export const useTablesMetadata = () => useMutation({ mutationFn: getTablesMetadata });
export const useExecuteQuery = () => useMutation({ mutationFn: executeQuery });
export const useExecuteQueries = (queries: any[]) => {
  const queriesList: any = queries.map((query) => ({
    queryKey: ["executeQuery", query],
    queryFn: ({ queryKey }: any) => executeQuery(queryKey[1]),
  }));

  return useQueries({ queries: queriesList });
};
