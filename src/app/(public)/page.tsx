'use client';

import introImage from '@/../public/images/intro.png';
import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div className="text-center max-w-[500px]">
        <Heading tag="h1">{APP_NAME}</Heading>
        <p className="text-xl mb-6">
          Keep in touch with other people, check out what is s going on in their
          lives and share your experiences.
        </p>
        <div className="space-x-5">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
      <Image
        src={introImage}
        alt={`${APP_NAME} application preview`}
        priority
      />
    </>
  );
}
