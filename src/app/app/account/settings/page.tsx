import { updatePassword, updateUserData } from '@/actions/user';
import AccountForm from '@/components/account/account-form';
import Container from '@/components/ui/container';
import InputWLabel from '@/components/ui/input-w-label';
import PasswordInputPreview from '@/components/ui/password-input-preview';
import { APP_NAME } from '@/lib/constants';
import { getCurrentUser } from '@/lib/db/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} - settings`,
};

export default async function SettingsPage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <section className="grid lg:grid-cols-2 gap-5">
        <AccountForm
          formAction={updateUserData}
          heading="Update name"
          successMsg="Username updated successfully"
        >
          <InputWLabel
            label="First name"
            name="firstName"
            defaultValue={currentUser.firstName}
          />

          <InputWLabel
            label="Last name"
            name="lastName"
            defaultValue={currentUser.lastName}
          />
        </AccountForm>

        <AccountForm
          resetAfterSubmission={true}
          formAction={updatePassword}
          heading="Update password"
          successMsg="Password has been updated."
        >
          <PasswordInputPreview
            label="Current password"
            name="currentPassword"
          />
          <PasswordInputPreview
            label="New password"
            name="newPassword"
            type="password"
          />
        </AccountForm>
      </section>
    </Container>
  );
}
