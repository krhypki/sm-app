'use client';

import { addPost } from '@/actions/post';
import FormSubmitButton from '@/components/general/FormSubmitButton';
import { ImageUploader } from '@/components/general/image-uploader/ImageUploader';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { getUserFullname } from '@/lib/utils/getUserFullname';
import { User } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../ui/Input';
import Modal from '../ui/Modal';

type AddPostProps = {
  currentUser: User;
};

export default function AddPost({ currentUser }: AddPostProps) {
  const [showModal, setShwoModal] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center gap-x-3">
        <p className="md:text-lg">
          Logged as: <strong>{getUserFullname(currentUser)}</strong>
        </p>

        <Avatar src={currentUser.avatar || ''} alt="test" />
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
            const response = await addPost(formData, currentUser.id);

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
    </>
  );
}
