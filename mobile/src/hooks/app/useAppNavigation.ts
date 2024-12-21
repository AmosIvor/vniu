import {
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import React from 'react';

export type TOnboardingParamsList = {
  SplashScreen: undefined;
  IntroScreen: undefined;
};

export type TAccountParamsList = {
  AccountScreen: undefined;
  EditAccountScreen: undefined;
  WatchListScreen: undefined;
  PrivacyAndSecurityScreen: undefined;
  ChangeEmailScreen: undefined;
  ChangePasswordScreen: undefined;
  ChangeEmailEnterCodeScreen: {email: string};
  ChangeEmailVerifyMailEnterCodeScreen: {email: string};
  PaymentMethodsScreen: undefined;
  IdentityVerificationScreen: undefined;
  BlockUserScreen: undefined;
  CloseAccountScreen: undefined;
  AboutAcroScreen: undefined;
  HelpAndFAQScreen: undefined;
};

export type TKycInfoParamsList = {
  KycResidencyScreen: undefined;
  KycNationalityScreen: undefined;
  KycAddressScreen: undefined;
  KycBirthScreen: undefined;
};
export type TKycIDParamsList = {
  KycChooseVerifyTypeScreen: undefined;
  KycCitizenIdentityCardTakePhotoFrontScreen: undefined;
  KycCitizenIdentityCardUpLoadPhotoFrontScreen: undefined;
  KycCitizenIdentityCardTakePhotoBackScreen: undefined;
  KycPassportTakePhotoScreen: undefined;
  KycCitizenIdentityCardUpLoadPhotoBackScreen: undefined;
  KycPassportUploadPhotoScreen: undefined;
};
export type TKycLivenessParamsList = {
  KycFaceIdScreen: undefined;
};
export type TKycDoneParamsList = {
  KycDoneScreen: undefined;
};
export type TKycParamsList = {
  KycInfoStack: NavigatorScreenParams<TKycInfoParamsList>;
  KycIdStack: NavigatorScreenParams<TKycIDParamsList>;
  KycLivenessStack: NavigatorScreenParams<TKycLivenessParamsList>;
  KycDoneStack: NavigatorScreenParams<TKycDoneParamsList>;
};

export type TAuthParamsList = {
  CreateAccountScreen: undefined;
  CreateAccountWithMailScreen: undefined;
  CreateAccountVerifyMailEnterCodeScreen: {email: string};
  CreateAccountCreatePasswordScreen: {email: string};
  LogInScreen: undefined;
  LogInWithMailScreen: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordCreateNewPasswordScreen: {otp: string; email: string};
  ForgotPasswordVerifyMailScreen: {email: string};
  KycConfirmationScreen: undefined;
};
export type TInvestParamsList = {
  InvestDetailScreen: {investId: string};
  SignUpScreen: undefined;
  EmailSubscriptionScreen: undefined;
  SearchScreen: undefined;
  FundedListScreen: undefined;
  ComingSoonListScreen: undefined;
};

export type TPortfolioParamsList = {
  PortfolioShowPropertyScreen: undefined;
  OwnedPropertyScreen: {itemId: string};
  PortfolioHistoryScreen: undefined;
};

export type TMarketParamsList = {
  MarketBuyNowScreen: {numberOfShare: number};
};

export type TBottomTabParamsList = {
  InvestScreen: undefined;
  MarketScreen: undefined;
  PortfolioScreen: undefined;
  NotifyScreen: undefined;
};

export type TRootStackParamList = {
  OnboardingStack: NavigatorScreenParams<TOnboardingParamsList>;
  BottomTab: NavigatorScreenParams<TBottomTabParamsList>;
  AuthStack: NavigatorScreenParams<TAuthParamsList>;
  InvestStack: NavigatorScreenParams<TInvestParamsList>;
  AccountStack: NavigatorScreenParams<TAccountParamsList>;
  KycStack: NavigatorScreenParams<TKycParamsList>;
  PortfolioStack: NavigatorScreenParams<TPortfolioParamsList>;
  MarketStack: NavigatorScreenParams<TMarketParamsList>;
};

export type AppStackParamsList = TOnboardingParamsList &
  TAuthParamsList &
  TBottomTabParamsList &
  TRootStackParamList &
  TAccountParamsList &
  TKycInfoParamsList &
  TKycIDParamsList &
  TKycParamsList &
  TInvestParamsList &
  TPortfolioParamsList &
  TKycLivenessParamsList &
  TMarketParamsList &
  TKycDoneParamsList;

export type TScreenItem<T> = {
  key: number;
  name: keyof T;
  component: React.FC;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<AppStackParamsList, keyof AppStackParamsList>;
        navigation: any;
      }) => NativeStackNavigationOptions);
};

export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
};

export const useAppRoute = <RouteName extends keyof AppStackParamsList>(
  name: RouteName,
) => {
  return useRoute<RouteProp<AppStackParamsList, typeof name>>();
};
