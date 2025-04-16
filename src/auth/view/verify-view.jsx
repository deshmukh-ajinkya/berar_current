import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'src/routes/hooks';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { paths } from 'src/routes/paths';
import { EmailInboxIcon } from 'src/assets/icons';
import { Form, Field } from 'src/components/hook-form';
import { FormHead } from 'src/auth/components/form-head';
import { FormResendCode } from 'src/auth/components/form-resend-code';
import { FormReturnLink } from 'src/auth/components/form-return-link';
import { setSession ,verifyOtp } from '../context';
import { useAuthContext } from '../hooks';

const VerifySchema = zod.object({
  code: zod.string().min(6, { message: 'Code must be at least 6 characters!' }),
});

function generateToken(username) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 3, // 3 days expiry
  }));
  const signature = btoa('secret');
  return `${header}.${payload}.${signature}`;
}

export function VerifyView() {
  const router = useRouter();
  const { checkUserSession } = useAuthContext(); // ✅ Move this here inside the function
  const methods = useForm({
    resolver: zodResolver(VerifySchema),
    defaultValues: { code: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async ({ code }) => {
    const username = sessionStorage.getItem('username');
    // if (!username) {
    //   setError('code', { message: 'Session expired. Please sign in again.' });
    //   return;
    // }
    try {
      await verifyOtp({ username, otp: code });
      await checkUserSession?.();
      router.push(paths.dashboard.root);
    } catch (error) {
      setError('code', { message: 'OTP verification failed. Please try again.' });
    }
  });
  
  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Please check your mobile number!"
        description={`We've sent a 6-digit confirmation code to your mobile or landline.\nPlease enter the code below to verify.`}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box gap={3} display="flex" flexDirection="column">
          {errors.code?.message && <Alert severity="error">{errors.code.message}</Alert>}
          <Field.Code name="code" />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Verifying..."
          >
            Verify & Redirect to Dashboard
          </LoadingButton>
        </Box>
      </Form>

      <FormResendCode onResendCode={() => { }} value={0} disabled={false} />
      <FormReturnLink href={paths.auth.signIn} />
    </>
  );
}
