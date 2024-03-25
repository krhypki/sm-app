'use client';

import Button from '@/components/ui/button';
import Collapse from '@/components/ui/collapse';
import ContentBlock from '@/components/ui/content-block';
import Heading from '@/components/ui/heading';
import Input from '@/components/ui/input';
import InputWLabel from '@/components/ui/input-w-label';
import Modal from '@/components/ui/modal';
import Pagination from '@/components/ui/pagination/pagination';
import Textarea from '@/components/ui/textarea';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);

  const onPageChange = (direction) => {
    if (direction === 'previous') {
      setPage(page - 1);
    } else {
      setPage(page + 1);
    }
  };
  return (
    <main className="bg-slate-200 min-h-screen px-20">
      <ContentBlock className="flex flex-col items-center px-10 py-10">
        <Pagination
          totalPages={5}
          onPageChange={onPageChange}
          currentPage={page}
        />
        <Button
          data-trigger
          className="z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          modal
        </Button>
        <Button size="sm">test</Button>
        <Button size="lg">test</Button>
        <Button variant="secondary" asChild>
          <Link href="/a">test</Link>
        </Button>

        <Input placeholder="Some random input" />

        <Textarea placeholder="Some random textarea" />

        <InputWLabel label="test" placeholder="test" />

        <Heading tag="h1">Heading</Heading>
        <Heading tag="h1" variant="h6">
          Heading
        </Heading>
        <Heading tag="h2">Heading</Heading>
        <Heading tag="h3">Heading</Heading>
        <Heading tag="h4">Heading</Heading>
        <Heading tag="h5">Heading</Heading>
        <Heading tag="h6">Heading</Heading>

        <Collapse isOpen={true}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab magnam
            dolores voluptatibus officia voluptatum et sunt cumque
            exercitationem, cum explicabo dolor architecto fuga praesentium
            porro, aspernatur quis a iste dolorem nisi numquam facere ipsam!
            Cupiditate, corporis assumenda nihil error perspiciatis fugit at
            nobis porro ab officiis eveniet pariatur voluptas iusto fugiat earum
            veritatis incidunt soluta sint temporibus laudantium non nesciunt
            possimus dignissimos. Adipisci, in voluptate maiores, quae quo nulla
            beatae placeat cum inventore consequatur eaque eum impedit
            necessitatibus ex laborum mollitia at repellat. Harum ratione dolor,
            incidunt ipsa consequuntur corporis quas dolorum fuga sequi ipsum ad
            ea suscipit, temporibus excepturi.
          </p>
        </Collapse>
      </ContentBlock>

      <ToastContainer />

      <Modal
        isOpen={isOpen}
        onIsOpenChange={setIsOpen}
        heading="Modal heading here"
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab magnam
          dolores voluptatibus officia voluptatum et sunt cumque exercitationem,
          cum explicabo dolor architecto fuga praesentium porro, aspernatur quis
          a iste dolorem nisi numquam facere ipsam! Cupiditate, corporis
          assumenda nihil error perspiciatis fugit at nobis porro ab officiis
          eveniet pariatur voluptas iusto fugiat earum veritatis incidunt soluta
          sint temporibus laudantium non nesciunt possimus dignissimos.
          Adipisci, in voluptate maiores, quae quo nulla beatae placeat cum
          inventore consequatur eaque eum impedit necessitatibus ex laborum
          mollitia at repellat. Harum ratione dolor, incidunt ipsa consequuntur
          corporis quas dolorum fuga sequi ipsum ad ea suscipit, temporibus
          excepturi.
        </p>
      </Modal>
    </main>
  );
}
