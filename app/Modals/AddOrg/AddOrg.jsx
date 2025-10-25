"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "@/app/Components/DropDown";
import { useRouter } from "next/navigation";
import { authAPI } from "@/app/lib/api/client";


const orgSchema = z.object({
  Name: z.string().min(2, "Organization Name is required"),
  OrgCode: z.string().min(2, "Organization Code is required"),
Domain: z
  .string()
  .min(4, "Domain is required")
  .refine((val) => val.trim().toLowerCase().endsWith(".com"), {
    message: "Domain must end with .com",
  }),
  Industry: z.string().min(1, "Please select an industry"),
  Location: z.string().min(2, "Location is required"),
  LogoUrl: z
    .any()
    .refine((files) => files && files.length === 1, {
      message: "Company Logo is required",
    }),
});

const AddOrg = ({ onClose }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      Name: "",
      OrgCode: "",
      Domain: "",
      Industry: "",
      Location: "",
      LogoUrl: null,
    },
  });

  const watchLogo = watch("LogoUrl");

  // Dropdown integration
  const handleIndustrySelect = (value) => {
    setSelectedIndustry(value);
    setValue("Industry", value, { shouldValidate: true });
  };

  // Convert file to base64 string
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (!data.LogoUrl || data.LogoUrl.length === 0) {
        console.error(" Please upload a company logo");
        return;
      }

      // Convert the file to base64 string
      const base64String = await fileToBase64(data.LogoUrl[0]);

      const formData = new FormData();
      formData.append("Name", data.Name.trim());
      formData.append("OrgCode", data.OrgCode.trim());
      formData.append("Domain", data.Domain.trim());
      formData.append("Industry", data.Industry.trim());
      formData.append("Location", data.Location.trim());
      formData.append("LogoUrl", base64String); // Send as base64 string instead of file object

      const response = await authAPI.createOrganizations(formData);
      console.log("✅ Organization saved:", response);
      router.push("/Admin/Organization");
    } catch (err) {
      console.error("❌ Error saving Organization:", err.message || err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Create New Organization</h1>
          <h4 className="text-limegray">
            Create a new organization and add its basic Info.
          </h4>
        </div>
        <button onClick={onClose} className="rounded-full center-center cursor-pointer">
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.375rem]">
        {/* Name */}
        <div className="flex flex-col w-full gap-[1rem] relative">
          <label className="textFormColor1">Organization Name</label>
          <input
            type="text"
            placeholder="ex. Marketing"
            {...register("Name")}
            className="inputMod pr-[1.5625rem]"
          />
          {errors.Name && <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.Name.message}</p>}
        </div>

        {/* Code */}
        <div className="flex flex-col w-full gap-[1rem] relative">
          <label className="textFormColor1">Organization Code</label>
          <input
            type="text"
            placeholder="ex. ORG200"
            {...register("OrgCode")}
            className="inputMod pr-[1.5625rem]"
          />
          {errors.OrgCode && <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.OrgCode.message}</p>}
        </div>

        {/* Domain */}
        <div className="flex flex-col w-full gap-[1rem] relative">
          <label className="textFormColor1">Domain</label>
          <input
            type="text"
            placeholder="domain.com"
            {...register("Domain")}
            className="inputMod pr-[1.5625rem]"
          />
          {errors.Domain && <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.Domain.message}</p>}
        </div>

        {/* Industry Dropdown */}
        <div className="relative">
          <Dropdown
            label="Industry"
            options={["Engineering", "Marketing", "Finance"]}
            selected={selectedIndustry}
            onSelect={handleIndustrySelect}
            placeholder="Select Industry"
          />
          {errors.Industry && <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.Industry.message}</p>}
        </div>

        {/* Location */}
        <div className="flex flex-col w-full gap-[1rem] relative">
          <label className="textFormColor1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            {...register("Location")}
            className="inputMod pr-[1.5625rem]"
          />
          {errors.Location && <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.Location.message}</p>}
        </div>

        {/* Logo */}
    <div className='flex flex-col gap-[1rem] relative border-none'>
      <label htmlFor="logo" className="text-formColor">Upload Company Logo</label>
      <label htmlFor="logo" className="inputModfile cursor-pointer flex items-center gap-2 border-none">
        <img src='/image/Icon/File.png' alt='' />
        <span className='text-limeLight'>Upload Company Logo</span>
        <input
          id="logo"
          type="file"
          accept="image/*"
          className="hidden"
          {...register('LogoUrl', {
            required: 'Logo is required',
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                console.log('Selected file:', file);
              }
            }
          })}
        />
      </label>

      {errors.LogoUrl && (
        <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>
          {errors.LogoUrl.message}
        </span>
      )}
    </div>
        {/* Submit */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button 
            type="submit" 
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Organization"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrg;