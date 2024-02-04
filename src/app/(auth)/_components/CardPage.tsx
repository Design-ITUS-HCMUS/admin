'use client';

// React and Next
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Libs
import { OTPInput, PasswordFieldWithLabel as PassField, TextFieldWithLabel as TextField } from '@/libs/ui/components';
import { colors } from '@/libs/ui';

// Material UI Components
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// Material UI Icons
import MailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonRounded';

// Internal
import { CardHeader, Row, StyledForm, SupportTextStyle } from '.';

interface CardProps {
  header: string;
  content?: string;
  timeRemainInSecond?: number;
  userNameTitle?: string;
  userNamePlaceholder?: string;
  passwordTitle?: string;
  passwordPlaceholder?: string;
  buttonPrimaryText?: string;
  buttonSecondaryText?: string;
  footerMainText?: string;
  footerLinkText?: string;
  buttonPrimaryHref?: string;
  footerLinkHref?: string;
  showSignInWithOther?: boolean;
  showSignInWithAccount?: boolean;
  showContent?: boolean;
  showOTP?: boolean;
  showInputUsername?: boolean;
  showInputEmail?: boolean;
  showInputPassword?: boolean;
  showInputRetypePassword?: boolean;
  showForgetPassword?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  showFooter?: boolean;
  disableSecondaryButton?: boolean;
  handleCompleteCountDown?: () => void;
}

interface CountdownProps {
  initialSeconds: number;
  onComplete: () => void;
}

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

  return `${formattedMinutes}:${formattedSeconds}`;
}

const CountdownComponent = ({ initialSeconds, onComplete }: CountdownProps) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, onComplete]);

  return <span style={{ fontWeight: '800' }}>{formatSeconds(seconds)}</span>;
};

export const CardPage = ({
  header,
  content,
  timeRemainInSecond,
  userNameTitle,
  userNamePlaceholder,
  passwordTitle,
  passwordPlaceholder,
  buttonPrimaryText,
  buttonSecondaryText,
  footerMainText,
  footerLinkText,
  buttonPrimaryHref,
  footerLinkHref,
  showSignInWithOther,
  showSignInWithAccount,
  showContent,
  showOTP,
  showInputUsername,
  showInputEmail,
  showInputPassword,
  showInputRetypePassword,
  showForgetPassword,
  showPrimaryButton,
  showSecondaryButton,
  showFooter,
  disableSecondaryButton,
  handleCompleteCountDown,
}: CardProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAlert, setShowAlert] = useState(false);
  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);

  return (
    <>
      <CardHeader>
        <div dangerouslySetInnerHTML={{ __html: header }} />
      </CardHeader>
      {showSignInWithOther && (
        <Row>
          <Button
            color='info'
            variant='contained'
            size='large'
            style={{ width: '100%' }}
            endIcon={
              isSmallScreen ? (
                <Image src='/google-logo.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              ) : (
                <Image src='/google-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              )
            }>
            Đăng nhập với
          </Button>
          <Button
            color='info'
            variant='contained'
            size='large'
            style={{ width: '100%' }}
            endIcon={
              isSmallScreen ? (
                <Image src='/ms-logo.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              ) : (
                <Image src='/ms-wordmark.svg' width='0' height='24' style={{ width: 'auto' }} alt='google icon' />
              )
            }>
            Đăng nhập với
          </Button>
        </Row>
      )}
      {showAlert && (
        <Alert icon={false} severity='error' onClose={() => {}}>
          <Typography variant='body2' style={{ fontWeight: '400', lineHeight: '20.02px', letterSpacing: '0.17px' }}>
            Mã OTP không hợp lệ, vui lòng thử lại
          </Typography>
        </Alert>
      )}
      {showContent && (
        <Typography variant='body1'>
          {(content || '') + ' '}
          <CountdownComponent
            initialSeconds={timeRemainInSecond || 0}
            onComplete={handleCompleteCountDown ? handleCompleteCountDown : () => {}}
          />{' '}
          giây.
        </Typography>
      )}
      {showSignInWithAccount && (
        <Row>
          <Divider>
            <Typography variant='body2' style={SupportTextStyle}>
              Hoặc đăng nhập với tài khoản
            </Typography>
          </Divider>
        </Row>
      )}
      {showOTP && <OTPInput onChange={onChange} />}
      {(showInputEmail || showInputPassword || showInputRetypePassword || showInputUsername) && (
        <StyledForm>
          {showInputUsername && (
            <TextField
              label={userNameTitle || 'Username'}
              inputProps={{
                placeholder: `${userNamePlaceholder || 'Username'}`,
                endAdornment: (
                  <InputAdornment position='end'>
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}></TextField>
          )}
          {showInputEmail && (
            <TextField
              label='Email'
              inputProps={{
                placeholder: 'Email',
                endAdornment: (
                  <InputAdornment position='end'>
                    <MailIcon />
                  </InputAdornment>
                ),
              }}></TextField>
          )}
          {showInputPassword && (
            <PassField
              label={passwordTitle || 'Mật khẩu'}
              inputProps={{
                placeholder: `${passwordPlaceholder || 'Nhập mật khẩu'}`,
              }}
            />
          )}
          {showInputRetypePassword && (
            <PassField
              label='Nhập lại mật khẩu mới'
              inputProps={{
                placeholder: 'Nhập lại mật khẩu mới',
              }}
            />
          )}
          {showForgetPassword && (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Link href='/forget-password' style={{ display: 'inline-block', width: 'fit-content' }}>
                <Typography variant='linkAccent'>Quên mật khẩu</Typography>
              </Link>
            </div>
          )}
        </StyledForm>
      )}
      {showPrimaryButton && (
        <Row>
          {showSecondaryButton && (
            <Button
              disabled={disableSecondaryButton}
              variant={!disableSecondaryButton ? 'text' : undefined}
              style={{ color: !disableSecondaryButton ? theme.palette.primary.main : colors.neutral[300] }}>
              {buttonSecondaryText}
            </Button>
          )}
          <Button variant='contained' size='large'>
            <Link href={buttonPrimaryHref || ''}>{buttonPrimaryText}</Link>
          </Button>
        </Row>
      )}
      {showFooter && (
        <Row style={{ alignItems: 'baseline', gap: 8 }}>
          <Typography
            style={{
              ...SupportTextStyle,
              textAlign: 'right',
              display: 'inline-block',
              width: 'fit-content',
              fontWeight: '600',
            }}>
            {footerMainText}
          </Typography>
          <Link href={footerLinkHref || ''} style={{ display: 'inline-block', width: 'fit-content' }}>
            <Typography variant='linkPrimary'>{footerLinkText}</Typography>
          </Link>
        </Row>
      )}
    </>
  );
};