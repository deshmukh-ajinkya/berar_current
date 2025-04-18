import React, { useEffect, useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import { Box, Card, Grid, Link, Stack, Button } from '@mui/material';
import { paths } from 'src/routes/paths';
import axios from 'src/utils/axios';
import { DashboardContent } from 'src/layouts/dashboard';
import { Form } from 'src/components/hook-form';
import { DownloadButton } from 'src/components/file-thumbnail';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export function LanDetailsView() {
  const [loanDetails, setLoanDetails] = useState([]);
  const loan_id = sessionStorage.getItem('user');

  useEffect(() => {
    let didCancel = false;

    const fetchLoanDetails = async () => {
      try {
        const response = await axios.post('api/customer/loan-detail/', {
          loan_id,
        });
        
        if (!didCancel && response.status === 200) {
          setLoanDetails(response.data.loan_details[0]);
        }
      } catch (error) {
        if (!didCancel) {
          console.error('❌ Error fetching loan details:', error);
        }
      }
    };

    fetchLoanDetails();

    return () => {
      didCancel = true;
    };
  }, [loan_id]); // 👈 add loan_id here

  function maskIdentifier(value = '') {
    if (!value || value.length <= 4) return value;

    const visibleStart = value.slice(0, 3);
    const visibleEnd = value.slice(-1);
    const maskedMiddle = '*'.repeat(value.length - 4);

    return `${visibleStart}${maskedMiddle}${visibleEnd}`;
  }

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
                      <b>Branch ID :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {loanDetails.branch_id}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Global Id :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskIdentifier(loanDetails.global_id)}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Customer Name :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {loanDetails.name}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Mobile Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {loanDetails.mobile_number}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Aadhar Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskIdentifier(loanDetails.aadhar_number)}
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
                        {loanDetails.brand}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Model :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskIdentifier(loanDetails.model)}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Vehicle Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {loanDetails.vehicle_number}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Chechis Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {loanDetails.chechis_number}
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <b>Engine Number :</b>
                    </Grid>
                    <Grid item xs={6}>
                      <Link variant="subtitle2" color="inherit">
                        {maskIdentifier(loanDetails.engine_number)}
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
                      {maskIdentifier(loanDetails.account_number)}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Loan Id :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskIdentifier(loanDetails.loan_id)}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Scheme Name :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskIdentifier(loanDetails.scheme_name)}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Finance Date :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.finance_date}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Tenure:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.tenure}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Maturity Date:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.maturity_date}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Loan Status :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.loan_status}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Closure Date:</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.closure_date}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Repo Flag :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskIdentifier(loanDetails.repo_flag)}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Write Off Amount :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskIdentifier(loanDetails.write_off_amount)}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Interest :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {loanDetails.interest}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <b>Duplicate Noc Charge :</b>
                  </Grid>
                  <Grid item xs={6}>
                    <Link variant="subtitle2" color="inherit">
                      {maskIdentifier(loanDetails.duplicate_noc_charge)}
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
