import React, { useEffect } from 'react';

import CardHeader from '@mui/material/CardHeader';
import { Box, Card, Grid, Link, Stack, Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { DownloadButton } from 'src/components/file-thumbnail';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

const STORAGE_KEY = 'your_storage_key';

export function LanDetailsView() {
  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await axios.post('api/customer_live/loan-detail/', {
          lan: '1BERAR000005000001', // Replace with dynamic value if needed
        });
        console.log('📦 Loan Details Response:', response.data);
      } catch (error) {
        console.error('❌ Error fetching loan details:', error);
      }
    };

    fetchLoanDetails();
  }, []);

  const loanId = '20012345670';

  const maskedLoanId = loanId.replace(
    /^(\d{3})\d+(?=\d$)/,
    (_, firstThree) => firstThree + '*'.repeat(loanId.length - 4)
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Loan Account Details"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Loan account', href: paths.dashboard.lan_details },
          { name: 'View' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
        <Button variant="contained" color="primary" startIcon={<DownloadButton />}>
          NOC
        </Button>
        <Button variant="contained" color="primary" startIcon={<DownloadButton />}>
          KFS
        </Button>
        <Button variant="contained" color="primary" startIcon={<DownloadButton />}>
          Welcome Letter
        </Button>
        <Button variant="contained" color="primary" startIcon={<DownloadButton />}>
          NDC
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* LEFT SIDE - Customer & Vehicle Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            {/* Customer Details */}
            <Card>
              <Form>
                <CardHeader title="Customer Details" />
                <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Branch Name :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        Manewada
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Global Id :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskedLoanId}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Customer Name :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        Vikrant Mirase
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Mobile Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        1234567890
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Aadhar Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskedLoanId}
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            </Card>

            {/* Vehicle Details */}
            <Card>
              <Form>
                <CardHeader title="Vehicle Details" />
                <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Brand :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        Honda
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Model :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskedLoanId}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Vehicle Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        MH49WE2943
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Chechis Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        253646447464
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Engine Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskedLoanId}
                      </Link>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            </Card>
          </Stack>
        </Grid>

        {/* RIGHT SIDE - Loan Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <Form>
              <CardHeader title="Loan Details" />
              <Stack spacing={2} sx={{ p: 3, typography: 'body2' }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Account Number :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Loan Id :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Scheme Name :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Finance Date :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {/* {maskedLoanId} */}
                      12-02-2025
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Tenure:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {/* {maskedLoanId} */}
                      12-02-2025
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Maturity Date:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {/* {maskedLoanId} */}
                      12-02-2025
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Loan Status :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {/* {maskedLoanId} */}
                      Active
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Closure Date:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {/* {maskedLoanId} */}
                      12-02-2025
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Repo Flag :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Write Off Amount :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Interest :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      5 %
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Duplicate Noc Charge :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskedLoanId}
                    </Link>
                  </Grid>
                </Grid>
              </Stack>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
