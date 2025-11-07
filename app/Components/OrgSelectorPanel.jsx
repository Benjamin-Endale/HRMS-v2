'use client';

import React, { useState, useEffect } from 'react';
import { Dropdown } from '@/app/Components/DropDownforNav';
import Organization from '@/public/svg/DashboardSvg/Organization';
import { hrmsAPI } from '@/app/lib/api/client';
import { useRouter, usePathname } from 'next/navigation';

const OrgSelectorPanel = ({ session }) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [loading, setLoading] = useState(true);
  const tenantId = session?.user?.tenantId;
  const token = session?.accessToken;
  const router = useRouter();
  const pathname = usePathname();

  // Detect if we are on an organization page by checking the URL
  const isOrgPage = pathname.startsWith('/Admin/OrganizationPages/');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await hrmsAPI.getOrganizationsByTenantId(tenantId, token);
        setOrganizations(res || []);

          if (isOrgPage) {
            const orgIdMatch = pathname.match(/\/Admin\/OrganizationPages\/([\w-]+)/);
            if (orgIdMatch) {
              const org = res.find((o) => o.id === orgIdMatch[1]);
              if (org) setSelectedOrg(org.name);
            }
          

        } else {
          // On tenant page, reset selection
          setSelectedOrg('');
        }
      } catch (err) {
        console.error('Error fetching organizations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tenantId && token) fetchOrganizations();
  }, [tenantId, token, pathname, isOrgPage]);

  const handleOrgSelect = (orgName) => {
    const org = organizations.find((o) => o.name === orgName);
    if (!org) return;

    setSelectedOrg(orgName);
    router.push(`/Admin/OrganizationPages/${org.id}/Dashboard`);
  };

  const handleExit = () => {
    setSelectedOrg('');
    router.push('/Admin/Dashboard');
  };

  return (
    <div className="my-[3rem] pl-[2.75rem] flex items-center relative gap-[1.5rem]">
      <Organization />
      {loading ? (
        <p className="text-limegray text-sm">Loading organizations...</p>
      ) : organizations.length > 0 ? (
        <>
          <Dropdown
            options={organizations.map((org) => org.name)}
            selected={selectedOrg}
            onSelect={handleOrgSelect}
            placeholder="Select Organization"
            className="w-[11.3125rem]"
          />
          {/* Show Exit only if we are in an org page */}
          {isOrgPage && selectedOrg && (
            <button
              onClick={handleExit}
              className="absolute bottom-[-3rem] left-[10rem] ml-2 text-[0.875rem] text-lemongreen hover:underline"
            >
              Exit
            </button>
          )}
        </>
      ) : (
        <p className="text-limegray text-sm">No organizations found</p>
      )}
    </div>
  );
};

export default OrgSelectorPanel;
