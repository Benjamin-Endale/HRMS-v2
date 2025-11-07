import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { hrmsAPI } from '@/app/lib/api/client';

const ApplyLeaveschema = z.object({
  StartDate: z.string().nonempty("Starting Date is required"),
  EndDate: z.string().nonempty("Ending Date is required"),
  LeaveType: z.string().min(1, "Leave type is required"),
  Reason: z.string().min(5, "Reason is required"),
  Duration: z.number().min(1, "Duration must be at least 1 day"),
}).refine(
  (data) => {
    if (!data.StartDate || !data.EndDate) return true;
    const start = new Date(data.StartDate);
    const end = new Date(data.EndDate);
    return end >= start;
  },
  {
    message: "Ending Date must be after Starting Date",
    path: ["EndDate"],
  }
);

export default function ApplyLeave({ onClose, leaveType , tenantId,userId ,token}) {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [durationError, setDurationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(ApplyLeaveschema),
    defaultValues: {
      StartDate: "",
      EndDate: "",
      LeaveType: "",
      Reason: "",
      Duration: 0,
    },
  });

  const startDate = watch("StartDate");
  const endDate = watch("EndDate");

  // 🧮 Automatically calculate duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive count
      setValue("Duration", diffDays > 0 ? diffDays : 0);
    }
  }, [startDate, endDate, setValue]);

  // 🔍 Filter leave types dynamically
  const filteredUsers = leaveType.filter((lve) => {
    const leaveTypeName = lve.name.toLowerCase();
    const durationStr = String(lve.maxDays);
    return (
      leaveTypeName.includes(searchTerm.toLowerCase()) ||
      durationStr.includes(searchTerm.toLowerCase())
    );
  });

  const onSubmit = async (data) => {
    setDurationError(""); 
    // reset previous error
    setIsSubmitting(true)
    if (!selectedLeave) {
      alert("Please select a leave type");
      return;
    }

    // Check if duration exceeds allowed days
    if (data.Duration > selectedLeave.maxDays) {
      setDurationError(
        `Duration (${data.Duration} days) exceeds the allowed maximum of ${selectedLeave.maxDays} days for ${selectedLeave.name}.`
      );
      return;
    }

    // 📨 Prepare final data
    const payload = {
      StartDate: data.StartDate,
      EndDate: data.EndDate,
      Duration: data.Duration,
      Reason: data.Reason,
      leaveTypeId: selectedLeave.leaveTypeId,
      TenantId:tenantId,
      UserId:userId
    };

      console.log("Data",payload)

    try{
      const leave = await hrmsAPI.createLeave(payload,token)
      console.log(leave)
      onClose(true)
    } catch (err) {
      console.error("❌ Error saving LeaveRequest:", err.message || err);
    } finally {
      setIsSubmitting(false);
    }

    // You can send payload to your backend here (e.g., using fetch or axios)
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Leave Request</h1>
          <h4 className="text-limegray">Add leave request for admin</h4>
        </div>
        <button
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.75rem]">
        <div className="flex w-full gap-[1.125rem]">
          {/* Left side */}
          <div className="w-[15.5625rem] space-y-[2.125rem]">
            {/* Start Date */}
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">Starting Date</label>
              <input
                type="date"
                className="inputMod pr-[1.5625rem]"
                {...register("StartDate")}
              />
              {errors.StartDate && (
                <span className="text-Error text-[1rem]">{errors.StartDate.message}</span>
              )}
            </div>

            {/* Duration (auto-calculated) */}
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">Duration (Days)</label>
              <input
                type="number"
                readOnly
                className="inputMod pr-[1.5625rem] bg-[#2a2c1f] text-white"
                {...register("Duration", { valueAsNumber: true })}
              />
              {errors.Duration && (
                <span className="text-Error text-[1rem]">{errors.Duration.message}</span>
              )}
              {durationError && (
                <span className="text-Error text-[1rem]">{durationError}</span>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="w-[15.5625rem] space-y-[2.125rem]">
            {/* End Date */}
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">Ending Date</label>
              <input
                type="date"
                className="inputMod pr-[1.5625rem]"
                {...register("EndDate")}
              />
              {errors.EndDate && (
                <span className="text-Error text-[1rem]">{errors.EndDate.message}</span>
              )}
            </div>

            {/* Search Leave Type */}
            <div className="relative w-full flex flex-col">
              <label className="text-formColor mb-[1rem]">Search Leave Type</label>
              <div className="w-full h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search leave type"
                  className="placeholder-input text-white w-full h-full outline-0"
                />
              </div>

              {searchTerm && filteredUsers.length > 0 && (
                <div className="absolute top-[6rem] z-10 w-full bg-[#25281B] border border-[#3a3a3a] mt-1 rounded-md max-h-[200px] overflow-y-auto">
                  {filteredUsers.map((lvl) => (
                    <div
                      key={lvl.id || lvl.name}
                      onClick={() => {
                        setSelectedLeave(lvl);
                        setSearchTerm("");
                        setValue("LeaveType", lvl.name);
                      }}
                      className="p-2 hover:bg-[#343726] cursor-pointer text-white"
                    >
                      <div className="font-medium">{lvl.name}</div>
                      <div className="text-sm text-gray-400">
                        Max {lvl.maxDays} Days
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Leave Type */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Leave Type</label>
              <input
                type="text"
                placeholder="Select from search above"
                value={selectedLeave ? selectedLeave.name : ""}
                readOnly
                className="inputMod pr-[1.5625rem] bg-[#2a2c1f] text-white"
              />
              {errors.LeaveType && (
                <p className="text-Error text-[1rem]">{errors.LeaveType.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Reason + Submit */}
        <div className="flex flex-col gap-[1rem]">
          <label className="text-formColor">Reason</label>
          <textarea
            placeholder="Provide specific reason"
            className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
            {...register("Reason")}
          />
          {errors.Reason && (
            <span className="text-Error text-[1rem]">{errors.Reason.message}</span>
          )}

          <div className="w-full h-[3.4375rem] mt-[0.5rem]">
            <button
              type="submit"
              className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
              disabled= {isSubmitting}
            >
             {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
