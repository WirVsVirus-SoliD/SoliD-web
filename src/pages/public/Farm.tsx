import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {useMemo} from 'react';
import {PrimaryButton} from '../../components/Button';
import Header from '../../components/Header';
import {SectionHeader} from '../../components/Section';

import {Table} from '../../components/Table';
import {SectionTitle, Title} from '../../components/Title';

function createData(title: string, location: string, neededHelpers: number) {
  return {title, location, neededHelpers};
}

const data = [
  createData('Frozen yoghurt', 'Frankfurt am Main', 12),
  createData('Ice cream sandwich', 'Frankfurt am Main', 14),
  createData('Eclair', 'Frankfurt am Main', 8),
  createData('Cupcake', 'Frankfurt am Main', 12),
  createData('Gingerbread', 'Frankfurt am Main', 6)
];

function useFarmTableColumns() {
  return useMemo(
    () => [
      {
        Header: 'Ernteart',
        accessor: 'title'
      },
      {
        Header: 'Standort',
        accessor: 'location'
      },
      {
        Header: 'Benötigte Helfer',
        accessor: 'neededHelpers'
      },
      {
        Header: 'Aktion'
      }
    ],
    []
  );
}

const initialValues = {
  location: '',
  radius: null as number | null
};

function Helper({data}: any) {
  const columns = useFarmTableColumns();

  return (
    <Container>
      <Header/>

      {/* Profile*/}
      <section className="mb-8">
        <SectionHeader>
          <SectionTitle>Mein Profil</SectionTitle>
          <PrimaryButton>Profil bearbeiten</PrimaryButton>
        </SectionHeader>
        <Grid container spacing={2} className="px-2">
          <Grid item xs={12} sm={4}>
            <Title as="h3" className="uppercase text-gray-600 text-xs " bold>
              Name
            </Title>
            <span>Albert Einstein</span>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Title as="h3" className="uppercase text-gray-600 text-xs" bold>
              PLZ
            </Title>
            <span>60306</span>
          </Grid>
        </Grid>
      </section>

      {/* Table */}
      <section>
        <SectionHeader>
          <SectionTitle>Meine Ernten</SectionTitle>
          <PrimaryButton>Ernte hinzufügen</PrimaryButton>
        </SectionHeader>
      </section>

      <Table columns={columns} data={data} block/>
    </Container>
  );
}

export default Helper;
