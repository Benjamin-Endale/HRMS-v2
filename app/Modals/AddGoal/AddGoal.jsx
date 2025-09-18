'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown } from '@/app/Components/DropDown';


const goalSchema = z.object({
  employee: z.string().min(1, 'Employee is required'),
  priority: z.string().min(1, 'Priority is required'),
  category: z.string().min(1, 'Category is required'),
  dueDate: z.string()
  .min(1, 'Due date is required')
  .refine(
      (value) => {
        if (!value) return false;
        const today = new Date();
        const dueDate = new Date(value);
        return dueDate >= today;
      },
      { message: 'Due Date must be today or later' }
    ),
  title: z.string().min(3, 'Goal title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export default function AddGoal({ onClose }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      employee: '',
      priority: '',
      category: '',
      dueDate: '',
      title: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    console.log(' Goal Data:', data);
    // do something, like API call
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Create New Goal</h1>
          <h4 className="text-limegray">
            Set up a new performance goal for an employee
          </h4>
        </div>
        <button
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[2.375rem]"
      >
        {/* Top section */}
        <div className="w-full flex gap-[1.125rem]">
          <div className="flex flex-col gap-[2.375rem] w-[15.5625rem]">
            {/* Employee */}
            <div>
              <Controller
                name="employee"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Employee"
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select employee"
                  />
                )}
              />
              {errors.employee && (
                <p className="text-Error text-[1rem]">
                  {errors.employee.message}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Priority"
                    options={['High', 'Medium', 'Low']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select priority"
                  />
                )}
              />
              {errors.priority && (
                <p className="text-Error text-[1rem]">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-[15.5625rem] flex flex-col gap-[2.375rem]">
            {/* Category */}
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Category"
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select category"
                  />
                )}
              />
              {errors.category && (
                <p className="text-Error text-[1rem]">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Due Date */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Due Date</label>
              <input
                type="date"
                className="inputMod pr-[1.5625rem]"
                {...register('dueDate')}
              />
              {errors.dueDate && (
                <p className="text-Error text-[1rem]">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-[2.375rem]">
          {/* Goal Title */}
          <div className="flex flex-col gap-[1rem]">
            <label className="text-formColor">Goal Title</label>
            <input
              type="text"
              placeholder="e.g Improve Code Review Process"
              className="inputMod pr-[1.5625rem] placeholder-input"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-Error text-[1rem]">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[1rem]">
            <label className="text-formColor">Description</label>
            <textarea
              placeholder="Detailed description of the goal and expected outcomes..."
              className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-Error text-[1rem]">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Create Goal
          </button>
        </div>
      </form>
    </div>
  );
}
