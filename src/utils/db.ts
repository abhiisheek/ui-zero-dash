export const convertQueryCSVResultsToJSON = (data: [][]) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const [headers, ...rows] = data;

  const dataSource: any[] = [];

  rows.forEach((row: any) => {
    const dataItem: any = {};

    headers.forEach((header: string, index: number) => (dataItem[header] = row[index]));

    dataSource.push(dataItem);
  });

  return dataSource;
};
