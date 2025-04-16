import { useRef, useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { AppWelcome } from '../app-welcome';

export function OverviewAppView() {
  const [loanData, setLoanData] = useState([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        // ✅ Get the mobile number from sessionStorage (NOT LAN)
        const stored = sessionStorage.getItem('username') || '';
        const username = stored.replace(/"/g, '').trim();

        console.log('📌 Username from sessionStorage:', username);

        // ✅ Send that mobile number to backend
        const response = await axios.post(endpoints.auth.profileget, { username });

        console.log('🚀 API response:', response);

        const profiles = response?.data?.profiles || [];

        // ✅ Optional check: if only 1 profile, and login was via LAN, show that only
        // But in this updated flow, we just show everything
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
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {loanData.map((loan, index) => (
          <Grid key={index} xs={12} md={4}>
            <AppWelcome
              description="Mobile/LAN Number"
              title={loan.lan || 'No LAN'}
              action={
                <Button
                  variant="contained"
                  color="primary"
                  href={`${paths.dashboard.lan_details}?lan=${loan.lan}`}
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
