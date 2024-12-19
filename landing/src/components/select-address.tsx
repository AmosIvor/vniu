'use client';

import React, { useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getRequest } from '@/lib/fetch';
import { Input } from '@/components/ui/input';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Label } from './ui/label';
import data from '@/assets/db.json';

export const SelectAddress = ({ addressValue, setAddressValue }) => {
  const [selectedProvince, setSelectedProvince] = React.useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = React.useState(new Set([]));
  const [selectedWard, setSelectedWard] = React.useState(new Set([]));

  const [diaChiTouched] = React.useState(false);
  const [provinceTouched, setProvinceTouched] = React.useState(false);
  const [districtTouched, setDistrictTouched] = React.useState(false);
  const [wardTouched, setWardTouched] = React.useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = React.useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
  const [isLoadingWard, setIsLoadingWard] = React.useState(false);

  const [provinces, setProvince] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [wards, setWard] = React.useState([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [streetValue, setStreetValue] = React.useState('');
  const [houseNumberValue, setHouseNumberValue] = React.useState('');

  useEffect(() => {
    setProvince(data.province);
    setIsLoadingProvince(false);
  }, []);

  useEffect(() => {
    setDistrict([]);
    setWard([]);
    if (selectedProvince.size > 0) {
      setIsLoadingDistrict(true);
      const valuesArray = Array.from(selectedProvince);
      const provinceCode = valuesArray[0];
      const filteredDistricts = data.district.filter(
        (d) => d.idProvince === provinceCode
      );
      setDistrict(filteredDistricts);
      setIsLoadingDistrict(false);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict.size > 0) {
      setIsLoadingWard(true);
      const valuesArray = Array.from(selectedDistrict);
      const districtCode = valuesArray[0];
      const filteredWards = data.commune.filter(
        (c) => c.idDistrict === districtCode
      );
      setWard(filteredWards);
      setIsLoadingWard(false);
    }
  }, [selectedDistrict]);
  console.log(wards);
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  const onSubmit = () => {
    const valuesArrayProvince = Array.from(selectedProvince);
    const provinceCode = valuesArrayProvince[0];
    const provinceValue = provinces.find(
      (province) => province.idProvince == provinceCode
    )?.name;

    const valuesArrayDistrict = Array.from(selectedDistrict);
    const districtCode = valuesArrayDistrict[0];
    const districtValue = districts.find(
      (district) => district.idDistrict == districtCode
    )?.name;

    const valuesArrayWard = Array.from(selectedWard);
    const wardCode = valuesArrayWard[0];
    const wardValue = wards.find((ward) => ward.idCommune == wardCode)?.name;
    console.log(
      provinceValue,
      districtValue,
      wardValue,
      streetValue,
      houseNumberValue
    );
    setAddressValue(
      `${houseNumberValue}, ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
    );
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-full gap-y-3">
      <Label>Address</Label>
      <Select
        isOpen={false}
        label="Your Address"
        placeholder="Choose your address"
        selectedKeys={addressValue !== '' ? [addressValue] : null}
        isInvalid={addressValue !== '' || !diaChiTouched ? false : true}
        errorMessage={
          addressValue !== '' || !diaChiTouched
            ? ''
            : 'Please choose your address'
        }
        className="w-full"
        radius="sm"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <SelectItem key={addressValue} value={addressValue}>
          {addressValue}
        </SelectItem>
      </Select>
      {isModalOpen ? (
        <DialogCustom
          // onClose={() => {
          //   setIsModalOpen(false);
          //   setDiaChiTouched(true);
          // }}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          className="w-[90%] h-[90%]"
          isChild={true}
        >
          <div className="flex flex-col gap-y-6 w-[95%] px-1">
            <p className="font-medium">Address</p>
            <Select
              key={'province'}
              radius={'sm'}
              label="City, Provice"
              isInvalid={isProvinceValid || !provinceTouched ? false : true}
              errorMessage={
                isProvinceValid || !provinceTouched
                  ? ''
                  : 'Please choose your city, province'
              }
              autoFocus={false}
              placeholder="Chose city"
              selectedKeys={selectedProvince}
              isLoading={isLoadingProvince}
              onSelectionChange={setSelectedProvince}
              className="w-full "
              onClose={() => setProvinceTouched(true)}
            >
              {provinces?.map((province) => (
                <SelectItem
                  key={province.idProvince}
                  value={province.idProvince}
                >
                  {province.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              key={'district'}
              radius={'sm'}
              label="District"
              isInvalid={isDistrictValid || !districtTouched ? false : true}
              errorMessage={
                isDistrictValid || !districtTouched
                  ? ''
                  : 'Please choose your district'
              }
              autoFocus={false}
              placeholder="Choose district"
              selectedKeys={selectedDistrict}
              isLoading={isLoadingDistrict}
              onSelectionChange={setSelectedDistrict}
              className="w-full "
              onClose={() => setDistrictTouched(true)}
            >
              {districts?.map((district) => (
                <SelectItem
                  key={district.idDistrict}
                  value={district.idDistrict}
                >
                  {district.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              key={'ward'}
              radius={'sm'}
              label="Ward"
              isInvalid={isWardValid || !wardTouched ? false : true}
              errorMessage={
                isWardValid || !wardTouched ? '' : 'Please choose your ward'
              }
              autoFocus={false}
              placeholder="Choose ward"
              selectedKeys={selectedWard}
              isLoading={isLoadingWard}
              onSelectionChange={setSelectedWard}
              className="w-full "
              onClose={() => setWardTouched(true)}
            >
              {wards?.map((ward) => (
                <SelectItem key={ward.idCommune} value={ward.idCommune}>
                  {ward.name}
                </SelectItem>
              ))}
            </Select>
            <div className="flex flex-col gap-3 ">
              <Label>Street name</Label>
              <Input
                value={streetValue}
                onChange={(e) => {
                  setStreetValue(e.target.value);
                }}
                className="w-full "
                placeholder="Street name"
              />
              <Label>House number</Label>
              <Input
                value={houseNumberValue}
                onChange={(e) => {
                  setHouseNumberValue(e.target.value);
                }}
                className="w-full "
                placeholder="House number"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                disabled={
                  !isProvinceValid ||
                  !isDistrictValid ||
                  !isWardValid ||
                  !streetValue ||
                  !houseNumberValue
                }
                onClick={onSubmit}
                className="w-[50%]"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogCustom>
      ) : null}
    </div>
  );
};
