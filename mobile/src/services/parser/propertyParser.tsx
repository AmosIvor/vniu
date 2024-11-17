import {TInvest} from '@type/app/itemType';
import {TPropertyResponseType} from '@type/service/response/propertyResponseType';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function typeNameParsing(typeName: string) {
  switch (typeName) {
    case 'apartment':
      return 'Apartment';
    case 'land':
      return 'Land';
    case 'resident_home':
      return 'House';
    default:
      return 'Apartment';
  }
}

export const propertiesParser = (data: TPropertyResponseType[]): TInvest[] => {
  return data.map(item => ({
    id: item?.id,
    name: item?.name,
    description: item?.description,
    city: item?.city,
    address: item?.address,
    price: item?.pricePerShare * 50,
    bookmark: Math.random() < 0.5,
    image: [`https://picsum.photos/1600/900?random=${getRandomInt(1, 1000)}`],
    investmentDate: item?.createdAt,
    pricePerSquareMeter: item?.pricePerSqm,
    totalPrice: item?.pricePerShare * 50,
    totalShares: 50,
    pricePerShare: item?.pricePerShare,
    investors: getRandomInt(1, 5),
    funded: getRandomInt(1, 5),
    status: item?.status,
    annualAppreciation: item?.annualAppreciation,
    typeName: typeNameParsing(item?.propertyType),
    noBedrooms: item?.noBedrooms,
    noBathrooms: item?.noBathrooms,
    noFloors: item?.noFloors,
    area: item?.area,
    direction: item?.direction,
  }));
};

export const propertyParser = (item: TPropertyResponseType): TInvest => {
  return {
    id: item?.id,
    name: item?.name,
    description: item?.description,
    address: item?.address,
    price: item?.pricePerShare * 50,
    bookmark: Math.random() < 0.5,
    image: [
      `https://picsum.photos/1600/900?random=${getRandomInt(1, 1000)}`,
      `https://picsum.photos/1600/900?random=${getRandomInt(1, 1000)}`,
      `https://picsum.photos/1600/900?random=${getRandomInt(1, 1000)}`,
    ],
    investmentDate: item?.createdAt,
    pricePerSquareMeter: item?.pricePerSqm,
    apartmentType: item?.apartmentType,
    annualAppreciation: item?.annualAppreciation,
    totalPrice: item?.pricePerShare * 50,
    totalShares: 50,
    pricePerShare: item?.pricePerShare,
    investors: getRandomInt(1, 5),
    funded: getRandomInt(1, 5),
    typeName: typeNameParsing(item?.propertyType),
    noBedrooms: item?.noBedrooms,
    noBathrooms: item?.noBathrooms,
    noFloors: item?.noFloors,
    area: item?.area,
    direction: item?.direction,
    videos: [],
    raisedAmount: 100,
    annualRentPrice: 5000,
    managementFee: 4850,
    anticipateHoldPeriod: 5,
    appreciation: 2,
    propertyInitialPrice: 100,
    rentStatus: item?.status,
    rentType: item?.status,
    propertyImprovement: item?.propertyImprovement,
    sourcingFee: item?.closingCosts,
    closingCost: item?.closingCosts,
    holdingCost: item?.holdingCosts,
    leveragePercentage: 50,
    loans: -10000,
    interestRate: 6.5,
  };
};
