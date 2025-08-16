-remove files from 'public/*'
-clear 'globals.css'
-clear 'page.tsx'
- install shadcn 'npx shadcn@latest init'
- install components 'npx shadcn@latest and button label input sonner'
-show button and test 'dev' server


==PART 1==
-install Better Auth `npm install better-auth`
-create `.env` and set Environment Variables
-create `lib/auth.ts`
-setup `postgres` database with `neon.tech`
-install prisma `npx prisma init`
-create **Post** Model
-push database changes `npx prisma db push`
-add `generated` to `.gitignore`
-adjust **scripts** in `package.json`


-create single Primsa Client in `lib/prisma.ts`
-setup prisma adapter with better-auth
-generate auth tables `npx @better-auth/cli generate --output=auth.schema.prisma`
-make tweaks in `schema.prisma`
-quick walkthrough the models:
    `User`
    `Session`
    `Account`
    `Verification`
 -push database changes `npx prisma db push`
 -create Mount Handler in `app/api/auth/[...all]/route.ts`
 -adjust `eslint.config.mjs` to ignore `/src/generated/**/*`
 -created Client intance in `lib/auth-client.ts`   

 -Enable email and password Authentication``
    -Create Sing up Page PT1
    -Create Form `my-components/register-form.tsx`
    -Log Form Values
 -Setup Sonner
 -Create Sign Up Function
 -Shwocase `onError`
 -OPTIONS =`**minPasswordLength**`
 -Create SignUp Page PT3
    -SignUp -default automatically signs in the user_
-Show Session on Profile Page
-Show Data in Neon DashBoard
-Sign Out User
    -Destructure SignOut Function
    -Show Removed Cookies
-Create Sign In Page PT
    -Create Form `my-components/login-form.tsx`
    -Log From Values
    -Destruction Sign In Page PT1
 -Show UNauthorized on Profile Page
 -Create SignIn Page PT2
    -Showcase `onError`
    -Sign In User
-FINISH PART 1


---Roles Part
Roles(Custom Method)
Prisma
-Add UserRole Enum
- Push changes `npx prisma db push`
- User
    -Truncate Tables
    -Create new User
-Profile PT1
    -Show role is not typed in `session.user`
    -OPTION - `input` option
    -Profile PT2
        -Show role is now typed and added to `session.user`
        -ISSUE: Client Session has no Context of the Role
        -Cute circle on  `get-started-button-tsx`
        -InferAdditionalFields plugin on Client  

    `ADMIN PANEL`
    -Create Page/ Link
    -Manually Change Role
    -Update Middleware
    -Guard `/admin/dashboard`
    -List Users with prisma Query
-DataBase Hooks

-Google Auth
Error handling page for Oauth
/auth/login/error
Email Verification --->5:12:26
custom session is not done
mobile logout is not happening

//use email service like resend or sendgrid or mailchimp-->meney buy
//