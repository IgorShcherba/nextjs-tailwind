import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { parse, isDate } from "date-fns";

import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import PhoneInput from "react-phone-input-2";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";

import { Button } from "components/Button";
import Input from "components/Input";
import { Dropzone } from "components/Dropzone";

type FormData = {
  textInput: string;
  emailInput: string;
  phoneNumber: string;
  reactDatepicker: Date;
  reactMaskInput: string;
  reactSelect: SelectProps<OptionTypeBase>;
  reactSelectMulti: SelectProps<OptionTypeBase>;
  dropzone: any;
};

const parseDateString = (_: any, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd-MM-yyyy", new Date());

  return parsedDate;
};

const validationSchema = yup.object().shape({
  textInput: yup.string().required(),
  emailInput: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  reactSelect: yup.object().required(),
  reactSelectMulti: yup.array().min(1).required(),
  reactMaskInput: yup.date().transform(parseDateString).required(),
  reactDatepicker: yup.date().required(),
});

export const Form: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(validationSchema) });

  const onSubmit = handleSubmit((data) => {
    console.log("form Data", data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-wrap md:flex-nowrap md:space-x-4 ">
        <fieldset className="space-y-6 flex-auto max-w-lg">
          <Input
            label="Simple text input"
            type="text"
            id="textInput"
            error={!!errors?.textInput}
            errorMessage={errors?.textInput?.message}
            {...register("textInput", { required: "Surname is required" })}
          />

          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Surname is required" }}
            render={(props) => {
              return (
                <div>
                  <label htmlFor="phoneNumber">react-phone-input</label>
                  <PhoneInput country={"us"} {...props.field} />

                  {errors?.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          <Controller
            control={control}
            name="reactDatepicker"
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="reactDatepicker">react-datepicker</label>

                  <ReactDatePicker
                    wrapperClassName="w-full"
                    className="w-full rounded-sm flex-1 appearance-none px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base border border-gray-300"
                    placeholderText="Choose date please"
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    strictParsing
                  />

                  {errors?.reactDatepicker && (
                    <p className="text-red-500 text-sm">
                      {errors.reactDatepicker?.message}
                    </p>
                  )}
                </div>
              );
            }}
            rules={{
              required: "Date is required",
            }}
          />

          <Controller
            control={control}
            name="dropzone"
            render={({ field }) => {
              return (
                <div>
                  <Dropzone
                    {...field}
                    error={!!errors?.dropzone}
                    errorMessage={errors?.dropzone?.file?.message}
                  />
                </div>
              );
            }}
          />
        </fieldset>

        <fieldset className="space-y-6 flex-auto max-w-lg">
          <Controller
            name="reactMaskInput"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <label htmlFor="reactMaskInput">react-input-mask</label>

                  <InputMask
                    mask="99-99-9999"
                    value={value ?? ""}
                    onChange={onChange}
                  >
                    {(inputProps: any) => <Input {...inputProps} type="text" />}
                  </InputMask>

                  {errors?.reactMaskInput && (
                    <p className="text-red-500 text-sm">
                      {errors.reactMaskInput?.message}
                    </p>
                  )}
                </div>
              );
            }}
            rules={{ required: "Field is required" }}
          />

          <Input
            label="Simple email input"
            type="email"
            id="emailInput"
            error={!!errors?.emailInput}
            errorMessage={errors?.emailInput?.message}
            {...register("emailInput")}
          />

          <Controller
            name="reactSelect"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <div>
                  <label htmlFor="reactMaskInput">react-input-mask</label>

                  <ReactSelect
                    instanceId="reactMaskInput"
                    value={value}
                    onChange={onChange}
                    isClearable
                    options={[
                      { value: "value1", label: "Option 1" },
                      { value: "value2", label: "Option 2" },
                      { value: "value3", label: "Option 3" },
                    ]}
                  >
                    {(inputProps: any) => (
                      <input
                        {...inputProps}
                        type="text"
                        className="w-full rounded-sm flex-1 appearance-none px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base border border-gray-300"
                      />
                    )}
                  </ReactSelect>

                  {errors?.reactSelect && (
                    <p className="text-red-500 text-sm">
                      {errors.reactSelect?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          <Controller
            name="reactSelectMulti"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <div>
                  <label htmlFor="reactSelectMulti">
                    react-input-mask multi
                  </label>

                  <ReactSelect
                    instanceId="reactSelectMulti"
                    isMulti
                    value={value}
                    onChange={onChange}
                    isClearable
                    options={[
                      { value: "value1", label: "Option 1" },
                      { value: "value2", label: "Option 2" },
                      { value: "value3", label: "Option 3" },
                    ]}
                  >
                    {(inputProps: any) => (
                      <input
                        {...inputProps}
                        type="text"
                        className="w-full rounded-sm flex-1 appearance-none px-4 py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base border border-gray-300"
                      />
                    )}
                  </ReactSelect>

                  {errors?.reactSelectMulti && (
                    <p className="text-red-500 text-sm">
                      {errors.reactSelectMulti?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </fieldset>
      </div>

      <Button className="mt-6 w-min-10" color="primary" submit>
        Submit
      </Button>
    </form>
  );
};
