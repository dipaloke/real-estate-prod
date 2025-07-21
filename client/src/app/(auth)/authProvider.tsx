"use client";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  useAuthenticator,
  View,
  RadioGroupField,
  Radio,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname, useRouter } from "next/navigation";

// https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});
const components = {
  Header() {
    const { route } = useAuthenticator((context) => [context.route]);

    let subtext = "Welcome!";
    if (route === "signIn") {
      subtext = "Welcome! Please sign in to continue.";
    } else if (route === "signUp") {
      subtext = "Welcome! Create an account to get started.";
    }

    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          Rently
          <span className="text-secondary-500 font-light hover:!text-primary-300">
            PRO
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span>
          {subtext.replace("Welcome! ", " ")}
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="mt-4 text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              className="text-primary-500 cursor-pointer hover:underline"
              onClick={toSignUp}
            >
              Sign up
            </span>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role" //As we set in the Cognito User Pool
            errorMessage={
              validationErrors?.["custom:role"] ? "Please select a role" : ""
            }
            hasError={!!validationErrors?.["custom:role"]}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="mt-4 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <span
              className="text-primary-500 cursor-pointer hover:underline"
              onClick={toSignIn}
            >
              Sign in
            </span>
          </p>
        </View>
      );
    },
  },
};

// Customizing the Authenticator components(https://ui.docs.amplify.aws/react/connected-components/authenticator/customization)

const FormFields = {
  signIn: {
    username: {
      label: "Email",
      placeholder: "Enter your email",
      isRequired: true,
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      label: "Username",
      placeholder: "Choose a username",
      isRequired: true,
    },
    email: {
      order: 2,
      label: "Email",
      placeholder: "Enter your email address",
      isRequired: true,
    },
    password: {
      order: 3,
      label: "Password",
      placeholder: "Create a password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      label: "Confirm Password",
      placeholder: "Confirm your password",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathName = usePathname();

  const isAuthPage = pathName.match(/^\/(auth|signin|signup)$/);
  const isDashboardPage =
    pathName.startsWith("/managers") || pathName.startsWith("/tenants"); 

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // TODO: logic For future use
  // useEffect(() => {
  //   if (user && isAuthPage) {
  //     // Redirect to the dashboard if the user is authenticated and on an auth page
  //     router.push(isDashboardPage ? pathName : "/manager/dashboard");
  //   } else if (!user && !isAuthPage) {
  //     // Redirect to the sign-in page if the user is not authenticated and not on an auth page
  //     router.push("/auth/signin");
  //   }
  // },[user, isAuthPage, isDashboardPage, pathName, router]);

  // Allow unauthenticated users to access public pages
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={pathName.includes("signup") ? "signUp" : "signIn"} // Default to signIn, but switch to signUp if the URL contains "signUp(for signup and signin button on nev bar)"
        components={components}
        formFields={FormFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
