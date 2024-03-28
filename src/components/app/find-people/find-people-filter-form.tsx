'use client';

import Input from '@/components/ui/input';
import { useFindPeopleContext } from '@/hooks/contexts';

export default function FindPeopleFilterForm() {
  const { handleQueryUpdate } = useFindPeopleContext();

  return (
    <form className="max-w-md mx-auto mb-10">
      <Input
        type="search"
        onChange={(e) => {
          handleQueryUpdate(e.target.value);
        }}
        placeholder="Search for people"
      />
    </form>
  );
}
