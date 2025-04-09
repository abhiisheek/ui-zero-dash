export const convertToVegaLiteData = (data: any[]) => ({ values: Array.isArray(data) ? data : [] });
