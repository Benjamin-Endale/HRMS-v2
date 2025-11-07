
'use client';
import React, { useState, useEffect } from 'react';
import { hrmsAPI } from '@/app/lib/api/client';

const Page = ({ userIdData, token, AttendanceDetail }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // 🕒 Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format time as 09:25 AM
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Format date as Monday, Oct 30, 2025
      const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setCurrentTime(time);
      setCurrentDate(date);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval); // cleanup
  }, []);

  const onClockIn = async () => {
    try {
      setLoading(true);
      const attended = await hrmsAPI.createAttendance(userIdData, token);
      console.log('🧾 Attended fetched from backend:', attended);
      setIsClockedIn(true);
    } catch (err) {
      alert('Error: ' + (err.message || 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const onClockOut = async () => {
    try {
      setLoading(true);
      const attended = await hrmsAPI.createAttendanceClockout(userIdData, token);
      console.log('🧾 Attended fetched from createAttendanceClockout:', attended);
      setIsClockedIn(false);
    } catch (err) {
      alert('Error: ' + (err.message || 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-semibold space-y-[4.5rem]">
      {/* Header */}
      <div className="between">
        <div>
          <div className="space-y-[1rem]">
            <h1 className="text-5xl text-formColor">{currentTime}</h1>
            <h4 className="text-limegray">{currentDate}</h4>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-[1.25rem]">
          {/* Clock In */}
          <button
            onClick={onClockIn}
            disabled={isClockedIn || loading}
            className={`w-[16.3125rem] h-[3.4375rem] center-center rounded-[10px]
              ${isClockedIn ? 'bg-[rgba(190,229,50,0.25)]' : 'bg-lemongreen'}`}
          >
            <div className="center-center gap-[0.625rem]">
              <img src="/Image/Icon/Export.png" alt="" />
              <span className="text-black">
                {loading ? 'Processing...' : 'Clock In'}
              </span>
            </div>
          </button>

          {/* Clock Out */}
          <button
            onClick={onClockOut}
            disabled={!isClockedIn || loading}
            className={`w-[16.3125rem] h-[3.4375rem] center-center rounded-[10px]
              ${!isClockedIn ? 'bg-[rgba(190,229,50,0.25)]' : 'bg-lemongreen'}`}
          >
            <div className="center-center gap-[0.625rem]">
              <img src="/Image/Icon/Export.png" alt="" />
              <span className="text-black">
                {loading ? 'Processing...' : 'Clock Out'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div>
        <table>
          <thead className="tableBordercolor">
            <tr className="text-formColor">
              <th className="pr-[21.6875rem] pb-[0.8125rem]">Date</th>
              <th className="pr-[13.4375rem] pb-[0.8125rem]">Clock In</th>
              <th className="pr-[11.875rem] pb-[0.8125rem]">Clock Out</th>
              <th className="pr-[16.625rem] pb-[0.8125rem]">Total Hours</th>
              <th className="pr-[10.375rem] pb-[0.8125rem]">Status</th>
            </tr>
          </thead>
          <tbody>
            {AttendanceDetail.map((adc, index) => (
              <tr key={index} className="text-limeLight">
                <td className="pt-[2.25rem]">
                    <h4>{adc.attendanceDate ? new Date(adc.attendanceDate).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</h4>
                </td>
                <td className="pt-[2.25rem]">{adc.clockIn ? new Date(adc.clockIn).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</td>
                <td className="pt-[2.25rem]">{adc.clockOut ? new Date(adc.clockOut).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</td>
                <td className="pt-[2.25rem]">{adc.totalHours || '-'}h</td>
                <td className="pt-[1.875rem]">
                  <div>
                    <span
                      className={`bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full 
                        ${adc.status === 'Present'
                          ? 'text-lemongreen'
                          : adc.status === 'Late'
                          ? 'text-yellowCust'
                          : 'text-Error'}`}
                    >
                      {adc.status}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
