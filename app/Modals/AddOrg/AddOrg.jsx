"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "@/app/Components/DropDown";
import { useRouter } from "next/navigation";
import { hrmsAPI } from "@/app/lib/api/client";
import Successful from '@/app/Modals/Successfully/Successful'
import ModalContainerSuccessful from '@/app/Modals/Successfully/ModalContainerSuccessful'

const orgSchema = z.object({
  Name: z.string().min(2, "Organization Name is required"),
Domain: z
  .string()
  .min(1, "Domain is required")
  .refine((val) => val.endsWith(".com"), {
    message: "Domain must end with .com",
  }),  Industry: z.string().min(1, "Please select an industry"),
  Location: z.string().min(2, "Location is required"),
  LogoUrl: z
    .any()
    .refine((files) => files && files.length === 1, {
      message: "Company Logo is required",
    }),
    Description: z.string().min(10, "Description is required"),
});

const AddOrg = ({tenantId, onClose }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isOpen , setisOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orgSchema),
  });

  const handleIndustrySelect = (value) => {
    setSelectedIndustry(value);
    setValue("Industry", value, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Prepare FormData
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("Domain", data.Domain);
      formData.append("Industry", data.Industry);
      formData.append("Location", data.Location);
      formData.append("Description",data.Description)
      formData.append("TenantId", tenantId);

      if (data.LogoUrl && data.LogoUrl.length > 0) {
        formData.append("LogoUrl", data.LogoUrl[0]); // Upload the file
      }

      // ✅ API call
      const response = await hrmsAPI.createOrganizations(formData);
      console.log("✅ Organization saved:", response);
      setisOpen(true);
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
            Create a new organization and add its basic info.
          </h4>
        </div>
        <button onClick={onClose} className="rounded-full center-center cursor-pointer">
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.375rem]">
        <div className="flex flex-col w-full gap-[1rem]">
          <label className="textFormColor1">Organization Name</label>
          <input type="text" {...register("Name")} placeholder="Organization Name" className="inputMod" />
          {errors.Name && <p className="text-Error">{errors.Name.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-[1rem]">
          <label className="textFormColor1">Domain</label>
          <input type="text" {...register("Domain")} placeholder="example.com" className="inputMod" />
          {errors.Domain && <p className="text-Error">{errors.Domain.message}</p>}
        </div>

        <div>
          <Dropdown
            label="Industry"
            options={["Engineering", "Marketing", "Finance"]}
            selected={selectedIndustry}
            onSelect={handleIndustrySelect}
            placeholder="Select Industry"
          />
          {errors.Industry && <p className="text-Error">{errors.Industry.message}</p>}
        </div>

        <div className="flex flex-col w-full gap-[1rem]">
          <label className="textFormColor1">Location</label>
          <input type="text" {...register("Location")} placeholder="Addis Abeba" className="inputMod" />
          {errors.Location && <p className="text-Error">{errors.Location.message}</p>}
        </div>

        <div className="flex flex-col gap-[1rem] relative">
          <label className="textFormColor1">Company Logo</label>
          <label className="inputModfile cursor-pointer border-none">
            <img src="/image/Icon/File.png" alt="" />
            <span className="text-limeLight">Upload Logo</span>
            <input type="file" className="hidden" {...register("LogoUrl")} />
          </label>
          {errors.LogoUrl && (
            <span className="text-Error text-[1rem] absolute bottom-[-2rem]">
              {errors.LogoUrl.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[1rem] relative">
            <label className="text-formColor">Description</label>
            <textarea
                placeholder="Brief description of the organization"
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none h-[8.4375rem]" 
                    {...register("Description")}
            ></textarea >
            {errors.Description && <p className="text-Error">{errors.Description.message}</p>}

        </div>

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
      {isOpen && (
        <ModalContainerSuccessful open={isOpen}>
          <Successful
            Header="Successfully Created"
            Parag="Organization is created Successfully"
            onNavigate={() => {
              setisOpen(false);
              router.push('/Admin/Organization');
              onClose();
            }}
            
            confirmation="Okay"
          />
        </ModalContainerSuccessful>
      )}
    </div>
  );
};

export default AddOrg;
