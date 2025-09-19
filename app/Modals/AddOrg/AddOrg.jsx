"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "@/app/Components/DropDown";

const orgSchema = z.object({
  name: z.string().min(2, "Organization Name is required"),
  code: z.string().min(2, "Organization Code is required"),
  domain: z.string().url("Enter a valid domain (e.g. https://example.com)"),
  industry: z.string().min(1, "Please select an industry"),
  location: z.string().min(2, "Location is required"),
  logo: z
    .any()
    .refine((file) => file?.length === 1, 'Company Logo is required'),
});

const AddOrg = ({ onClose }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orgSchema),
  });

  //  Submit Handler
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  // Dropdown integration with Hook Form
  const handleIndustrySelect = (value) => {
    setSelectedIndustry(value);
    setValue("industry", value, { shouldValidate: true });
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Create New Organization</h1>
          <h4 className="text-limegray">
            Create a new organization and add its basic Info.
          </h4>
        </div>
        <button
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[2.375rem]"
      >
        <div className="w-full flex gap-[1.125rem]">
          <div className="flex flex-col gap-[2.375rem] w-full">
            {/* Organization Name */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Organization Name</label>
              <input
                type="text"
                placeholder="ex. Marketing"
                {...register("name")}
                className="inputMod pr-[1.5625rem]"
              />
              {errors.name && (
                <p className="text-Error text-[1rem]">{errors.name.message}</p>
              )}
            </div>

            {/* Organization Code */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Organization Code</label>
              <input
                type="text"
                placeholder="ex. ORG200"
                {...register("code")}
                className="inputMod pr-[1.5625rem]"
              />
              {errors.code && (
                <p className="text-Error">{errors.code.message}</p>
              )}
            </div>

            {/* Domain */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Domain</label>
              <input
                type="text"
                placeholder="ex. https://domain.com"
                {...register("domain")}
                className="inputMod pr-[1.5625rem]"
              />
              {errors.domain && (
                <p className="text-Error text-[1rem]">{errors.domain.message}</p>
              )}
            </div>

            {/* Industry Dropdown */}
            <div>
              <Dropdown
                label="Industry"
                options={["Engineering", "Marketing", "Finance"]}
                selected={selectedIndustry}
                onSelect={handleIndustrySelect}
                placeholder="Select Industry"
              />
              {errors.industry && (
                <p className="text-Error text-[1rem]">{errors.industry.message}</p>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                {...register("location")}
                className="inputMod pr-[1.5625rem]"
              />
              {errors.location && (
                <p className="text-Error text-[1rem]">{errors.location.message}</p>
              )}
            </div>

            {/* Logo Upload */}
            <div className="flex flex-col gap-[1rem]">
              <label htmlFor="logo" className="text-formColor">
                Upload Company Logo
              </label>
              <label htmlFor="logo" className="inputModfile cursor-pointer">
                <img src="/image/Icon/File.png" alt="File" />
                <span className="text-limeLight">Upload Logo</span>
              </label>
              <input
                type="file"
                id="logo"
                {...register("logo")}
                className="hidden w-full h-full"
              />
              {errors.logo && (
                <p className="text-Error text-[1rem]">{errors.logo.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Create Organization
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrg;
