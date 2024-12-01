export const PROPERTY_STATUS = {
  DRAFTS: 'drafts',
  PUBLISHED: 'published',
  SOLD: 'sold',
}
export const PROPERTY_QUERY = {
  //auth
  LOGIN: 'log-in',
  REGISTER: 'register',
  LOGOUT: 'log-out',

  //property
  PROPERTIES: 'properties',
  PROPERTY_DETAIL: 'property-detail',
  CREATE_INFORMATION_PROPERTY: 'create-information-property',
  UPDATE_INFORMATION_PROPERTY: 'update-information-property',

  // location
  PROVINCES: 'provinces',
  DISTRICTS: 'districts',
  WARDS: 'wards',
} as const
