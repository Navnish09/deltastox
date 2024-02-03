// Function to create columns for the react-table
// https://tanstack.com/table/latest/docs/api/core/column-def
export const createColumns = <E extends Readonly<Array<string>>>(
  entriesData: Readonly<E[]>
): Array<{
  accessorKey: E[0];
  header: E[1];
}> => {
  return entriesData.map((entry) => {
    return {
      accessorKey: `${entry[0]}`,
      header: `${entry[1]}`,
    };
  });
};
