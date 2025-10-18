import React, { useState } from 'react'
import { Dropdown } from '@/app/Components/DropDown'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AuthSchema = z
  .object({
    Role: z.string().nonempty("Role is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Confirm Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Confirm Password must contain at least one lowercase letter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AddAuth = ({ onClose }) => {
  const [selectedRole, setSelectedRole] = useState();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      Role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("✅ Submitted data:", data);
  
  };

  return (
    // 
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Authorized User</h1>
          <h4 className="text-limegray">
            Create a new super administrator account
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>

      <div className="flex flex-col gap-[2.125rem]">
      {/* Role Dropdown */}
<div className="flex flex-col gap-[0.5rem] relative">
  <Controller
    name="Role"
    control={control}
    render={({ field }) => (
      <Dropdown
        label="Role"
        options={["HR", "Employee", "SystemAdmin"]}
        value={field.value}       
        onSelect={(value) => field.onChange(value)}
        placeholder="Select Role"
      />
    )}
  />
  {errors.Role && (
    <span className="text-Error text-[1rem] absolute bottom-[-2rem]">
      {errors.Role.message}
    </span>
  )}
</div>

        {/* Password Fields */}
        <div className="flex flex-col gap-[35px]">
          <div className="flex flex-col gap-[1rem] relative">
            <label className="text-formColor">Password</label>
            <input
              type="password"
              placeholder="*************"
              className="inputMod"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-[1rem] relative">
            <label className="text-formColor">Confirm Password</label>
            <input
              type="password"
              placeholder="*************"
              className="inputMod"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-Error text-[1rem] absolute bottom-[-2rem]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* ✅ Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Authorize
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddAuth;
