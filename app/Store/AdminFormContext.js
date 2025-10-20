// AdminFormContext.js
import { createContext, useContext, useState } from 'react';

const AdminFormContext = createContext();

export const AdminFormProvider = ({ children }) => {
  const [tenantData, setTenantData] = useState({});
  const [employeeData, setEmployeeData] = useState({});
  const [compensationData, setCompensationData] = useState({});
  const [userData, setUserData] = useState({});
  const [tenantSettings, setTenantSettings] = useState({});

  const [addEmployee, setAddEmployee] = useState({});
  const [addEmployeeSecond, setAddEmployeeSecond] = useState({});
  const [compensation, setcompensation] = useState({});
  const [system, setSystem] = useState({});



  return (
    <AdminFormContext.Provider
      value={{
        tenantData,
        setTenantData,
        employeeData,
        setEmployeeData,
        compensationData,
        setCompensationData,
        userData,
        setUserData,
        tenantSettings, 
        setTenantSettings,
        addEmployee,
        setAddEmployee,
        addEmployeeSecond, 
        setAddEmployeeSecond,
        compensation, 
        setcompensation,
        system, 
        setSystem,
      }}
    >
      {children}
    </AdminFormContext.Provider>
  );
};

export const useAdminForm = () => useContext(AdminFormContext);
