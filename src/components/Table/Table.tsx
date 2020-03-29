import classnames from 'classnames';
import React from 'react';
import {useSortBy, useTable} from 'react-table';

import {SortedIndicator, TableCell, TableRow} from './components';

type Props = {
  columns: Record<string, any>[];
  data: Record<string, any>[];
  block?: boolean;
};

const Table = ({columns, data, block = false}: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  const tableCss = classnames('table', {
    'w-full': block
  });

  return (
    <table className={tableCss} {...getTableProps()}>
      <thead className="table-header-group font-normal border-b-2 border-b-gray-200">
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => {
            return (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <TableCell
                as="th"
                align="left"
                className=" py-1 sm:py-2 sm:px-1"
                {...column.getHeaderProps(
                  (column as any).getSortByToggleProps()
                )}
              >
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <SortedIndicator
                  isSorted={(column as any).isSorted}
                  isSortedDesc={(column as any).isSortedDesc}
                />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <TableRow
            {...row.getRowProps()}
            className="odd:bg-gray-100 first:pl-1 last:pr-1"
          >
            {row.cells.map(cell => {
              return (
                <TableCell as="td" {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
      </tbody>
    </table>
  );
};

export default Table;
