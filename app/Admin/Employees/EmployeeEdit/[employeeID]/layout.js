// app/Admin/Employees/EmployeeEdit/[employeeId]/layout.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { hrmsAPI } from "@/app/lib/api/client";

const EmployeeContext = createContext(null);

export const useEmployee = () => useContext(EmployeeContext);

export default function EmployeeLayout({ children }) {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!employeeId) return;

    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // or session storage
        const data = await hrmsAPI.getEmployeeById(token, employeeId);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (!employee) return <div>Loading employee data...</div>;

  return (
    <EmployeeContext.Provider value={employee}>
      {children}
    </EmployeeContext.Provider>
  );
}
