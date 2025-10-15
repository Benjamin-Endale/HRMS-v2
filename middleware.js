import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const roleRoutes = {
  SuperAdmin: "/SuperAdmin/AllOrganization",
  HR: "/Admin/Dashboard",
  Employee: "/EmployeePortal/Dashboard",
  SystemAdmin: "/Admin/Dashboard",
  
};

// Routes that should be accessible during OTP flow
const otpFlowRoutes = [
  "/Login/VerifyOtp",
  "/api/auth/",
  "/Unauthorized",
  "/Login"  // Allow access to login page
];

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Check if the current route is an OTP flow route
  const isOtpFlowRoute = otpFlowRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Allow access to OTP flow routes and auth API routes
  if (isOtpFlowRoute || pathname.startsWith("/api/auth/")) {
    // ✅ CRITICAL: Prevent access to OTP pages after successful verification
    if (token?.otpVerified && isOtpFlowRoute && !pathname.startsWith("/api/auth/")) {
      const role = token.role;
      console.log(role)
      return NextResponse.redirect(new URL(roleRoutes[role] || "/Unauthorized", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    if (pathname !== "/Login" && !pathname.startsWith("/Login/")) {
      return NextResponse.redirect(new URL("/Login", req.url));
    }
    return NextResponse.next();
  }

  const role = token.role;
  const requiresOtp = token.requiresOtp || false;
  const isOtpVerified = token.otpVerified || false;

  // ✅ Prevent access to any routes if OTP is required but not verified
  if (requiresOtp && !isOtpVerified) {
    const verifyUrl = new URL("/Login/VerifyOtp", req.url);
    verifyUrl.searchParams.set("email",  token.email || "");
    return NextResponse.redirect(verifyUrl);
  }

  // ✅ Redirect verified users away from login/OTP pages
  if (isOtpVerified && (pathname === "/Login" || pathname === "/" || isOtpFlowRoute)) {
    return NextResponse.redirect(new URL(roleRoutes[role] || "/Unauthorized", req.url));
  }

  // Role-based access control
if (pathname.startsWith("/Admin") && role !== "HR" && role !== "SystemAdmin") {
  return NextResponse.redirect(new URL("/Unauthorized", req.url));
}


  if (pathname.startsWith("/SuperAdmin") && role !== "SuperAdmin") {
    return NextResponse.redirect(new URL("/Unauthorized", req.url));
  }

  if (pathname.startsWith("/EmployeePortal") && role !== "Employee") {
    return NextResponse.redirect(new URL("/Unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/Login", "/Login/:path*", "/Admin/:path*", "/SuperAdmin/:path*", "/EmployeePortal/:path*"],
};