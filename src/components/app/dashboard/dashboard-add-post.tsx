'use client';

import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import ContentBlock from '@/components/ui/content-block';
import Input from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { useState } from 'react';

export default function DashboardAddPost() {
  const [showModal, setShwoModal] = useState(false);

  return (
    <ContentBlock className="flex flex-col">
      <div className="flex items-center gap-x-3">
        <Avatar src="/" alt="test" />
        <Input />
      </div>
      <Button onClick={() => setShwoModal(true)} className="mt-auto ml-auto">
        Add new post
      </Button>

      <Modal
        isOpen={showModal}
        onIsOpenChange={setShwoModal}
        heading="Add new post"
      >
        <form>
          <Input autoFocus placeholder="Title" />
          <Input placeholder="Content" />
          <Button>Post</Button>
        </form>
      </Modal>
    </ContentBlock>
  );
}
