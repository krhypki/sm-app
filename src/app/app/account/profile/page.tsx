import { updateAvatar, updateUserData } from '@/actions/user';
import AccountForm from '@/components/account/account-form';
import { ImageUploader } from '@/components/general/image-uploader/image-uploader';
import Container from '@/components/ui/container';
import Textarea from '@/components/ui/textarea';
import { APP_NAME } from '@/lib/constants';
import { getCurrentUser } from '@/lib/db/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} - profile`,
};

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <section className="grid lg:grid-cols-2 gap-5 text-center">
        <AccountForm
          formAction={updateAvatar}
          className="items-center"
          heading="Upload avatar"
          successMsg="Avatar updated successfully"
          buttonText="Upload"
        >
          <ImageUploader
            variant="avatar"
            imageAlt="User avatar preview"
            initialImage={currentUser.avatar || ''}
          />
        </AccountForm>

        <AccountForm
          formAction={updateUserData}
          heading="Update profile description"
          successMsg="Profile description updated successfully"
        >
          <Textarea
            name="description"
            className="flex-1 min-h-[200px]"
            defaultValue={currentUser.description || ''}
          />
        </AccountForm>
      </section>
    </Container>
  );
}
