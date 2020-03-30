import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Form, Formik, FormikProps } from "formik";
import { useMemo } from "react";
import { PrimaryButton } from "~/components/Button";
import { InputField } from "~/components/Form";
import Header from "~/components/Header";

import { Table } from "~/components/Table";

function createData(title: string, location: string, neededHelpers: number) {
  return { title, location, neededHelpers };
}

const data = [
  createData("Frozen yoghurt", "Frankfurt am Main", 12),
  createData("Ice cream sandwich", "Frankfurt am Main", 14),
  createData("Eclair", "Frankfurt am Main", 8),
  createData("Cupcake", "Frankfurt am Main", 12),
  createData("Gingerbread", "Frankfurt am Main", 6)
];

function useFarmTableColumns() {
  return useMemo(
    () => [
      {
        Header: "Ernteart",
        accessor: "title"
      },
      {
        Header: "Standort",
        accessor: "location"
      },
      {
        Header: "Benötigte Helfer",
        accessor: "neededHelpers"
      },
      {
        Header: "Aktion"
      }
    ],
    []
  );
}

const initialValues = {
  location: "",
  radius: null as number | null
};

function Helper() {
  const columns = useFarmTableColumns();

  return (
    <Container>
      <Header />
      {/* Form */}

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          window.alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }: FormikProps<typeof initialValues>) => {
          return (
            <Form className="mb-6">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <InputField
                    name="location"
                    label="Standort"
                    placeholder="Frankfurt am Main"
                    block
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <InputField
                    label="Entfernung (km)"
                    name="radius"
                    placeholder="30 km"
                    block
                  />
                </Grid>
                <Grid item xs={12} sm={2} className="flex items-end">
                  <PrimaryButton type="submit" className="py-2" block>
                    Filtern
                  </PrimaryButton>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>

      {/* Table */}

      <Table columns={columns} data={data} block />
    </Container>
  );
}

export default Helper;
