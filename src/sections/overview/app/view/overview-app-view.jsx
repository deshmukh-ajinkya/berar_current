import { useRef, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { useData } from 'src/auth/context/initialState';
import { AppWelcome } from '../app-welcome';

export function OverviewAppView() {
  const [loanData, setLoanData] = useState([]);
  const hasFetched = useRef(false);
  const { state } = useData();

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const stored = sessionStorage.getItem('username') || '';

        const response = await axios.post(endpoints.auth.profileget, {
          username: state.username.username,
        });

        console.log('🚀 API response:', response);

        const profiles = response?.data?.profiles || [];

        setLoanData(profiles);

        console.log('✅ Final profiles to show:', profiles);
      } catch (error) {
        console.error('❌ Error fetching loan data:', error);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchLoanData();
    }
  });

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {loanData.map((loan, index) => (
          <Grid key={index} xs={12} md={4}>
            <AppWelcome
              description="Mobile/LAN Number"
              title={loan.loan_id || 'No LAN'}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  href={`${paths.dashboard.lan_details}`}
                >
                  Show
                </Button>
              }
            />
          </Grid>
        ))}
      </Grid>
    </DashboardContent>
  );
}
