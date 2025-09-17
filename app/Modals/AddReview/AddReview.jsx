import React, { useState } from 'react';
import { Dropdown } from '@/app/Components/DropDown';
import NumberInput from '@/app/Components/NumberInput';

export default function AddReview({ onClose }) {
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedJob, setSelectedJob] = useState('');

  // Categories
  const categories = ["Technical Skill", "Communication", "Leadership", "Innovation", "Teamwork"];
  const [ratings, setRatings] = useState(Array(categories.length).fill(0));

  // Update a specific category rating
  const handleRatingChange = (index, newValue) => {
    const updated = [...ratings];
    updated[index] = newValue;
    setRatings(updated);
  };

  // Calculate average rating
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, val) => sum + val, 0) / ratings.length).toFixed(1)
    : 0;

  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Performance Review</h1>
          <h4 className='text-limegray'>Conduct a comprehensive performance evaluation</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
            <img src="/image/Icon/Action/CloseCircle.png" alt="" />
        </button>
      </div>

      {/* Form */}
      <form className='flex flex-col gap-[4.75rem]'>
        {/* Dropdowns */}
        <div className='flex justify-between w-full gap-[1.125rem]'>

          <div className='flex-1'>
            <Dropdown
              label="Review Type"
              options={['Engineering', 'Marketing', 'Finance']}
              selected={selectedJob}
              onSelect={setSelectedJob}
              placeholder="Select Review"
            />
          </div>
        </div>

        {/* Category Ratings */}
        <div className='flex flex-col gap-[2.375rem]'>
          {categories.map((category, idx) => (
            <div key={idx} className='flex flex-col gap-[1rem]'>
              <div className='between'>
                <label className='text-formColor'>{category}</label>
                <div className='flex gap-[0.8125rem] items-center'>
                  <span className='text-limegray'>{ratings[idx].toFixed(1)}/5.0</span>
                  <NumberInput
                    min={0}
                    max={5}
                    step={0.1}
                    defaultValue={ratings[idx]}
                    onChange={(val) => handleRatingChange(idx, val)}
                  />
                </div>
              </div>
              <textarea
                placeholder={`Feedback for ${category}`}
                className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]'
              />
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="flex flex-col gap-[1rem]">
          <div className="between">
            <label className="text-formColor">Overall Feedback</label>
            <div className="flex gap-[0.8125rem] items-center">
              <span className="text-limegray">{averageRating}/5.0</span>
            </div>
          </div>
          <textarea
            placeholder="Feedback for overall performance"
            className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
          />
        </div>

        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type="submit"
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Complete Review 
          </button>
        </div>
      </form>
    </div>
  );
}
