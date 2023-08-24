import { Table as RadixTable } from '@radix-ui/themes';
import { styled } from 'styled-components';

const TableRoot = styled(RadixTable.Root)`
  width: 100%;

  & td:last-child {
    width: auto;
    text-align: right;
  }

  thead tr th:last-child {
    text-align: right;
  }
`;

export { TableRoot };
