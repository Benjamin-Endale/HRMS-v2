'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dropdown } from '@/app/Components/DropDown';
import NumberInput from '@/app/Components/NumberInput';

// Categories
const categories = [
  'Technical Skill',
  'Communication',
  'Leadership',
  'Innovation',
  'Teamwork',
];

// ✅ Schema
const reviewSchema = z.object({
  reviewType: z.string().min(1, 'Review type is required'),
  ratings: z.array(z.number().min(0).max(5, 'Rating must be between 0 and 5')),
  feedbacks: z.array(z.string().min(5, 'Feedback must be at least 5 characters')),
  overallFeedback: z.string().min(10, 'Overall feedback is required'),
});

export default function AddReview({ onClose }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewType: '',
      ratings: Array(categories.length).fill(0),
      feedbacks: Array(categories.length).fill(''),
      overallFeedback: '',
    },
  });

  const ratings = watch('ratings');

  // Calculate average rating
  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1)
      : 0;

  const onSubmit = (data) => {
    console.log(' Review submitted:', data);
    // API call here
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Performance Review</h1>
          <h4 className="text-limegray">
            Conduct a comprehensive performance evaluation
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
        className="flex flex-col gap-[4.75rem]"
      >
        {/* Dropdown */}
        <div className="flex justify-between w-full gap-[1.125rem]">
          <div className="flex-1 relative">
            <Controller
              name="reviewType"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Review Type"
                  options={['Quarterly', 'Annual', 'Probation']}
                  selected={field.value}
                  onSelect={field.onChange}
                  placeholder="Select Review"
                />
              )}
            />
            {errors.reviewType && (
              <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.reviewType.message}</p>
            )}
          </div>
        </div>

        {/* Category Ratings */}
        <div className="flex flex-col gap-[2.375rem]">
          {categories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-[1rem]">
              <div className="between">
                <label className="text-formColor">{category}</label>
                <div className="flex gap-[0.8125rem] items-center relative">
                  <span className="text-limegray">
                    {ratings[idx]?.toFixed(1)}/5.0
                  </span>
                  <Controller
                    name={`ratings.${idx}`}
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        min={0}
                        max={5}
                        step={0.1}
                        defaultValue={field.value}
                        onChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </div>
              </div>
              {errors.ratings?.[idx] && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                  {errors.ratings[idx].message}
                </p>
              )}
              <div className='relative'>
                <textarea
                placeholder={`Feedback for ${category}`}
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
                {...register(`feedbacks.${idx}`)}
              />
              {errors.feedbacks?.[idx] && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                  {errors.feedbacks[idx].message}
                </p>
              )}
              </div>          
            </div>
          ))}
        </div>

        {/* Overall Feedback */}
        <div className="flex flex-col gap-[1rem] relative">
          <div className="between">
            <label className="text-formColor">Overall Feedback</label>
            <div className="flex gap-[0.8125rem] items-center">
              <span className="text-limegray">{averageRating}/5.0</span>
            </div>
          </div>
          <textarea
            placeholder="Feedback for overall performance"
            className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
            {...register('overallFeedback')}
          />
          {errors.overallFeedback && (
            <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
              {errors.overallFeedback.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Complete Review
          </button>
        </div>
      </form>
    </div>
  );
}
