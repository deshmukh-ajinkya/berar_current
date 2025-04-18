import { z as zod } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';

import { FormHead } from 'src/auth/components/form-head';

import axios from 'axios';
import { signInWithPassword } from '../context';
import { useData } from '../context/initialState';

export const SignInSchema = zod.object({
  username: zod
    .string()
    .min(1, { message: 'Mobile/LAN number is required!' })
    .refine(
      (val) => {
        const mobilePattern = /^\d{10}$/;
        const loanNumericPattern = /^\d{5,7}$/;
        const loanAlphaNumericPattern = /^[a-zA-Z0-9]{16}$/;

        return (
          mobilePattern.test(val) ||
          loanNumericPattern.test(val) ||
          loanAlphaNumericPattern.test(val)
        );
      },
      {
        message:
          'Enter a valid 10-digit mobile number, 5-7 digit loan account number, or 16-character alphanumeric loan number.',
      }
    ),
});

export function JwtSignInView() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const { dispatch } = useData();

  const methods = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { username: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const response = await axios.post('http://localhost:8000/api/customer/send-otp/', data);
    console.log(response);
    try {
      if (response.status === 200) {
        dispatch({ type: 'VERIFY_OTP', payload: { username: data.username } });
        router.push(paths.auth.verify);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message || 'Something went wrong.');
    }
  });

  return (
    <>
      <FormHead title="Sign in with Mobile Number/Lan Number" />
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box gap={3} display="flex" flexDirection="column">
          <Field.Text
            name="username"
            label="Mobile Number / Lan Number"
            InputLabelProps={{ shrink: true }}
          />
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Send Otp
          </LoadingButton>
        </Box>
      </Form>
    </>
  );
}
