import React, { useState } from 'react';
import { Dropdown } from '@/app/Components/DropDown';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-formColor">Authorized User</h1>
          <h4 className="text-limegray text-sm">
            Create a new super administrator account
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full cursor-pointer"
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
            <span className="text-Error text-[1rem] absolute bottom-[-1.5rem]">
              {errors.Role.message}
            </span>
          )}
        </div>

        {/* Password Fields */}
        <div className="flex flex-col gap-[2.1875rem]">
          {/* Password Field */}
          <div className="flex flex-col gap-[0.25rem] relative">
            <label className="text-formColor">Password</label>
            <div className="relative flex items-center w-full h-[3.4375rem]">
              <div className="absolute z-10 pl-[1.1875rem]">
                <img src="/image/Icon/Action/LockPassword.png" alt="Password icon" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="*************"
                className="pl-[4.125rem] h-full w-full rounded-[0.3125rem] border-2 border-[#1D2015] text-white focus:outline-none focus:border-lemongreen focus:ring-lemongreen bg-[#1D2015]"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[50%] -translate-y-[50%]"
              >
                <img
                  src={showPassword ? "/image/Icon/Action/HideEye.png" : "/image/Icon/Action/eye.png"}
                  alt={showPassword ? "Hide Password" : "Show Password"}
                />
              </button>
            </div>
            {errors.password && (
              <span className="text-Error text-[1rem] absolute bottom-[-1.5rem]">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-[0.25rem] relative">
            <label className="text-formColor">Confirm Password</label>
            <div className="relative flex items-center w-full h-[3.4375rem]">
              <div className="absolute z-10 pl-[1.1875rem]">
                <img src="/image/Icon/Action/LockPassword.png" alt="Confirm Password icon" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="*************"
                className="pl-[4.125rem] h-full w-full rounded-[0.3125rem] border-2 border-[#1D2015] text-white focus:outline-none focus:border-lemongreen focus:ring-lemongreen bg-[#1D2015]"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[50%] -translate-y-[50%]"
              >
                <img
                  src={showConfirmPassword ? "/image/Icon/Action/HideEye.png" : "/image/Icon/Action/eye.png"}
                  alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-Error text-[1rem] absolute bottom-[-1.5rem]">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
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
