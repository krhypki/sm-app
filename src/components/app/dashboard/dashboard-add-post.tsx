'use client';

import { addPost } from '@/actions/post';
import FormSubmitButton from '@/components/general/form-submit-button';
import { ImageUploader } from '@/components/general/image-uploader/image-uploader';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import ContentBlock from '@/components/ui/content-block';
import Input from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import Textarea from '@/components/ui/textarea';
import { useCurrentUserContext } from '@/hooks/contexts';
import { getUserFullname } from '@/lib/utils/get-user-fullname';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DashboardAddPost() {
  const { avatar, id, firstName, lastName } = useCurrentUserContext();
  const [showModal, setShwoModal] = useState(false);

  return (
    <ContentBlock className="flex flex-col">
      <div className="flex justify-between items-center gap-x-3">
        <p className="text-lg">
          Logged as: <strong>{getUserFullname(firstName, lastName)}</strong>
        </p>

        <Avatar src={avatar || ''} alt="test" />
      </div>
      <Button onClick={() => setShwoModal(true)} className="mt-auto ml-auto">
        Add new post
      </Button>

      <Modal
        isOpen={showModal}
        onIsOpenChange={setShwoModal}
        heading="Add new post"
      >
        <form
          action={async (formData: FormData) => {
            const response = await addPost(formData, id);

            if (!response?.error) {
              setShwoModal(false);
              toast.success('Post added successfully');
              return;
            }

            toast.error(response.error);
          }}
          className="flex flex-col items-center gap-y-6"
        >
          <Input autoFocus placeholder="Title" name="title" />
          <Textarea rows={10} placeholder="Content" name="content" />
          <ImageUploader
            variant="image"
            className="w-full"
            imageAlt="New post image preview"
          />
          <FormSubmitButton variant="secondary" size="lg">
            Post
          </FormSubmitButton>
        </form>
      </Modal>
    </ContentBlock>
  );
}
