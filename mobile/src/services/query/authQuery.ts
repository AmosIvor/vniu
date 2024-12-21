import {useAppNavigation} from '@hooks/app/useAppNavigation';
import {
  TQueryError,
  useAppMutation,
  useAppMutationFormData,
} from '@hooks/app/useAppQuery';
import {useAppToastMessage} from '@hooks/app/useAppToastMessage';
import {useAppStore} from '@stores/appStore';
import {
  TCheckEmailExistRequest,
  TCheckEmailOtpRequest,
  TEditAccountRequest,
  TKycCitizenIdentityCardRequest,
  TKycFaceIdRequest,
  TKycPassportRequest,
  TKycPersonalInfoRequest,
  TLoginWithEmailRequest,
  TRegisterWithEmailRequest,
  TResendForgotPasswordCheckOtpRequest,
  TResendForgotPasswordRequest,
  TResendForgotPasswordResendOtpRequest,
  TResendForgotResetPasswordRequest,
  TResendOptRequest,
  TSocialAuthRequest,
} from '@type/service/request/authRequest';
import {TLoginWithEmailResponse} from '@type/service/response/authResponse';

import {useCallback} from 'react';

import {API_URL} from '@constants/api';
import {showToastQueryError} from '@utils/commons';

export const useLoginWithEmail = ({
  isDisableNavigationWhenSuccess,
}: {
  isDisableNavigationWhenSuccess?: boolean;
}) => {
  const {replace} = useAppNavigation();
  const {setAuth} = useAppStore();

  const {showToast} = useAppToastMessage();

  const _onError = useCallback((error: TQueryError) => {
    showToastQueryError(error);
  }, []);

  const _onSuccess = useCallback(
    (res: TLoginWithEmailResponse) => {
      const {refreshToken, token} = res.auth;
      setAuth({token: token, refreshToken: refreshToken});
      if (isDisableNavigationWhenSuccess) {
        return;
      }
      showToast('success', 'Login success');
      replace('BottomTab', {screen: 'InvestScreen'});
    },
    [isDisableNavigationWhenSuccess, replace, setAuth, showToast],
  );

  return useAppMutation<TLoginWithEmailRequest, TLoginWithEmailResponse>({
    url: API_URL.AUTH.LOGIN_WIDTH_EMAIL,
    option: {
      onSuccess: _onSuccess,
      onError: _onError,
    },
  });
};

export const useLoginWithEmailQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: (res: TLoginWithEmailResponse) => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TLoginWithEmailRequest, TLoginWithEmailResponse>({
    url: API_URL.AUTH.LOGIN_WIDTH_EMAIL,
    option: {
      onSuccess: onSuccess,
      onError: onError,
    },
  });
};

export const useCheckEmailExistQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TCheckEmailExistRequest, unknown>({
    url: API_URL.AUTH.CHECK_EMAIL_EXIST,
    option: {onSuccess, onError},
  });
};

export const useRegisterWithEmailQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TRegisterWithEmailRequest, unknown>({
    url: API_URL.AUTH.REGISTER_WITH_EMAIL,
    option: {onSuccess, onError},
  });
};

export const useResendOtpQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TResendOptRequest, unknown>({
    url: API_URL.AUTH.RESEND_OTP,
    option: {onSuccess, onError},
  });
};

export const useVerifyEmailOtpQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: (res: TLoginWithEmailResponse) => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TCheckEmailOtpRequest, TLoginWithEmailResponse>({
    url: API_URL.AUTH.VERIFY_EMAIL_OTP,
    option: {onSuccess, onError},
  });
};

export const useLogOutQuery = ({
  onError,
  onSuccess,
}: {
  onError: (error: TQueryError) => void;
  onSuccess: () => void;
}) => {
  return useAppMutation({
    url: API_URL.AUTH.SIGN_OUT,
    option: {onSuccess, onError},
  });
};

export const useKycPersonalInformationQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutation<TKycPersonalInfoRequest, unknown>({
    url: API_URL.AUTH.KYC_PERSONAL_INFORMATION,
    option: {onSuccess, onError},
  });
};

export const useKycPersonalCitizenQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess: () => void;
  onMutate: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<TKycCitizenIdentityCardRequest, unknown>({
    url: API_URL.AUTH.KYC_PERSONAL_CITIZEN,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useKycPassportQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess: () => void;
  onMutate: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<TKycPassportRequest, unknown>({
    url: API_URL.AUTH.KYC_PASSPORT,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useKycFaceIdQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess: () => void;
  onMutate: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<TKycFaceIdRequest, unknown>({
    url: API_URL.AUTH.KYC_FACE_ID,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useSocialAuthQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<TSocialAuthRequest, unknown>({
    url: API_URL.AUTH.LOGIN_WITH_GOOGLE,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useForgotPasswordQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<TResendForgotPasswordRequest, unknown>({
    url: API_URL.AUTH.FORGOT_PASSWORD,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};

export const useForgotPasswordCheckOtpQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: TQueryError) => void;
}) => {
  return useAppMutation<TResendForgotPasswordCheckOtpRequest, unknown>({
    url: API_URL.AUTH.FORGOT_PASSWORD_CHECK_OTP,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useForgotResetPasswordQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: TQueryError) => void;
}) => {
  return useAppMutation<TResendForgotResetPasswordRequest, unknown>({
    url: API_URL.AUTH.FORGOT_RESET_PASSWORD,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};
export const useForgotPasswordResendOtpQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess?: () => void;
  onMutate?: () => void;
  onError?: (error: TQueryError) => void;
}) => {
  return useAppMutation<TResendForgotPasswordResendOtpRequest, unknown>({
    url: API_URL.AUTH.FORGOT_PASSWORD_RESEND_OTP,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};

export const useEditAccountQuery = ({
  onSuccess,
  onError,
  onMutate,
}: {
  onSuccess: () => void;
  onMutate: () => void;
  onError: (error: TQueryError) => void;
}) => {
  return useAppMutationFormData<any, unknown>({
    url: API_URL.USER.UPDATE_PROFILE,
    option: {
      onSuccess,
      onError,
      onMutate,
    },
  });
};

export const authQuery = {
  useCheckEmailExistQuery,
  useRegisterWithEmailQuery,

  useVerifyEmailOtpQuery,
  useResendOtpQuery,

  //auth
  useLogOutQuery,
  useLoginWithEmailQuery,

  useForgotPasswordQuery,
  useForgotPasswordResendOtpQuery,
  useForgotPasswordCheckOtpQuery,
  useForgotResetPasswordQuery,
  //kyc
  useKycPersonalInformationQuery,
  useKycPersonalCitizenQuery,
  useKycPassportQuery,
  useKycFaceIdQuery,

  //social
  useSocialAuthQuery,
};
