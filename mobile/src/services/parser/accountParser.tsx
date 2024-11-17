import {TAccountProfile} from '@type/app/accountType';
import {TUserProfileResponse} from '@type/service/response/userResponseType';

import {EKYCStepVerified} from '@constants/kyc';

export const accountProfileParser = (
  data: TUserProfileResponse,
): TAccountProfile => {
  return {
    userId: data?.userId,
    fullName: data?.fullName,
    stepVerified: data?.stepVerified as EKYCStepVerified,
    avatar: data?.avatarUrl,
    userName: data?.userName,
    bio: data?.bio,
  };
};
