import { useMutation } from "@tanstack/react-query";

import { getAllTables, getTablesMetadata, executeQuery } from "@/apis/db";

export const useTables = () => useMutation({ mutationFn: getAllTables });
export const useTablesMetadata = () => useMutation({ mutationFn: getTablesMetadata });
export const useExecuteQuery = () => useMutation({ mutationFn: executeQuery });
